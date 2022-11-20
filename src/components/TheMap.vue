<template>
  <div id="the-map-wrapper">
    <div id="the-map"></div>
    <button id="the-map-add-marker" @click.stop="() => { layerGroupDistance === null ? addMarker() : removeMarker() }">
      <font-awesome-layers class="fa-2x">
        <font-awesome-icon icon="fa-solid fa-location-dot"/>
        <font-awesome-icon v-if="layerGroupDistance !== null" icon="fa-solid fa-plus" transform="rotate-45 grow-7"
                           style="color: red"/>
      </font-awesome-layers>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Feature, GeoJsonObject, GeometryObject } from 'geojson'
import { FeatureProperties } from '@/type'

export default defineComponent({
  name: 'TheMap',
  props: {
    geoJson: {
      type: Object as PropType<GeoJsonObject | null>,
      default: () => {
        return null
      }
    },
    score: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  emit: ['pointAdded', 'clickOnZone'],
  data () {
    return {
      map: null as L.Map | null,
      geoJSONLayer: null as L.GeoJSON | null,
      isAddingPoint: false,
      layerGroupDistance: null as L.LayerGroup | null
    }
  },
  computed: {
    tooltipName () {
      return this.$t('map.tooltip.name')
    },
    tooltipScore () {
      return this.$t('map.tooltip.score')
    },
    tooltipDisplay () {
      return this.isAddingPoint ? 'none' : 'initial'
    }
  },
  watch: {
    geoJson () {
      this.updateGeoJSONLayer()
    },
    score (newScore) {
      if (newScore !== null && this.geoJSONLayer !== null) {
        this.geoJSONLayer.eachLayer((layer: L.Layer) => {
          const id = ((layer as L.LayerGroup).feature as Feature).id as number
          layer.getTooltip()?.setContent(this.tooltipName + ': ' + newScore.zoneName[id] + '<br> ' + this.tooltipScore + ': ' + newScore.score[id])
          ;(layer as L.GeoJSON).setStyle(this.getStyle(newScore.score[id]))
        })
      }
    }
  },
  mounted () {
    this.map = L.map('the-map').setView([63.4249225, 10.4298279], 12)
    // https://tile.openstreetmap.org/{z}/{x}/{y}.png
    L.tileLayer('https://kart.trondheim.kommune.no/geoserver/gwc/service/tms/1.0.0/Raster:tk_topo4graatone_WMS@jpeg/{z}/{x}/{-y}.jpeg', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '<a href="https://www.trondheim.kommune.no/">Trondheim Kommune</a>'
    }).addTo(this.map as L.Map)
    this.setMarkerControl()
    this.setLegend()
    ;(this.map as L.Map).on('click', this.clickOnMapHandler)
  },
  methods: {
    setLegend () {
      const legend = new L.Control({ position: 'bottomright' })

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend')
        const grades = [0, 20, 40, 60, 80, 100]

        div.innerHTML += `<div style="text-align: center">${this.$t('map.legend.title')}</div>`
        for (let i = 0; i < grades.length - 1; i++) {
          div.innerHTML +=
            '<div><i style="background:' + this.getColorAttribute(grades[i]) + '"></i> ' +
            grades[i] + '% &ndash; ' + grades[i + 1] + '%</div>'
        }

        return div
      }

      legend.addTo(this.map as L.Map)
    },
    setMarkerControl (): void {
      const markerControl = new L.Control({ position: 'topright' })

      markerControl.onAdd = function () {
        return L.DomUtil.get('the-map-add-marker') as HTMLButtonElement
      }

      markerControl.addTo(this.map as L.Map)
    },
    clickOnMapHandler (event: L.LeafletMouseEvent): void {
      if (this.isAddingPoint) {
        const svgIcon = L.divIcon({
          html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial Licence) Copyright 2022 Fonticons, Inc. -->
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
        </svg>`,
          className: 'bw',
          iconSize: [24, 40],
          iconAnchor: [11.5, 31]
        })

        const layers: L.Layer[] = []
        layers.push(L.marker(event.latlng, { icon: svgIcon }))

        for (let i = 400; i <= 1200; i += 400) {
          layers.push(L.circle(event.latlng, i, {
            interactive: false,
            fillColor: '#fc8d59',
            color: '#fc8d59'
          }))
        }

        const layerGroup = L.layerGroup(layers)
        this.layerGroupDistance = layerGroup
        layerGroup.addTo(this.map as L.Map)

        // layerGroup.eachLayer((layer: L.Layer) => {
        //   (layer as (L.Marker | L.Circle)).setLatLng()
        // })
        L.DomUtil.removeClass((this.map as L.Map).getContainer(), 'marker-cursor-enabled')
        this.isAddingPoint = false
      }
    },
    updateGeoJSONLayer (): void {
      if (this.map != null) {
        if (this.geoJSONLayer !== null) {
          this.geoJSONLayer.removeFrom(this.map as L.Map)
        }
        if (this.geoJson !== null) {
          this.geoJSONLayer = L.geoJson(this.geoJson, {
            style: this.styleHandler,
            onEachFeature: this.onEachFeatureHandler
          })
          this.geoJSONLayer.addTo(this.map as L.Map)
        }
      }
    },
    styleHandler (feature: Feature<GeometryObject, FeatureProperties> | undefined): L.PathOptions {
      return this.getStyle(feature?.properties.score)
    },
    onEachFeatureHandler (feature: Feature<GeometryObject, FeatureProperties>, layer: L.Layer): void {
      // const popup = L.popup().setContent(feature.properties.zoneName)
      layer.bindTooltip(feature.properties.zoneName, {
        direction: 'top',
        sticky: true, // TODO: 27/10/2022 Decide if it should be true or false
        // permanent: true,
        className: 'display-tooltip'
      })
      layer.on('click', () => {
        if (!this.isAddingPoint) {
          this.$emit('clickOnZone', feature.id)
        }
      })
    },
    getStyle (score: number | undefined): L.PathOptions {
      const color = this.getColorAttribute(score)
      return {
        color: '#222',
        fillColor: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
        className: 'zone-class'
      }
    },
    getColorAttribute (score: number | undefined): string {
      if (typeof score === 'undefined') score = 0
      return score < 20 ? '#ffffcc' :
        score < 40 ? '#a1dab4' :
        score < 60 ? '#41b6c4' :
        score < 80 ? '#2c7fb8' : '#253494'
    },
    addMarker (): void {
      L.DomUtil.addClass((this.map as L.Map).getContainer(), 'marker-cursor-enabled')
      this.isAddingPoint = true
    },
    removeMarker (): void {
      this.layerGroupDistance?.removeFrom(this.map as L.Map)
      this.layerGroupDistance = null
    }
  }
})
</script>

<style scoped lang="scss">
#the-map-wrapper {
  /*background: skyblue;*/
  flex: 0 1 400px;
  border: 1px solid;
}

#the-map {
  height: 100%;
}

@media only screen and (min-width: 768px) {
  #the-map-wrapper {
    flex: content;
  }

  #the-map-add-marker {
    width: 40px;
    height: 40px;
    background: $map-layer-control-background;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    color: $map-layer-control-color;
    border: none;
    cursor: pointer;
  }

  #the-map-add-marker:hover{
    background: $map-layer-control-background-hover;
  }
}
</style>

<style lang="scss">
.zone-class:focus {
  outline: none;
}

.leaflet-container.marker-cursor-enabled,
.leaflet-container.marker-cursor-enabled .zone-class {
  cursor: url("../../public/location-dot-solid.svg") 10 40, crosshair !important;
}

.display-tooltip {
  display: v-bind(tooltipDisplay);
}

.legend {
  line-height: 18px;
  color: $map-layer-control-color;
}

.legend i {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: $map-layer-control-background;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  max-width: 120px;
}

.leaflet-control-zoom a {
  background: $map-layer-control-background;
  border-color: $map-layer-control-background;
  color: $map-layer-control-color;
}

.leaflet-control-zoom a:hover {
  background: $map-layer-control-background-hover;
  border-color: $map-layer-control-background-hover;
}
</style>

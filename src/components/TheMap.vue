<template>
  <div id="the-map-wrapper">
    <div id="the-map"></div>
    <button id="the-map-add-marker" @click.stop="addMarker">
      <font-awesome-icon icon="fa-solid fa-location-dot"/>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import 'leaflet/dist/leaflet.css'
import L, { DomUtil, GeoJSON, Layer, LayerGroup, LeafletMouseEvent, Map } from 'leaflet'
import { Feature, GeoJsonObject, GeometryObject } from 'geojson'
import { mapWritableState } from 'pinia'
import { usePointsStore } from '@/stores/points'
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
      map: null as Map | null,
      geoJSONLayer: null as GeoJSON | null,
      internalIsAddingPoint: this.isAddingPoint
    }
  },
  computed: {
    ...mapWritableState(usePointsStore, ['isAddingPoint', 'points', 'idPointToAdd']),
    tooltipName () {
      return this.$t('map.tooltip.name')
    },
    tooltipScore () {
      return this.$t('map.tooltip.score')
    }
  },
  watch: {
    geoJson (newValue) {
      this.updateGeoJSONLayer()
    },
    score (newScore) {
      if (newScore !== null && this.geoJSONLayer !== null) {
        this.geoJSONLayer.eachLayer((layer: Layer) => {
          const id = ((layer as LayerGroup).feature as Feature).id as number
          layer.getTooltip()?.setContent(this.tooltipName + ': ' + newScore.zoneName[id] + '<br> ' + this.tooltipScore + ': ' + newScore.score[id])
          ;(layer as GeoJSON).setStyle(this.getStyle(newScore.score[id]))
        })
      }
    }
  },
  mounted () {
    this.map = L.map('the-map').setView([63.4249225, 10.4298279], 12)
    // https://tile.openstreetmap.org/{z}/{x}/{y}.png
    L.tileLayer('https://kart.trondheim.kommune.no/geoserver/gwc/service/tms/1.0.0/Raster:tk_topo4graatone_WMS@jpeg/{z}/{x}/{-y}.jpeg', {
      maxZoom: 14,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map as Map)
    const svgIcon = L.divIcon({
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
        </svg>`,
      className: 'bw',
      iconSize: [24, 40],
      iconAnchor: [12, 40]
    })

    const test = new L.Control({
      position: 'topright'
    })
    test.onAdd = function (map: Map) {
      return L.DomUtil.get('the-map-add-marker') as HTMLButtonElement
    }
    test.addTo(this.map as Map)

    ;(this.map as Map).on('click', (event: LeafletMouseEvent) => {
      if (this.isAddingPoint) {
        console.log('Map clicked', 'lat' + event.latlng.lat, 'lng' + event.latlng.lng, 'x' + event.layerPoint.x, event.layerPoint.y)
        // this.points[this.idPointToAdd].point = [event.latlng.lat, event.latlng.lng]
        // L.marker(event.latlng, { icon: svgIcon }).bindTooltip(this.points[this.idPointToAdd].label as string, { direction: 'top' }).addTo(this.map as Map)
        L.marker(event.latlng, { icon: svgIcon }).addTo(this.map as Map)
        L.circle(event.latlng, 400).addTo(this.map as Map)
        L.circle(event.latlng, 800).addTo(this.map as Map)
        L.circle(event.latlng, 1200).addTo(this.map as Map)
        this.isAddingPoint = false
      }
    })
    // this.updateGeoJSONLayer()
  },
  methods: {
    updateGeoJSONLayer () {
      if (this.map != null) {
        if (this.geoJSONLayer !== null) {
          this.geoJSONLayer.removeFrom(this.map as Map)
        }
        if (this.geoJson !== null) {
          this.geoJSONLayer = L.geoJson(this.geoJson, {
            style: this.styleHandler,
            onEachFeature: this.onEachFeatureHandler
          })
          this.geoJSONLayer.addTo(this.map as Map)
        }
      }
    },
    styleHandler (feature: Feature<GeometryObject, FeatureProperties> | undefined) {
      return this.getStyle(feature?.properties.score)
    },
    onEachFeatureHandler (feature: Feature<GeometryObject, FeatureProperties>, layer: Layer) {
      // const popup = L.popup().setContent(feature.properties.zoneName)
      layer.bindTooltip(feature.properties.zoneName, {
        direction: 'top',
        sticky: true // TODO: 27/10/2022 Decide if it should be true or false
      })
      layer.on('click', event => {
        if (!this.isAddingPoint) {
          console.log('clicked on a zone')
          this.$emit('clickOnZone', feature.id)
        }
      })
    },
    getStyle (score: number | undefined) {
      const color = this.getColorAttribute(score)
      return {
        color: '#222',
        fillColor: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7
      }
    },
    getColorAttribute (score: number | undefined) {
      if (typeof score === 'undefined') score = 0
      if (score < 20) return '#ffffcc'
      else if (score < 40) return '#a1dab4'
      else if (score < 60) return '#41b6c4'
      else if (score < 80) return '#2c7fb8'
      else return '#253494'
    },
    addMarker () {
      this.isAddingPoint = true
    }
  }
})
</script>

<style scoped lang="scss">
#the-map-wrapper {
  /*background: skyblue;*/
  flex:content;
  margin-top: 1%;
  margin-left: 1%;
  margin-right: 1%;
  border: 1px solid;
}

@media only screen and (min-width: 768px) {
  #the-map-wrapper {
    flex:content
  }

  #the-map {
    height: 100%;
  }

  #the-map-add-marker {
  }
}
</style>

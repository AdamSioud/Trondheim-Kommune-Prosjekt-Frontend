<template>
  <div id="theMap">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import 'leaflet/dist/leaflet.css'
import L, { geoJson, GeoJSON, Layer, LayerGroup, Map } from 'leaflet'
import { Feature, GeometryObject } from 'geojson'
import { DataGeoJSON } from '@/type'
import { mapState } from 'pinia'
import { usePointsStore } from '@/stores/points'
import * as geojson from 'geojson'

export default defineComponent({
  name: 'TheMap',
  props: {
    dataGeoJson: {
      type: Object as PropType<DataGeoJSON | null>,
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
  emit: ['pointAdded'],
  data () {
    return {
      map: null as Map | null,
      geoJSONLayer: null as GeoJSON | null,
      internalIsAddingPoint: this.isAddingPoint
    }
  },
  computed: {
    ...mapState(usePointsStore, ['isAddingPoint'])
  },
  watch: {
    dataGeoJson (newValue) {
      this.updateGeoJSONLayer()
    },
    score (newValue) {
      if (newValue !== null && this.geoJSONLayer !== null) {
        this.geoJSONLayer.eachLayer((layer : Layer) => {
          const id = ((layer as LayerGroup).feature as Feature).id as number
          // console.log(id, newValue, layer.constructor)
          layer.getTooltip()?.setContent(this.$t('map.tooltip.name') + ': ' + newValue.Levekårsnavn[id] + '<br> ' + this.$t('map.tooltip.score') + ': ' + newValue.Score[id])
          const color = this.getColorAttribute(0, 100, newValue.Score[id])
          if (newValue.Levekårsnavn[id] === 'Ila') console.log(color)
          ;(layer as GeoJSON).setStyle({
            color: color,
            fillColor: color
          })
        })
      }
    }
  },
  mounted () {
    this.map = L.map('theMap').setView([63.4249225, 10.4298279], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map as Map);
    (this.map as Map).on('click', event => {
      console.log('Map clicked')
    })
    /* axios.get('/data2.geojson').then(function (res) {
      // console.log(res.status)
      // console.log(res.data)
      const tmp = res.data.replace(/(NaN|-?Infinity)/g, '"***$1***"')
      // const tmp = '{"a":NaN","b":"Infinity"}'
      // console.log(tmp)
      const obj = JSON.parse(tmp, (key, value) => {
        // console.log(key, value)
        if (value === '***NaN***') {
          return NaN
        }
        if (value === '***Infinity***') {
          return Infinity
        }
        if (value === '***-Infinity***') {
          return -Infinity
        }
        return value
      })
      L.geoJSON(obj).addTo(map)
    }) */
    // this.updateGeoJSONLayer()
  },
  methods: {
    updateGeoJSONLayer () {
      console.log(this.geoJSONLayer !== null, this.map !== null, this.dataGeoJson !== null)
      if (this.map != null) {
        if (this.geoJSONLayer !== null) {
          this.geoJSONLayer.removeFrom(this.map as Map)
        }
        if (this.dataGeoJson !== null && this.dataGeoJson.geoJSON !== null) {
          this.geoJSONLayer = L.geoJson(this.dataGeoJson.geoJSON, {
            style: this.styleHandler,
            onEachFeature: this.onEachFeatureHandler
          })
          this.geoJSONLayer.addTo(this.map as Map)
        }
      }
    },
    styleHandler (feature: Feature<GeometryObject, any> | undefined) {
      let color = 'blue'
      if (this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMin !== undefined && this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMax !== undefined) {
        color = this.getColorAttribute(this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMin, this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMax, feature?.properties.Score)
        if (feature?.properties.Levekårsnavn === 'Ila') {
          const newMax = this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMax - this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMin
          console.log(feature?.properties.Score, this.dataGeoJson.geoJSONGlobalProperties.scoreMin, this.dataGeoJson.geoJSONGlobalProperties.scoreMax, newMax)
          console.log(((feature?.properties.Score - this.dataGeoJson.geoJSONGlobalProperties.scoreMin) * 120 / newMax), ((feature?.properties.Score - this.dataGeoJson.geoJSONGlobalProperties.scoreMin) * 120 / newMax).toString(10))
        }
        // console.log(this.dataGeoJson.geoJSONGlobalProperties.scoreMin, this.dataGeoJson.geoJSONGlobalProperties.scoreMax, hue, feature?.properties.Score, color)
      }
      return {
        color: color,
        fillColor: color
      }
    },
    onEachFeatureHandler (feature: Feature<GeometryObject, any>, layer: Layer) {
      // const popup = L.popup().setContent(feature.properties.Levekårsnavn)
      layer.bindTooltip(feature?.properties.Levekårsnavn, {
        direction: 'top',
        sticky: true // TODO: 27/10/2022 Decide if it should be true or false
      })
      layer.on('click', event => {
        if (!this.isAddingPoint) {
          console.log('clicked on a zone')
        }
      })
    },
    getColorAttribute (scoreMin: number, scoreMax: number, score: number) {
      const newMax = scoreMax - scoreMin
      const hue = ((score - scoreMin) * 120 / newMax).toString(10)
      return `hsl(${hue},70%,50%)`
    }
  }
})
</script>

<style scoped lang="scss">
#theMap {
  /*background: skyblue;*/
  flex: auto;
  margin: 0 8px;
}
@media only screen and (min-width: 768px) {
  #theMap {
    margin: 0;
  }
}
</style>

<template>
  <div id="theMap">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import 'leaflet/dist/leaflet.css'
import L, { GeoJSON, Layer, Map } from 'leaflet'
import { Feature, GeometryObject } from 'geojson'
import { DataGeoJSON } from '@/type'

export default defineComponent({
  name: 'TheMap',
  props: {
    dataGeoJson: {
      type: Object as PropType<DataGeoJSON | null>,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      map: null as Map | null,
      geoJSONLayer: null as GeoJSON | null
    }
  },
  watch: {
    dataGeoJson (newValue) {
      this.updateGeoJSONLayer()
    }
  },
  mounted () {
    this.map = L.map('theMap').setView([63.4249225, 10.4298279], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map as Map)
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
            style: (feature) => {
              let color = 'blue'
              if (this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMin && this?.dataGeoJson?.geoJSONGlobalProperties?.scoreMax) {
                const newMax = this.dataGeoJson.geoJSONGlobalProperties.scoreMax - this.dataGeoJson.geoJSONGlobalProperties.scoreMin
                const hue = ((feature?.properties.Score - this.dataGeoJson.geoJSONGlobalProperties.scoreMin) * 120 / newMax).toString(10)
                color = `hsl(${hue},70%,50%)`
                if (feature?.properties.Levekårsnavn === 'Ila') {
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
            onEachFeature (feature: Feature<GeometryObject, never>, layer: Layer) {
              console.log()
            }
          })
          this.geoJSONLayer.addTo(this.map as Map)
        }
      }
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

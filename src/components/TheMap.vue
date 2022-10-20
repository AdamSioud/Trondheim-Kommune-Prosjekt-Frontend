<template>
  <div id="theMap">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'

export default defineComponent({
  name: 'TheMap',
  data () {
    return {
      map: {}
    }
  },
  mounted () {
    const map = L.map('theMap').setView([63.4249225, 10.4298279], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    axios.get('/data2.geojson').then(function (res) {
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
    })
    this.map = map
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

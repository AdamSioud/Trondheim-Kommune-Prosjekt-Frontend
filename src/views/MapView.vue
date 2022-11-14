<template>
  <div id="map-view">
    <the-parameters :param-input="paramInput" @update:paramInput="updateParamInput"/>
    <div id="map-and-details-wrapper">
<!--      <span style="color: black; margin-bottom: 10px">{{ paramInput }}</span>-->
      <the-map :geo-json="geoJSON" :score="score" @click-on-zone="getDataForZone"/>
      <the-details :zone-data="zoneData"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheParameters from '@/components/TheParameters.vue'
import TheMap from '@/components/TheMap.vue'
import TheDetails from '@/components/TheDetails.vue'
import paramInput from '../assets/param_input.json'
import { GeoJsonObject } from 'geojson'

export default defineComponent({
  name: 'MapView',
  components: {
    TheParameters,
    TheMap,
    TheDetails
  },
  data () {
    return {
      paramInput: paramInput,
      geoJSON: null as GeoJsonObject | null,
      score: null,
      lastTimeoutID: 0,
      isAddingPoint: false,
      zoneData: null
    }
  },
  mounted () {
    this.getGeoJSON()
  },
  methods: {
    updateParamInput (res:never) {
      // if (this.dataGeoJSON !== null) this.dataGeoJSON.geoJSON = null
      // this.dataGeoJSON = null
      clearTimeout(this.lastTimeoutID)
      this.paramInput = res
      this.lastTimeoutID = setTimeout(() => {
        this.getScore()
      }, 500)
    },
    getGeoJSON () {
      this.$axios.post('/map', this.paramInput).then(response => {
        this.geoJSON = JSON.parse(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getScore () {
      this.$axios.post('/score', this.paramInput).then(response => {
        this.score = JSON.parse(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getDataForZone (id: number) {
      this.$axios.get(`/zone/${id}`).then(response => {
        console.log(JSON.parse(response.data))
        this.zoneData = JSON.parse(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
</script>

<style scoped>

#map-view {
  display: flex;
  flex: auto;
  flex-direction: column;
}

#map-and-details-wrapper {
  flex: auto;
  display: flex;
  flex-direction: column;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  #map-view {
    flex-direction: row;
  }

  #map-and-details-wrapper {
    margin: 1%;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}

</style>

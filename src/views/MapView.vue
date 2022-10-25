<template>
  <div id="mapView">
    <the-parameters :param-input="paramInput" @update:paramInput="updateParamInput"/>
    <div id="mapAndDetailsWrapper">
      <the-map :data-geo-json="dataGeoJSON"/>
      <the-details>
        {{ paramInput }}
      </the-details>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheParameters from '@/components/TheParameters.vue'
import TheMap from '@/components/TheMap.vue'
import TheDetails from '@/components/TheDetails.vue'
import paramInput from '../assets/param_input.json'
import { DataGeoJSON } from '@/type'

export default defineComponent({
  name: 'HomeView',
  components: {
    TheParameters,
    TheMap,
    TheDetails
  },
  data () {
    return {
      paramInput: paramInput,
      dataGeoJSON: null as DataGeoJSON | null,
      lastTimeoutID: 0
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
        this.getGeoJSON()
      }, 1000)
    },
    getGeoJSON () {
      this.$axios.post('/Map', this.paramInput).then(response => {
        console.log({ ...response.data, geoJSON: JSON.parse(response.data.geoJSON) })
        this.dataGeoJSON = { ...response.data, geoJSON: JSON.parse(response.data.geoJSON) }
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
</script>

<style scoped>

#mapView {
  display: flex;
  flex: auto;
  flex-direction: column;
}

#mapAndDetailsWrapper {
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
  #mapView {
    flex-direction: row;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}

</style>

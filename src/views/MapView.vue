<template>
  <div id="map-view">
    <the-parameters @update:paramInput="updateParamInput"/>
    <div id="map-and-details-wrapper">
<!--      <span style="color: black; margin-bottom: 10px">{{ paramInput }}</span>-->
      <the-map :geo-json="geoJSON" :score="score" @click-on-zone="getDataForZone"/>
      <the-details :zone-data="zoneData" :general-data="generalData"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheParameters from '@/components/TheParameters.vue'
import TheMap from '@/components/TheMap.vue'
import TheDetails from '@/components/TheDetails.vue'
import { GeoJsonObject } from 'geojson'
import { JSONObject } from '@/type'
import { CustomError } from '@/classes/CustomError'
import { mapWritableState } from 'pinia'
import { useErrorStore } from '@/stores/error'

export default defineComponent({
  name: 'MapView',
  components: {
    TheParameters,
    TheMap,
    TheDetails
  },
  data () {
    return {
      paramInput: null as JSONObject | null,
      geoJSON: null as GeoJsonObject | null,
      score: null,
      lastTimeoutID: 0,
      isAddingPoint: false,
      zoneData: undefined,
      generalData: {}
    }
  },
  computed: {
    ...mapWritableState(useErrorStore, ['isError', 'message', 'title'])
  },
  methods: {
    updateParamInput (paramInput: never) {
      clearTimeout(this.lastTimeoutID)
      this.paramInput = paramInput
      if (this.geoJSON === null) {
        this.getGeoJSON()
        this.getGeneralData()
      } else {
        this.lastTimeoutID = setTimeout(() => {
          this.getScore()
        }, 500)
      }
    },
    getGeoJSON () {
      if (this.paramInput === null) throw new CustomError(this.$t('error.confFileError.message'), this.$t('error.confFileError.title'), this.$t('error.confFileError.advice'))
      this.$axios.post('/map', this.paramInput).then(response => {
        if (response.status === 200) this.geoJSON = JSON.parse(response.data)
      }).catch(error => {
        this.handleServerError(error)
      })
    },
    getDataForZone (id: number) {
      if (id < 0) throw new CustomError('The zone `id` is less than 0')
      this.$axios.get(`/zone/${id}`).then(response => {
        if (response.status === 200) this.zoneData = JSON.parse(response.data)
      }).catch(error => {
        this.handleServerError(error)
      })
    },
    getScore () {
      if (this.paramInput === null) throw new CustomError(this.$t('error.confFileError.message'), this.$t('error.confFileError.title'), this.$t('error.confFileError.advice'))
      this.$axios.post('/score', this.paramInput).then(response => {
        if (response.status === 200) this.score = JSON.parse(response.data)
      }).catch(error => {
        this.handleServerError(error)
      })
    },
    getGeneralData () {
      if (this.paramInput === null) throw new CustomError(this.$t('error.confFileError.message'), this.$t('error.confFileError.title'), this.$t('error.confFileError.advice'))
      this.$axios.get('/generaldata').then(response => {
        if (response.status === 200) this.generalData = JSON.parse(response.data)
      }).catch(error => {
        this.handleServerError(error)
      })
    },
    handleServerError (error?: unknown) {
      console.error(error)
      this.title = this.$t('error.serverError.title')
      this.message = this.$t('error.serverError.message')
      this.isError = true
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
    overflow: hidden;
    overflow-x: auto;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}

</style>

<template>
  <div id="mapView">
    <TheParameters v-model:param-input="paramInput"/>
    <div id="mapAndDetailsWrapper">
      <TheMap/>
      <TheDetails>
        {{ paramInput }}
      </TheDetails>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheParameters from '@/components/TheParameters.vue'
import TheMap from '@/components/TheMap.vue'
import TheDetails from '@/components/TheDetails.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    TheParameters,
    TheMap,
    TheDetails
  },
  data () {
    return {
      paramInput: {
        priceInput: {
          selected: ['medium'],
          budget: 40
        },
        ageInput: {
          selected: ['0-17'],
          percent: 40
        },
        wellBeingInput: {
          weight: 0
        },
        safetyInput: {
          weight: 1
        },
        cultureInput: {
          weight: 2
        },
        outdoorInput: {
          weight: 3
        },
        transportInput: {
          weight: 4
        },
        walkwayInput: {
          weight: 5
        },
        noiseTrafficInput: {
          weight: 2
        },
        noiseOtherInput: {
          weight: 3
        }
      }
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

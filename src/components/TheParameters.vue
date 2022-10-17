<template>
  <div id="theParameters">
    <h1>{{ $t("parameters.title") }}</h1>
    <div id="parameters-wrapper">
      <div id="parameters" ref="divParameters">
        <app-menu-collapse title="Price" color="#C4DFAA" v-model="price.priceActive">
          <app-price :price-input="paramInput.priceInput" :disabled="!price.priceActive"
                     @change="changePrice"/>
        </app-menu-collapse>
        <app-menu-collapse title="Age" color="#B8E8FC" v-model="age.ageActive">
          <app-age :age-input="paramInput.ageInput" :disabled="!age.ageActive"
                   @change="changeAge"/>
        </app-menu-collapse>
        <app-menu-collapse title="Well being" color="#FFD1D1" v-model="wellBeing.wellBeingActive">
          <app-environment :environment-input="wellBeing.wellBeingInput" :disabled="!wellBeing.wellBeingActive"
                           @change="changeWellBeing"/>
        </app-menu-collapse>
        <app-menu-collapse title="Safety" color="#C8FFD4" v-model="safety.safetyActive">
          <app-environment :environment-input="safety.safetyInput" :disabled="!safety.safetyActive"
                           @change="changeSafety"/>
        </app-menu-collapse>
        <app-menu-collapse title="Culture" color="#DFD3C3" v-model="culture.cultureActive">
          <app-environment :environment-input="culture.cultureInput" :disabled="!culture.cultureActive"
                           @change="changeCulture"/>
        </app-menu-collapse>
        <app-menu-collapse title="Outdoor" color="#AEBDCA" v-model="outdoor.outdoorActive">
          <app-environment :environment-input="outdoor.outdoorInput" :disabled="!outdoor.outdoorActive"
                           @change="changeOutdoor"/>
        </app-menu-collapse>
        <app-menu-collapse title="Transport" color="#ECC5FB" v-model="transport.transportActive">
          <app-environment :environment-input="transport.transportInput" :disabled="!transport.transportActive"
                           @change="changeTransport"/>
        </app-menu-collapse>
        <app-menu-collapse title="Walkway" color="#CDF0EA" v-model="walkway.walkwayActive">
          <app-environment :environment-input="walkway.walkwayInput" :disabled="!walkway.walkwayActive"
                           @change="changeWalkway"/>
        </app-menu-collapse>
        <app-menu-collapse title="Traffic noise" color="#DEB6AB" v-model="noiseTraffic.noiseTrafficActive">
          <app-environment :environment-input="noiseTraffic.noiseTrafficInput" :disabled="!noiseTraffic.noiseTrafficActive"
                           @change="changeNoiseTraffic"/>
        </app-menu-collapse>
        <app-menu-collapse title="Other noises" color="#AF7AB3" v-model="noiseOther.noiseOtherActive">
          <app-environment :environment-input="noiseOther.noiseOtherInput" :disabled="noiseOther.noiseOtherActive"
                           @change="changeNoiseOther"/>
        </app-menu-collapse>
<!--        {{internalParamInput}}-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppMenuCollapse from '@/components/AppMenuCollapse.vue'
import AppPrice from '@/components/AppPrice.vue'
import { AgeInput, EnvironmentInput, ParamInput, PriceInput } from '@/type'
import AppAge from '@/components/AppAge.vue'
import AppEnvironment from '@/components/AppEnvironment.vue'

export default defineComponent({
  name: 'TheParameters',
  components: {
    AppMenuCollapse,
    AppPrice,
    AppAge,
    AppEnvironment
  },
  props: {
    paramInput: {
      type: Object as PropType<ParamInput>,
      default: (rawprops: never) => {
        console.log(rawprops)
        return {}
      }
    }
  },
  emits: ['update:paramInput'],
  data () {
    return {
      internalParamInput: { ...this.paramInput },
      price: {
        priceActive: true,
        priceInput: this.paramInput?.priceInput
      },
      age: {
        ageActive: true,
        ageInput: this.paramInput?.ageInput
      },
      wellBeing: {
        wellBeingActive: true,
        wellBeingInput: this.paramInput?.wellBeingInput
      },
      safety: {
        safetyActive: true,
        safetyInput: this.paramInput?.safetyInput
      },
      culture: {
        cultureActive: true,
        cultureInput: this.paramInput?.cultureInput
      },
      outdoor: {
        outdoorActive: true,
        outdoorInput: this.paramInput?.outdoorInput
      },
      transport: {
        transportActive: true,
        transportInput: this.paramInput?.transportInput
      },
      walkway: {
        walkwayActive: true,
        walkwayInput: this.paramInput?.walkwayInput
      },
      noiseTraffic: {
        noiseTrafficActive: true,
        noiseTrafficInput: this.paramInput?.noiseTrafficInput
      },
      noiseOther: {
        noiseOtherActive: true,
        noiseOtherInput: this.paramInput?.noiseOtherInput
      }
    }
  },
  watch: {
    'price.priceActive' (newValue) {
      this.update('priceInput', newValue ? this.price.priceInput : null)
    },
    'age.ageActive' (newValue) {
      this.update('ageInput', newValue ? this.age.ageInput : null)
    },
    'wellBeing.wellBeingActive' (newValue) {
      this.update('wellBeingInput', newValue ? this.wellBeing.wellBeingInput : null)
    },
    'safety.safetyActive' (newValue) {
      this.update('safetyInput', newValue ? this.safety.safetyInput : null)
    },
    'culture.cultureActive' (newValue) {
      this.update('cultureInput', newValue ? this.culture.cultureInput : null)
    },
    'outdoor.outdoorActive' (newValue) {
      this.update('outdoorInput', newValue ? this.outdoor.outdoorInput : null)
    },
    'transport.transportActive' (newValue) {
      this.update('transportInput', newValue ? this.transport.transportInput : null)
    },
    'walkway.walkwayActive' (newValue) {
      this.update('walkwayInput', newValue ? this.walkway.walkwayInput : null)
    },
    'noiseTraffic.noiseTrafficActive' (newValue) {
      this.update('noiseTrafficInput', newValue ? this.noiseTraffic.noiseTrafficInput : null)
    },
    'noiseOther.noiseOtherActive' (newValue) {
      this.update('noiseOtherInput', newValue ? this.noiseOther.noiseOtherInput : null)
    }
  },
  mounted () {
    // console.log(window.innerHeight - 100)
    // this.maxHeight = window.innerHeight - 100
    // window.addEventListener('resize', () => { this.maxHeight = window.innerHeight - 110 })
  },
  methods: {
    changePrice (priceObj: PriceInput) {
      this.price.priceInput = priceObj
      this.update('priceInput', this.price.priceActive ? priceObj : null)
    },
    changeAge (ageObj: AgeInput) {
      this.age.ageInput = ageObj
      this.update('ageInput', this.age.ageActive ? ageObj : null)
    },
    changeWellBeing (wellBeingObj: EnvironmentInput) {
      this.wellBeing.wellBeingInput = wellBeingObj
      this.update('wellBeingInput', this.wellBeing.wellBeingActive ? wellBeingObj : null)
    },
    changeSafety (safetyObj: EnvironmentInput) {
      this.safety.safetyInput = safetyObj
      this.update('safetyInput', this.safety.safetyActive ? safetyObj : null)
    },
    changeCulture (cultureObj: EnvironmentInput) {
      this.culture.cultureInput = cultureObj
      this.update('cultureInput', this.culture.cultureActive ? cultureObj : null)
    },
    changeOutdoor (outdoorObj: EnvironmentInput) {
      this.outdoor.outdoorInput = outdoorObj
      this.update('outdoorInput', this.outdoor.outdoorActive ? outdoorObj : null)
    },
    changeTransport (transportObj: EnvironmentInput) {
      this.transport.transportInput = transportObj
      this.update('transportInput', this.transport.transportActive ? transportObj : null)
    },
    changeWalkway (walkwayObj: EnvironmentInput) {
      this.walkway.walkwayInput = walkwayObj
      this.update('walkwayInput', this.walkway.walkwayActive ? walkwayObj : null)
    },
    changeNoiseTraffic (noiseTrafficObj: EnvironmentInput) {
      this.noiseTraffic.noiseTrafficInput = noiseTrafficObj
      this.update('noiseTrafficInput', this.noiseTraffic.noiseTrafficActive ? noiseTrafficObj : null)
    },
    changeNoiseOther (noiseOtherObj: EnvironmentInput) {
      this.noiseOther.noiseOtherInput = noiseOtherObj
      this.update('noiseOtherInput', this.noiseOther.noiseOtherActive ? noiseOtherObj : null)
    },
    update (key: string, value: unknown) {
      if (value === null) {
        delete this.internalParamInput[key as keyof typeof this.internalParamInput]
      } else {
        this.internalParamInput = { ...this.internalParamInput, [key]: value }
      }
      this.$emit('update:paramInput', this.internalParamInput)
    }
  }
})
</script>

<style scoped lang="scss">
#theParameters {
  background: indianred;
}

@media only screen and (min-width: 768px) {
  #theParameters {
    height: 100%;
    min-width: 250px;
    display: flex;
    flex-direction: column;
  }

  #parameters-wrapper {
    flex-grow: 1;
    position: relative;
  }

  #parameters {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
}
</style>

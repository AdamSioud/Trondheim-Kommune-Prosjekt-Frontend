<template>
  <div id="theParameters">
    <h1>{{ $t("parameters.title") }}</h1>
    <div id="parameters-wrapper">
      <div id="parameters" ref="divParameters">
        <app-menu-collapse v-for="(menu, key) in configParameters" :key="key"
                           :title="$t(menu.title)" :color="menu.color"
                           @change-active="isActive => setActive(key, menu.input, isActive)" :model-value="(menu.active === undefined ? true : menu.active)">
          <template v-for="(element, key, i) in menu.elements" :key="i">
            <div v-if="element.type === 'group'" :class="'group-' + element.layout">
              <template v-for="(item, index) in element.items" :key="index">
                <template v-if="item.type === 'checkbox'">
                  <app-checkbox :checked="internalParamInput[menu.input][element.input].indexOf(item.input) !== -1" @input="res => changeValue(menu.input, element.input, manageArray(internalParamInput[menu.input][element.input], item.input, res))"
                                :disabled="!menu.active">
                    <div class="wrapper-checkbox-content">
                      <div class="wrapper-checkbox-content-icon">
                        <font-awesome-icon v-if="new RegExp('^fa').test(item.picture)" :icon="'fa-solid ' + item.picture" :size="item.size"/>
                      </div>
                      <div>{{ $t(item.title) }}</div>
                    </div>
                  </app-checkbox>
                </template>
              </template>
            </div>
            <template v-else-if="element.type === 'slider'">
              <app-slider :min="element.min" :max="element.max" :step="element.step"
                          :disabled="!menu.active"
                          :value="internalParamInput[menu.input][element.input]" @input-value="res => changeValue(menu.input,element.input,res)"/>
              {{internalParamInput[menu.input][element.input]}}
            </template>
          </template>
        </app-menu-collapse>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppMenuCollapse from '@/components/AppMenuCollapse.vue'
import { ConfigParameters, ParamInput, PriceInput } from '@/type'
import configParameters from '../assets/configParameters.json'
import AppSlider from '@/components/AppSlider.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import { removeItem } from '@/helpers/utils'

export default defineComponent({
  name: 'TheParameters',
  components: {
    AppMenuCollapse,
    AppSlider,
    AppCheckbox
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
      internalParamInput: JSON.parse(JSON.stringify(this.paramInput)),
      resultParamInput: JSON.parse(JSON.stringify(this.paramInput)),
      configParameters: configParameters as ConfigParameters,
      price: {
        priceActive: true,
        priceInput: this.paramInput?.price_input
      }
    }
  },
  watch: {
    'price.priceActive' (newValue) {
      this.update('priceInput', newValue ? (this.price.priceInput ? this.price.priceInput : null) : null)
    }
  },
  beforeMount () {
    for (const menu in this.configParameters) {
      if (this.configParameters[menu].title === undefined) this.configParameters[menu].title = 'parameters.menu'
      if (this.configParameters[menu].active === undefined) this.configParameters[menu].active = true
      if (this.configParameters[menu].color === undefined) this.configParameters[menu].color = 'white'
    }
  },
  mounted () {
    for (const menu in this.configParameters) {
      if (!this.configParameters[menu].active) {
        delete this.resultParamInput[this.configParameters[menu].input as keyof typeof this.resultParamInput]
      }
    }
    this.$emit('update:paramInput', this.resultParamInput)
  },
  methods: {
    setActive (menu: string, input: string, active: boolean) {
      this.configParameters[menu].active = active
      this.update(input, active ? this.internalParamInput[input as keyof typeof this.internalParamInput] : null)
    },
    changePrice (priceObj: PriceInput) {
      this.price.priceInput = priceObj
      this.update('priceInput', this.price.priceActive ? priceObj : null)
    },
    manageArray<T> (arr:Array<T>, value: T, toPush: boolean): Array<T> {
      if (toPush) arr.push(value)
      else arr = removeItem(arr, value)
      return arr
    },
    changeValue (key: string, input: string, value: unknown) {
      this.internalParamInput[key][input] = value
      this.update(key, this.internalParamInput[key])
    },
    update (key: string, value: object | null) {
      if (value === null) {
        delete this.resultParamInput[key as keyof typeof this.resultParamInput]
      } else {
        this.resultParamInput = { ...this.resultParamInput, [key]: { ...value } }
      }
      this.$emit('update:paramInput', JSON.parse(JSON.stringify(this.resultParamInput)))
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

  .group-flex {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }
  .wrapper-checkbox-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .wrapper-checkbox-content-icon {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
}
</style>

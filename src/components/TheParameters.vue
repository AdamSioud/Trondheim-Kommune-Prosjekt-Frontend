<template>
  <div id="theParameters">
    <h1>{{ $t("parameters.title") }}</h1>
    <div id="parameters-wrapper">
      <div id="parameters" ref="divParameters">
<!--        <app-menu-collapse v-for="(menu, key) in configParameters" :key="key"
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
        </app-menu-collapse>-->
        <app-menu-collapse v-for="(menu, key) in configParameters" :key="key"
                           :title="$t(menu.title)" :color="menu.color" :model-value="menu.active"
                           :elements="menu.elements" :input="menu.input" :menu-key="key"
                           :param-input="internalParamInput[menu.input]"
                           @change-active="isActive => setActive([key], [menu.input], isActive)"
                           @change-value="changeValue" @set-active="setActive"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppMenuCollapse from '@/components/AppMenuCollapse2.vue'
import { ConfigParameters, Menu } from '@/type'
import configParameters from '../assets/configParameters.json'

export default defineComponent({
  name: 'TheParameters',
  components: {
    AppMenuCollapse
  },
  props: {
    paramInput: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:paramInput'],
  data () {
    return {
      internalParamInput: JSON.parse(JSON.stringify(this.paramInput)),
      resultParamInput: JSON.parse(JSON.stringify(this.paramInput)),
      configParameters: configParameters as ConfigParameters
    }
  },
  beforeMount () {
    for (const menu in this.configParameters) {
      this.initConfigParameters(this.configParameters[menu])
    }
  },
  mounted () {
    for (const menu in this.configParameters) {
      this.initResultParamInput(this.configParameters[menu], this.resultParamInput[this.configParameters[menu].input as string])
      if (!this.configParameters[menu].active) {
        delete this.resultParamInput[this.configParameters[menu].input as string]
      }
    }
    this.$emit('update:paramInput', this.resultParamInput)
  },
  methods: {
    initConfigParameters (menu: Menu) {
      if (menu.title === undefined) menu.title = 'parameters.menu'
      if (menu.active === undefined) menu.active = true
      if (menu.color === undefined) menu.color = 'white'
      if (!Array.isArray(menu.elements)) {
        for (const subMenuKey in menu.elements) {
          this.initConfigParameters((menu.elements as {[key:string]: Menu})[subMenuKey])
        }
      }
    },
    initResultParamInput (menu: Menu, input: any) {
      if (!Array.isArray(menu.elements)) {
        for (const subMenuKey in menu.elements) {
          const subMenu = (menu.elements as {[key:string]: Menu})[subMenuKey]
          this.initResultParamInput(subMenu, input[menu.input as string])
          if (!menu.elements[subMenuKey].active) {
            delete input[subMenu.input as string]
          }
        }
      }
    },
    setActive (menuKeys: string[], menuInputs: string[], active: boolean) {
      if (menuKeys.length !== 0) {
        let menu = this.configParameters[menuKeys[0]]
        for (let i = 1; i < menuKeys.length; i++) {
          menu = (menu.elements as {[key:string]: Menu})[menuKeys[i]]
        }
        menu.active = active
        let inputToAdd = null
        if (active) {
          inputToAdd = JSON.parse(JSON.stringify(menuInputs.reduce((a, b) => a[b], this.internalParamInput)))
          this.initResultParamInput(menu, inputToAdd)
        }
        this.update(menuInputs, inputToAdd)
      }
    },
    changeValue (menuInputs: string[], input: string, value: unknown) {
      if (menuInputs.length !== 0) {
        const menuInput = menuInputs.reduce((a, b) => a[b], this.internalParamInput)
        menuInput[input] = value
        this.update(menuInputs, menuInput)
      }
    },
    update (menuInputs: string[], value: object | null) {
      let menu = this.resultParamInput
      let i = 0
      for (; i < menuInputs.length - 1; i++) {
        menu = menu[menuInputs[i]]
      }
      if (value === null && menuInputs.length !== 0) {
        delete menu[menuInputs[i]]
      } else {
        menu[menuInputs[i]] = value
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

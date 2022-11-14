<template>
  <div id="the-parameters">
    <div id="parameters-wrapper">
      <div id="parameters" ref="divParameters">
        <div class="profile">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Trondheim_komm.svg/1200px-Trondheim_komm.svg.png" alt="profile_picture">
          <h1>Trondheim kommune <br> Kart</h1>
        </div>
        <div id="parameters-actions">
          <button v-show="!enableAll" @click="toggleEnableAll">
            <font-awesome-icon icon="fa-solid fa-square-check" />
            <span>{{ $t('parameters.actions.enableAll') }}</span>
          </button>
          <button v-show="enableAll" @click="toggleEnableAll">
            <font-awesome-icon icon="fa-solid fa-square-xmark" />
            <span>{{ $t('parameters.actions.disableAll') }}</span>
          </button>
          <button v-show="collapseAll" @click="toggleVisibleAll">
            <font-awesome-icon icon="fa-solid fa-angles-down" rotation="180"/>
            <span>{{ $t('parameters.actions.collapseAll') }}</span>
          </button>
          <button v-show="!collapseAll" @click="toggleVisibleAll">
            <font-awesome-icon icon="fa-solid fa-angles-down" />
            <span>{{ $t('parameters.actions.expendAll') }}</span>
          </button>
        </div>
        <menu-collapse v-for="(menu, key) in configParameters" :key="key"
                       :title="$t(menu.title)" :color="menu.color" :model-value="menu.enabled"
                       :elements="menu.elements" :input="menu.input" :menu-key="key"
                       :param-input="internalParamInput[menu.input]" :visible="menu.visible"
                       @change-enabled="isEnabled => setEnabled([key], [menu.input], isEnabled)"
                       @change-value="changeValue" @set-enabled="setEnabled" @change-visible="(isVisible) => {menu.visible = isVisible}"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheParametersMenuCollapse from '@/components/TheParametersMenuCollapse.vue'
import { ConfigParameters, Menu } from '@/type'
import configParameters from '../assets/configParameters.json'

export default defineComponent({
  name: 'TheParameters',
  components: {
    MenuCollapse: TheParametersMenuCollapse
    // TheParametersDistanceInput
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
      configParameters: configParameters as ConfigParameters,
      collapseAll: true,
      enableAll: true
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
      if (!this.configParameters[menu].enabled) {
        delete this.resultParamInput[this.configParameters[menu].input as string]
      }
    }
    this.$emit('update:paramInput', this.resultParamInput)
  },
  methods: {
    initConfigParameters (menu: Menu) {
      if (menu.title === undefined) menu.title = 'parameters.menu'
      if (menu.enabled === undefined) menu.enabled = true
      if (menu.visible === undefined) menu.visible = true
      if (menu.color === undefined) menu.color = 'white'
      if (!Array.isArray(menu.elements)) {
        for (const subMenuKey in menu.elements) {
          this.initConfigParameters((menu.elements as { [key: string]: Menu })[subMenuKey])
        }
      }
    },
    initResultParamInput (menu: Menu, input: any) {
      if (!Array.isArray(menu.elements)) {
        for (const subMenuKey in menu.elements) {
          const subMenu = (menu.elements as { [key: string]: Menu })[subMenuKey]
          this.initResultParamInput(subMenu, input[menu.input as string])
          if (!menu.elements[subMenuKey].enabled) {
            delete input[subMenu.input as string]
          }
        }
      }
    },
    toggleVisibleAll () {
      this.setVisibleAll(!this.collapseAll)
    },
    setVisibleAll (newValue: boolean) {
      this.collapseAll = newValue
      for (const menuKey in this.configParameters) {
        this.changeMenuVisible(this.configParameters[menuKey])
      }
    },
    changeMenuVisible (menu: Menu) {
      menu.visible = this.collapseAll
      if (!Array.isArray(menu.elements)) {
        for (const subMenuKey in menu.elements) {
          this.changeMenuVisible((menu.elements as { [key: string]: Menu })[subMenuKey])
        }
      }
    },
    toggleEnableAll () {
      this.enableAll = !this.enableAll
      for (const menuKey in this.configParameters) {
        this.changeMenuEnabled(this.configParameters[menuKey])
      }
      if (!this.enableAll) this.setVisibleAll(false)
    },
    changeMenuEnabled (menu: Menu) {
      menu.enabled = this.enableAll
      if (!Array.isArray(menu.elements)) {
        for (const subMenuKey in menu.elements) {
          this.changeMenuEnabled((menu.elements as { [key: string]: Menu })[subMenuKey])
        }
      }
    },
    setEnabled (menuKeys: string[], menuInputs: string[], enabled: boolean) {
      if (menuKeys.length !== 0) {
        let menu = this.configParameters[menuKeys[0]]
        for (let i = 1; i < menuKeys.length; i++) {
          menu = (menu.elements as { [key: string]: Menu })[menuKeys[i]]
        }
        menu.enabled = enabled
        let inputToAdd = null
        if (enabled) {
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
#the-parameters {
  background-color: $background-secondary;
  padding: 3px 20px 3px 15px;
}

.profile {
  margin-bottom: 30px;
  text-align: center;
}

.profile img {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
}

.profile h3 {
  color: #ffffff;
  margin: 10px 0 5px;
}

.profile p {
  color: rgb(255, 255, 255);
  font-size: 14px;
}

#parameters-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media only screen and (min-width: 768px) {
  #the-parameters {
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

  #parameters-actions {
    grid-gap: 10px;
    margin-bottom: 1em;
  }

  #parameters-actions button {
    background: $background-primary;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1em;
    padding: 5px 5px 5px 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  #parameters-actions button span {
    flex: 1;
  }
}

/* Hide scrollbar for Chrome, Safari and Opera */

#parameters::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#parameters {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

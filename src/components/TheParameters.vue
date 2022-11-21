<template>
  <div id="the-parameters">
    <div id="parameters-wrapper">
      <div id="parameters" ref="divParameters">
        <div id="language-option">
          <app-locale-changer/>
        </div>
        <div class="profile">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Trondheim_komm.svg/1200px-Trondheim_komm.svg.png" alt="profile_picture">
          <h1>Trondheim kommune <br> {{ $t('parameters.subtitle') }}</h1>
          <div id="advices">
            <font-awesome-icon icon="fa-solid fa-sliders" class="fa-2x"/>
            <h2>{{ $t('parameters.advices.parameters') }}</h2>
            <font-awesome-icon icon="fa-solid fa-location-dot" class="fa-2x"/>
            <h2>{{ $t('parameters.advices.marker') }}</h2>
            <font-awesome-icon icon="fa-solid fa-arrow-pointer" class="fa-2x"/>
            <h2>{{ $t('parameters.advices.details') }}</h2>
          </div>
          <router-link to="about" id="link-about">{{ $t('parameters.more') }}</router-link>
        </div>
        <div id="parameters-actions">
          <button @click="reset" style="grid-column: 2 / span 2">
            <font-awesome-icon icon="fa-solid fa-trash"/>
            <span>{{ $t('parameters.actions.reset') }}</span>
          </button>
          <button v-show="!enableAll" @click="toggleEnableAll" class="action-enable">
            <font-awesome-icon icon="fa-solid fa-square-check"/>
            <span>{{ $t('parameters.actions.enableAll') }}</span>
          </button>
          <button v-show="enableAll" @click="toggleEnableAll" class="action-enable">
            <font-awesome-icon icon="fa-solid fa-square-xmark"/>
            <span>{{ $t('parameters.actions.disableAll') }}</span>
          </button>
          <button v-show="collapseAll" @click="toggleVisibleAll" class="action-collapse">
            <font-awesome-icon icon="fa-solid fa-angles-down" rotation="180"/>
            <span>{{ $t('parameters.actions.collapseAll') }}</span>
          </button>
          <button v-show="!collapseAll" @click="toggleVisibleAll" class="action-collapse">
            <font-awesome-icon icon="fa-solid fa-angles-down"/>
            <span>{{ $t('parameters.actions.expendAll') }}</span>
          </button>
        </div>
        <menu-collapse v-for="(menu, key) in configParameters" :key="key"
                       :title="$t(menu.title ? menu.title : '')" :help="$t(menu.help ? menu.help : '')" :color="menu.color"
                       :model-value="menu.enabled" :elements="menu.elements" :input="menu.input"
                       :menu-key="key" :param-input="internalParamInput[menu.input]" :visible="menu.visible"
                       @change-enabled="isEnabled => setEnabled([key], [menu.input], isEnabled)"
                       @change-value="changeValue" @set-enabled="setEnabled" @change-visible="(isVisible) => {menu.visible = isVisible}"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheParametersMenuCollapse from '@/components/TheParametersMenuCollapse.vue'
import { ConfigParameters, JSONObject, JSONValue, Menu } from '@/type'
import configParameters from '../assets/config/config_parameters.json'
import paramInput from '../assets/config/param_input.json'
import { getCookie, setCookie } from '@/helpers/cookiesUtils'
import AppLocaleChanger from '@/components/AppLocaleChanger.vue'

export default defineComponent({
  name: 'TheParameters',
  components: {
    MenuCollapse: TheParametersMenuCollapse,
    AppLocaleChanger
  },
  emits: ['update:paramInput'],
  data () {
    return {
      internalParamInput: JSON.parse(JSON.stringify(paramInput)) as JSONObject,
      resultParamInput: JSON.parse(JSON.stringify(paramInput)) as JSONObject,
      configParameters: JSON.parse(JSON.stringify(configParameters)) as ConfigParameters,
      collapseAll: true,
      enableAll: true
    }
  },
  beforeMount () {
    const parameters = getCookie('parameters')
    const configuration = getCookie('configuration')
    if (parameters !== null && configuration !== null) {
      this.internalParamInput = JSON.parse(parameters)
      this.resultParamInput = JSON.parse(parameters)
      const config: ConfigParameters = JSON.parse(configuration)
      for (const configKey in config) {
        this.preInitConfigParameters(this.configParameters[configKey], config[configKey])
      }
    }
    for (const menu in this.configParameters) {
      this.initConfigParameters(this.configParameters[menu])
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      for (const menu in this.configParameters) {
        this.initResultParamInput(this.configParameters[menu], this.resultParamInput[this.configParameters[menu].input as string])
        if (!this.configParameters[menu].enabled) {
          delete this.resultParamInput[this.configParameters[menu].input as string]
        }
      }
      this.$emit('update:paramInput', this.resultParamInput)
    },
    preInitConfigParameters (menu: Menu, config: Menu) {
      menu.enabled = config.enabled
      menu.visible = config.visible
      if (!Array.isArray(menu.elements)) {
        for (const subMenuKey in menu.elements) {
          this.preInitConfigParameters((menu.elements as { [key: string]: Menu })[subMenuKey], (config.elements as { [key: string]: Menu })[subMenuKey])
        }
      }
    },
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
    reset () {
      this.configParameters = JSON.parse(JSON.stringify(configParameters))
      for (const menu in this.configParameters) {
        this.initConfigParameters(this.configParameters[menu])
      }

      this.internalParamInput = JSON.parse(JSON.stringify(paramInput))
      this.resultParamInput = JSON.parse(JSON.stringify(paramInput))
      this.init()
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
          inputToAdd = JSON.parse(JSON.stringify(menuInputs.reduce((a, b) => a[b] as JSONObject, this.internalParamInput)))
          this.initResultParamInput(menu, inputToAdd)
        }
        this.update(menuInputs, inputToAdd)
      }
    },
    changeValue (menuInputs: string[], input: string, value: unknown) {
      if (menuInputs.length !== 0) {
        const menuInput = menuInputs.reduce((a, b) => a[b] as JSONObject, this.internalParamInput)
        menuInput[input] = value as JSONObject
        this.update(menuInputs, menuInput)
      }
    },
    update (menuInputs: string[], value: JSONValue | null) {
      let menu = this.resultParamInput
      let i = 0
      for (; i < menuInputs.length - 1; i++) {
        menu = menu[menuInputs[i]] as JSONObject
      }
      if (value === null && menuInputs.length !== 0) {
        delete menu[menuInputs[i]]
      } else {
        menu[menuInputs[i]] = value as JSONValue
      }
      setCookie('parameters', JSON.stringify(this.internalParamInput))
      setCookie('configuration', this.createConfigurationCookie())
      this.$emit('update:paramInput', JSON.parse(JSON.stringify(this.resultParamInput)))
    },
    createConfigurationCookie (): string {
      let configurationCookie = '{'
      for (const menu in this.configParameters) {
        if (configurationCookie !== '{') configurationCookie += ','
        configurationCookie += '"' + menu + '":' + this.createConfigurationMenuCookie(this.configParameters[menu])
      }
      configurationCookie += '}'
      return configurationCookie
    },
    createConfigurationMenuCookie (menu: Menu): string {
      let configurationCookie = '{"enabled":' + menu.enabled + ','
      configurationCookie += '"visible":' + menu.visible
      if (!Array.isArray(menu.elements) && typeof menu.elements === 'object') {
        configurationCookie += ',"elements":{'
        const keys = Object.keys(menu.elements)
        for (let i = 0; i < keys.length; i++) {
          configurationCookie += '"' + keys[i] + '":' + this.createConfigurationMenuCookie((menu.elements as { [key: string]: Menu })[keys[i]])
          if (i < keys.length - 1) configurationCookie += ','
        }
        configurationCookie += '}'
      }
      configurationCookie += '}'
      return configurationCookie
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
  grid-template-columns: repeat(4, 1fr);
}

#link-about {
  color: white;
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

  #language-option {
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
  }

  #advices {
    display: grid;
    grid-template-columns: 40px 2fr;
    grid-row-gap: 10px;
    grid-column-gap: 7px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  #advices > svg {
    margin: auto;
  }

  #advices > h2 {
    text-align: left;
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

  #parameters-actions button:hover {
    @include brightness-hover()
  }

  .action-enable {
    grid-column: 1 / span 2;
  }

  .action-collapse {
    grid-column: 3 / span 2;
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

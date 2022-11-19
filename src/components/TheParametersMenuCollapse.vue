<template>
  <div class="menu-collapse-wrapper" :style="{backgroundColor: color, filter: 'brightness(' + (!internalEnabled ? '50' : '100') + '%)'}">
    <div class="menu-collapse-title-wrapper">
      <label class="checkbox-control">
        <input type="checkbox" :name="'checkbox' + title" :id="'checkbox' + title"
                :checked="internalEnabled" @change="toggleEnabled" :disabled="totallyDisabled">
      </label>
      <div class="menu-collapse-title-toggle" @click="toggleVisible">
        <h2 class="menu-collapse-title">{{ title }}</h2>
        <div>
          <font-awesome-icon icon="fa-solid fa-caret-down" :transform="{ rotate: internalVisible ? '0' : '90'}" />
        </div>
      </div>
    </div>
    <Transition name="menu-collapse"
                @before-leave="onBeforeLeave" @leave="onLeave" @enter="onEnter">
      <div v-if="internalVisible" class="menu-collapse-content">
        <template v-if="Array.isArray(elements)">
          <div v-for="(element, key, i) in elements" :key="i" class="parameter-section">
            <h3 v-if="element.label" class="parameter-label">{{ $t(element.label) }}</h3>
            <div v-if="element.type === 'group'" :class="'group-' + element.layout" :style="[element.layout === 'grid' ? { 'grid-template-columns': `repeat(${element.items.length},1fr)` } : '']">
              <template v-for="(item, index) in element.items" :key="index">
                <template v-if="item.type === 'checkbox'">
                  <app-checkbox :checked="paramInput[element.input].indexOf(item.input) !== -1" @input="res => emitChangeValue([], element.input, manageArray(paramInput[element.input], item.input, res))"
                                :disabled="!internalEnabled">
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
                          :disabled="!internalEnabled"
                          :value="paramInput[element.input]" @input-value="res => emitChangeValue([], element.input, res)"/>
              {{ element.functionConverter ? callConverterFunction(element.functionConverter, paramInput[element.input]) : paramInput[element.input] }}
            </template>
          </div>
          <div class="space-between-menu"></div>
        </template>
        <the-parameters-menu-collapse v-else v-for="(menu, key) in elements" :key="key"
                                      :title="$t(menu.title)" :color="menu.color" :model-value="menu.enabled"
                                      :elements="menu.elements" :input="menu.input" :menu-key="String(key)"
                                      :param-input="paramInput[menu.input]" :totally-disabled="!internalEnabled" :visible="menu.visible"
                                      @change-enabled="isEnabled => emitSetEnabled([key], [menu.input], isEnabled)"
                                      @change-value="emitChangeValue" @set-enabled="emitSetEnabled" @change-visible="(isVisible) => {menu.visible = isVisible}"/>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSlider from '@/components/AppSlider.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import { manageArray } from '@/helpers/utils'
import * as Converters from '../helpers/convertersValueParameters'

export default defineComponent({
  name: 'TheParametersMenuCollapse',
  components: {
    AppSlider,
    AppCheckbox
  },
  props: {
    title: {
      type: String
    },
    color: {
      type: String,
      default: 'white'
    },
    visible: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    totallyDisabled: {
      type: Boolean,
      default: false
    },
    elements: {
      type: [Object, Array],
      default: () => {
        return undefined
      }
    },
    input: {
      type: String,
      default: ''
    },
    menuKey: {
      type: String,
      default: ''
    },
    paramInput: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['changeEnabled', 'update:modelValue', 'changeVisible', 'update:visible', 'changeValue', 'setEnabled'],
  data () {
    return {
      internalVisible: this.visible,
      internalColor: this.color,
      internalEnabled: this.modelValue
    }
  },
  watch: {
    visible (newValue) {
      if (newValue !== this.internalVisible) this.internalVisible = newValue
    },
    modelValue (newValue) {
      this.setEnabled(newValue)
    }
  },
  methods: {
    onBeforeLeave (el: HTMLElement) {
      el.style.height = el.scrollHeight + 'px'
    },
    onLeave (el: HTMLElement) {
      el.style.height = '0'
    },
    onEnter (el: HTMLElement) {
      el.style.height = el.scrollHeight + 'px'
    },
    setEnabled (newValue: boolean) {
      this.internalEnabled = newValue
      this.$emit('changeEnabled', this.internalEnabled)
      this.$emit('update:modelValue', this.internalEnabled)
    },
    toggleEnabled () {
      this.setEnabled(!this.internalEnabled)
      this.setVisible(this.internalEnabled)
    },
    setVisible (newValue: boolean) {
      this.internalVisible = newValue
      this.$emit('changeVisible', this.internalVisible)
      this.$emit('update:visible', this.internalVisible)
    },
    toggleVisible () {
      this.setVisible(!this.internalVisible)
    },
    manageArray: manageArray,
    callConverterFunction (functionName: string, value: never) {
      const fn = Converters[functionName as keyof typeof Converters]
      try {
        if (typeof fn === 'function') return fn(value)
        return value
      } catch (e) {
        return value
      }
    },
    emitChangeValue (menuInputs: string[], input: string, value: unknown) {
      menuInputs.unshift(this.input)
      this.$emit('changeValue', menuInputs, input, value)
    },
    emitSetEnabled (menuKeys: string[], menuInputs: string[], enabled: boolean) {
      if (!this.internalEnabled) return
      menuKeys.unshift(this.menuKey)
      menuInputs.unshift(this.input)
      this.$emit('setEnabled', menuKeys, menuInputs, enabled)
    }
  }
})
</script>

<style scoped lang="scss">
.menu-collapse-enter-active,
.menu-collapse-leave-active {
  height: 0;
  transition: height 0.30s ease;
  overflow: hidden;
}

.menu-collapse-enter-from,
.menu-collapse-leave-to {
  height: 0;
}

//.menu-collapse-enter-to,
//.menu-collapse-leave-from {
//  height: v-bind() + 'px';
//}
.checkbox-control input[type="checkbox"]{
  -webkit-appearance: none;
  appearance: none;
  background-color: $background-primary;
  margin: 0;
  font: inherit;
  color: grey;
  width: 1.15em;
  height: 1.15em;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  cursor: pointer;
}

.checkbox-control input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em white;
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.checkbox-control input[type="checkbox"]:checked::before {
  transform: scale(1);
}

.checkbox-control {
  display: flex;
  align-items: center;
}

@media only screen and (min-width: 768px) {

  .menu-collapse-wrapper {
    //border-top: 3px solid grey;
  }

  .menu-collapse-title-wrapper {
    display: flex;
    padding: 4px 0;
    gap: 5px;
  }
  .menu-collapse-title {
    flex-grow: 1;
    font-size: 1.5rem;
    text-align: left;
  }

  .menu-collapse-title-toggle {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    @include user-select-custom(none);
    cursor: pointer;
  }

  .menu-collapse-content {;
    margin-left: 1em;
  }

  .group-flex {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .group-grid {
    display: grid;
    grid-gap: 5px;
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

  .parameter-label {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .parameter-section {
    padding: 10px 0;
    text-align: center;
  }

  .space-between-menu {
    padding: 0.8em 0;
  }
}
</style>

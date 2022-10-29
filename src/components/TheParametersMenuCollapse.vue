<template>
  <div class="menu-collapse-wrapper" :style="{backgroundColor: color, filter: 'brightness(' + (!internalActive ? '50' : '100') + '%)'}">
    <div class="menu-collapse-title-wrapper">
      <input type="checkbox" :name="'checkbox' + title" :id="'checkbox' + title"
             :checked="internalActive" @change="toggleActive" :disabled="totallyDisabled">
      <h3 class="menu-collapse-title" @click="toggleVisible">{{ title }}</h3>
    </div>
    <Transition name="menu-collapse"
                @before-leave="onBeforeLeave" @leave="onLeave" @enter="onEnter">
      <div v-if="internalVisible" class="menu-collapse-content">
        <template v-if="Array.isArray(elements)">
          <template v-for="(element, key, i) in elements" :key="i">
            <div v-if="element.type === 'group'" :class="'group-' + element.layout">
              <template v-for="(item, index) in element.items" :key="index">
                <template v-if="item.type === 'checkbox'">
                  <app-checkbox :checked="paramInput[element.input].indexOf(item.input) !== -1" @input="res => emitChangeValue([], element.input, manageArray(paramInput[element.input], item.input, res))"
                                :disabled="!internalActive">
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
                          :disabled="!internalActive"
                          :value="paramInput[element.input]" @input-value="res => emitChangeValue([], element.input, res)"/>
              {{ paramInput[element.input] }}
            </template>
          </template>
        </template>
        <the-parameters-menu-collapse v-else v-for="(menu, key) in elements" :key="key"
                            :title="$t(menu.title)" :color="menu.color" :model-value="menu.active"
                            :elements="menu.elements" :input="menu.input" :menu-key="String(key)"
                            :param-input="paramInput[menu.input]" :totally-disabled="!internalActive"
                            @change-active="isActive => emitSetActive([key], [menu.input], isActive)"
                            @change-value="emitChangeValue" @set-active="emitSetActive"/>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSlider from '@/components/AppSlider.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import { manageArray } from '@/helpers/utils'

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
  emits: ['changeActive', 'update:modelValue', 'changeVisible', 'update:visible', 'changeValue', 'setActive'],
  data () {
    return {
      internalVisible: this.visible,
      internalColor: this.color,
      internalActive: this.modelValue
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
    toggleActive () {
      this.internalActive = !this.internalActive
      this.$emit('changeActive', this.internalActive)
      this.$emit('update:modelValue', this.internalActive)
    },
    toggleVisible () {
      this.internalVisible = !this.internalVisible
      this.$emit('changeVisible', this.internalVisible)
      this.$emit('update:visible', this.internalVisible)
    },
    manageArray: manageArray,
    emitChangeValue (menuInputs: string[], input: string, value: unknown) {
      menuInputs.unshift(this.input)
      this.$emit('changeValue', menuInputs, input, value)
    },
    emitSetActive (menuKeys: string[], menuInputs: string[], active: boolean) {
      if (!this.internalActive) return
      menuKeys.unshift(this.menuKey)
      menuInputs.unshift(this.input)
      this.$emit('setActive', menuKeys, menuInputs, active)
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

@media only screen and (min-width: 768px) {
  .menu-collapse-title-wrapper {
    display: flex;
    padding: 4px 0;
  }
  .menu-collapse-title {
    flex-grow: 1;
    cursor: pointer;
    font-size: 1.5rem;
    text-align: left;
    user-select: none;
  }
  .menu-collapse-content {
    padding-bottom: 5px;
  }

  .group-flex {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }
}
</style>

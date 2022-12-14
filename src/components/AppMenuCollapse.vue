<template>
  <div class="menu-collapse-wrapper" :style="{backgroundColor: color, filter: 'brightness(' + (!internalEnabled ? '50' : '100') + '%)'}">
    <div class="menu-collapse-title-wrapper">
      <input type="checkbox" :name="'checkbox' + title" :id="'checkbox' + title"
             :checked="internalEnabled" @change="toggleEnabled">
      <h3 class="menu-collapse-title" @click="toggleVisible">{{ title }}</h3>
    </div>
    <Transition name="menu-collapse"
                @before-leave="onBeforeLeave" @leave="onLeave" @enter="onEnter">
      <div v-if="internalVisible" class="menu-collapse-content">
        <slot>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMenuCollapse',
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
    }
  },
  emits: ['changeEnabled', 'update:modelValue', 'changeVisible', 'update:visible'],
  data () {
    return {
      internalVisible: this.visible,
      internalColor: this.color,
      internalEnabled: this.modelValue
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
    toggleEnabled () {
      this.internalEnabled = !this.internalEnabled
      this.$emit('changeEnabled', this.internalEnabled)
      this.$emit('update:modelValue', this.internalEnabled)
    },
    toggleVisible () {
      this.internalVisible = !this.internalVisible
      this.$emit('changeVisible', this.internalVisible)
      this.$emit('update:visible', this.internalVisible)
    }
  }
})
</script>

<style scoped lang="scss">
.menu-collapse-enter-active,
.menu-collapse-leave-active{
  height: 0;
  transition: height 0.30s ease;
  overflow: hidden;
}

.menu-collapse-enter-from,
.menu-collapse-leave-to{
  height: 0;
}

//.menu-collapse-enter-to,
//.menu-collapse-leave-from {
//  height: v-bind() + 'px';
//}

@media only screen and (min-width: 768px) {
  .menu-collapse-title-wrapper {
    display: flex;
  }
  .menu-collapse-title {
    flex-grow: 1;
    cursor: pointer;
    font-size: 1.5rem;
    text-align: left;
    @include user-select-custom(none);
  }
  .menu-collapse-content {
    padding-bottom: 5px;
  }
}
</style>

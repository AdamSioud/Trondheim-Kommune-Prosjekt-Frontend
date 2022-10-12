<template>
  <div>
    <h3 style="text-align: left; font-size: 1.5rem" @click="visible = !visible">{{ title }}</h3>
    <Transition name="menu-collapse">
      <div v-if="visible">
        <slot>
          <div></div>
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
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    collapse () {
      console.log('collapse')
    }
  }
})
</script>

<style scoped lang="scss">
.menu-collapse-enter-active,
.menu-collapse-leave-active{
  height: 0;
  transition: height 0.30s ease;
}

.menu-collapse-enter-from,
.menu-collapse-leave-to{
  height: 0;
}
</style>

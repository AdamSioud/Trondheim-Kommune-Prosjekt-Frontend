<template>
  <div class="card" :style="{width: internalWidth }">
    <div class="title">
      <div class="name">{{ $t(title) }}</div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppCard',
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    width: {
      type: String,
      default: '500px'
    }
  },
  computed: {
    internalWidth () {
      return this.width || '500px'
    }
  }
})
</script>

<style scoped lang="scss">
.card {
  flex: 1;
  margin: 0 20px;
  background: $background-secondary;
  border-radius: 15px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
}

.card > .title {
  font-size: 1.5rem;
  text-align: center;
  color: white;
  padding: 5px;
}
</style>

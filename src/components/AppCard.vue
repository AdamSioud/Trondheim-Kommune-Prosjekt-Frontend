<template>
  <div class="card">
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
  min-width: 500px;
}

.card > .title {
  font-size: 1.5rem;
  text-align: center;
  color: white;
  padding: 5px;
}
</style>

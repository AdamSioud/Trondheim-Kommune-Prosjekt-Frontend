<template>
  <div id="theDetails">
    <div>The details</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheDetails'
})
</script>

<style scoped lang="scss">
#theDetails {
  background: mediumseagreen;
}
@media only screen and (min-width: 768px) {
  #theDetails{
    height: 150px;
    overflow: scroll;
    color: black;
  }
}
</style>

<template>
  <div id="theDetails">The details</div>
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
  }
}
</style>

<template>
  <div id="not-found">
    404 - {{ $t('error.notFound') }}
    <router-link to="/">{{ $t('error.home') }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404View'
})
</script>

<style scoped lang="scss">
#not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 5rem;
  flex-direction: column;
}
</style>

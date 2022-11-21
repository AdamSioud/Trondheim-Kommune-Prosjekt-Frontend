<template>
  <div class="height100 flex-column">
    <app-modal/>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppModal from '@/components/AppModal.vue'
import { getCookie } from '@/helpers/cookiesUtils'

export default defineComponent({
  name: 'App',
  components: { AppModal },
  mounted () {
    const lang = getCookie('language')
    if (lang && this.$i18n.availableLocales.includes(lang)) this.$i18n.locale = lang
  }
})
</script>

<style lang="scss">
#trondheim-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #ffffff;
  background-color: $background-primary;
}
.height100{
  height: 100%;
}

.flex-column{
  display: flex;
  flex-direction: column;
}

h1{
  font-size: 1.5rem;
}

@media only screen and (min-width: 768px) {
  .height100 {
    overflow: hidden;
  }
}
</style>

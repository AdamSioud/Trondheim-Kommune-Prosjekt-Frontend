
<template>
  <div class="height100 flex-column">
    <!-- Removed the navbar
    <nav>
      <router-link to="/">
        Home
      </router-link>
      |
      <router-link to="/about">
        About
      </router-link>
      |
      <router-link to="map">
        Map
      </router-link>
    </nav>
     -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted () {
    // window.addEventListener('resize', this.onresize)
  },
  methods: {
    onresize () {
      const app = document.getElementById('app')
      if (app) app.style.maxHeight = '' + window.innerHeight
    }
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

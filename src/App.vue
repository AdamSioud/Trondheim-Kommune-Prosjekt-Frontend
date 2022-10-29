<template>
  <div class="height100 flex-column">
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
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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
</style>

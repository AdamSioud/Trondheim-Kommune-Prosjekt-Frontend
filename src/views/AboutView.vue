<template>
  <div class="about">
    <div class="container">
      <h1>{{ $t('about.title') }}</h1>
      <router-link to="/" style="color: white">{{ $t('about.return') }}</router-link>
      <article>
        <h2>{{ $t('parameters.title') }}</h2>
        <article>
          <h3>{{ $t('parameters.price.title') }}</h3>
          <p>{{ $t('parameters.price.content') }}</p>
        </article>
        <article>
          <h3>{{ $t('parameters.age.title') }}</h3>
          <p>{{ $t('parameters.age.content') }}</p>
        </article>
        <article>
          <h3>{{ $t('parameters.neighborhood.title') }}</h3>
          <section>
            <h4>{{ $t('parameters.neighborhood.wellbeing.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.wellbeing.content') }}</p>
          </section>
          <section>
            <h4>{{ $t('parameters.neighborhood.safety.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.safety.content') }}</p>
          </section>
          <section>
            <h4>{{ $t('parameters.neighborhood.culture.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.culture.content') }}</p>
          </section>
          <section>
            <h4>{{ $t('parameters.neighborhood.outdoor.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.outdoor.content') }}</p>
          </section>
          <section>
            <h4>{{ $t('parameters.neighborhood.transport.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.transport.content') }}</p>
          </section>
          <section>
            <h4>{{ $t('parameters.neighborhood.walkway.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.walkway.content') }}</p>
          </section>
          <section>
            <h4>{{ $t('parameters.neighborhood.grocery.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.grocery.content') }}</p>
          </section>
          <section>
            <h4>{{ $t('parameters.neighborhood.noise.title') }}</h4>
            <p>{{ $t('parameters.neighborhood.noise.content') }}</p>
          </section>
        </article>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutView',
  components: {}
})
</script>

<style scoped lang="scss">
.about,
.container {
  height: 100%;
}
html {
  overflow: auto;
}
.container {
  margin: 0 150px;
  text-align: center;
  background: $background-secondary;
  position: relative;
  overflow: auto;

  h2 {
    font-size: 1.3rem;
  }
  h3 {
    font-size: 1.2rem;
  }
  h4 {
    font-size: 1.1rem;
  }

  article, section {
    margin: 10px 0;
  }
}
</style>

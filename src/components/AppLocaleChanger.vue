<template>
  <div id="locale-changer">
    <div @click.stop="open">
      <font-awesome-icon icon="fa-solid fa-language" size="2xl"/>
    </div>
    <Transition name="open-languages">
      <div v-if="isOpen" id="languages">
        <div v-for="(lang, i) in this.$i18n.availableLocales" :key="`Lang${i}`" :class="{selected:lang === $i18n.locale }"
             @click="changeLanguage(lang)">
          {{ lang }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLocaleChanger',
  data () {
    return {
      isOpen: false
    }
  },
  mounted () {
    console.log(this.$i18n.availableLocales)
  },
  methods: {
    open (event: Event) {
      event.preventDefault()
      this.isOpen = !this.isOpen
      document.addEventListener('click', () => { this.isOpen = false }, { once: true })
    },
    changeLanguage (lang: string) {
      this.$i18n.locale = lang
      this.isOpen = false
    }
  }
})
</script>

<style scoped lang="scss">
.open-languages-enter-active,
.open-languages-leave-active {
  //height: 0;
  display: block;
  transition: opacity 0.3s ease;
  overflow: hidden;
}

.open-languages-enter-from,
.open-languages-leave-to {
  //height: 0;
  opacity: 0;
}

#locale-changer {
  position: relative;
  z-index: 9999;
}

#languages {
  background-color: white;
  color: black;
  border-radius: 15px;
  position: absolute;
  transform: translateX(-15%);
  overflow: hidden;
}

#languages > div {
  padding: 5px 20px;
}

#languages > div:hover {
  @include brightness-hover();
  background: $background-primary;
}

#languages .selected {
  background: $background-primary;
}
</style>

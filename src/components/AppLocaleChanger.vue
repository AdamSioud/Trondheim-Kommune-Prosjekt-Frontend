<template>
  <div id="locale-changer">
    <div @click.stop="open">
      <font-awesome-icon icon="fa-solid fa-language" size="2xl"/>
    </div>
    <Transition name="open-languages">
      <div v-if="isOpen" id="languages">
        <div v-for="(lang, i) in this.$i18n.availableLocales" :key="`Lang${i}`" :class="{selected:lang === $i18n.locale }"
             @click="changeLanguage(lang)">
          {{ $t('languages.' + lang) }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { setCookie } from '@/helpers/cookiesUtils'

export default defineComponent({
  name: 'AppLocaleChanger',
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    open (event: Event) {
      event.preventDefault()
      this.isOpen = !this.isOpen
      document.addEventListener('click', () => { this.isOpen = false }, { once: true })
    },
    changeLanguage (lang: string) {
      this.$i18n.locale = lang
      // 31536000000 = 1 year
      setCookie('language', lang, { expires: 31536000000 })
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
  z-index: 9000;
}

#languages {
  background-color: white;
  color: black;
  position: absolute;
  overflow: hidden;
  border-radius: 3px 10px 10px 10px;
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

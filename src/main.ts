import './assets/stylesheets/reset.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

import {
  faAnglesDown,
  faCaretDown,
  faChild,
  faHouse,
  faLocationCrosshairs,
  faLocationDot,
  faPerson,
  faPersonCane,
  faPlus,
  faSquareCheck,
  faSquareXmark,
  faArrowPointer,
  faTrash,
  faLanguage,
  faXmark,
  faSliders
} from '@fortawesome/free-solid-svg-icons'
import { useErrorStore } from '@/stores/error'
import { CustomError } from '@/classes/CustomError'

library.add(faHouse, faPerson, faChild, faPersonCane, faLocationDot, faLocationCrosshairs,
  faPlus, faXmark, faCaretDown, faAnglesDown, faSquareCheck, faSquareXmark, faTrash, faLanguage, faArrowPointer, faSliders)

const app = createApp(App)
const pinia = createPinia()

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: typeof axios
  }
}

const axiosApp = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

app.config.globalProperties.$axios = axiosApp

app.use(i18n).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).component('font-awesome-layers', FontAwesomeLayers).mount('#trondheim-app')

app.config.errorHandler = (err, vm) => {
  const errorStore = useErrorStore()
  if (typeof err === 'object' && err && 'stack' in err && 'message' in err) {
    errorStore.title = vm !== null ? vm.$t('error.error') : 'Error O'
    errorStore.message = (err as Error).message
    if (err instanceof CustomError) {
      if (err.name !== 'CustomError') errorStore.title = err.name
      errorStore.advice = err.advice
    }

    errorStore.isError = true
  }
  console.error(err)
}

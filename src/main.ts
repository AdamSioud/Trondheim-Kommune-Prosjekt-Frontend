import './assets/stylesheets/reset.css'
import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHouse, faPerson, faChild, faPersonCane } from '@fortawesome/free-solid-svg-icons'

library.add(faHouse, faPerson, faChild, faPersonCane)

const app = createApp(App)

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: typeof axios
  }
}
const axiosApp = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})
app.config.globalProperties.$axios = axiosApp
app.use(i18n).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

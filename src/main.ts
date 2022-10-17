import './assets/stylesheets/reset.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHouse, faPerson, faChild, faPersonCane } from '@fortawesome/free-solid-svg-icons'

library.add(faHouse, faPerson, faChild, faPersonCane)

createApp(App).use(i18n).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

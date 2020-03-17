import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'

import '@/utils/icons.js'
import '@/assets/css/app.css'

import Translations from '@/assets/json/translations.json'

Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'en',
  messages: Translations
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

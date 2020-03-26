import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'

import '@/utils/mixins.js'
import '@/utils/icons.js'

import '@/assets/css/app.css'

import Translations from '@/assets/json/translations.json'

Vue.use(VueI18n)
Vue.config.productionTip = false

let locale = 'en'
let locales = ['en', 'nl', 'es']
let navLang = navigator.languages !== undefined ? navigator.languages[0].substring(0, 2).toLowerCase() : navigator.language.substring(0, 2).toLowerCase()

locales.map((lang) => {
  if (navLang === lang) locale = lang
})

const i18n = new VueI18n({
  locale: locale,
  messages: Translations
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

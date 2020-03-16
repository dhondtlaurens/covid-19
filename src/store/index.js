import Vue from 'vue'
import Vuex from 'vuex'

import App from './modules/app'
import Dates from './modules/dates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    App,
    Dates
  }
})

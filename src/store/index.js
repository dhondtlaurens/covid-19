import Vue from 'vue'
import Vuex from 'vuex'

import App from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    App
  }
})

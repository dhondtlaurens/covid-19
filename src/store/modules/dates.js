const state = {
  dates: {}
}

const mutations = {
  setDatesData (state, value) {
    state.dates = value
  },
  addDatesData (state, value) {
    state.dates[value.key] = value.value
  }
}

const actions = {
  setDatesData ({ commit }, value) {
    commit('setDatesData', value)
  },
  addDatesData ({ commit }, value) {
    commit('addDatesData', value)
  }
}

const getters = {
  getDatesData: state => {
    return state.dates
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

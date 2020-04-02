const state = {
  dates: {},
  datesStates: {}
}

const mutations = {
  setDatesData (state, value) {
    state.dates = value
  },
  setDatesDataStates (state, value) {
    state.datesStates = value
  },

  addDatesData (state, value) {
    state.dates[value.key] = value.value
  },
  addDatesDataStates (state, value) {
    state.datesStates[value.key] = value.value
  }
}

const actions = {
  setDatesData ({ commit }, value) {
    commit('setDatesData', value)
  },
  setDatesDataStates ({ commit }, value) {
    commit('setDatesDataStates', value)
  },

  addDatesData ({ commit }, value) {
    commit('addDatesData', value)
  },
  addDatesDataStates ({ commit }, value) {
    commit('addDatesDataStates', value)
  }
}

const getters = {
  getDatesData: state => {
    return state.dates
  },
  getDatesDataStates: state => {
    return state.datesStates
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

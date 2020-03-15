const state = {
  data: {},
  active: 'All',

  cases: 0,
  deaths: 0,
  critical: 0,
  recovered: 0
}

const mutations = {
  setAppData (state, value) {
    state.data = value
  },
  setAppActive (state, value) {
    state.active = value
  },
  setAppCases (state, value) {
    state.cases = value
  },
  setAppDeaths (state, value) {
    state.deaths = value
  },
  setAppCritical (state, value) {
    state.critical = value
  },
  setAppRecovered (state, value) {
    state.recovered = value
  }
}

const actions = {
  setAppData ({ commit }, value) {
    commit('setAppData', value)

    value.map((country) => {
      state.cases += parseInt(country.cases)
      state.deaths += parseInt(country.deaths)
      state.critical += parseInt(country.critical)
      state.recovered += parseInt(country.recovered)
    })
  },
  setAppActive ({ commit }, value) {
    commit('setAppActive', value)
  },
  setAppCases ({ commit }, value) {
    commit('setAppCases', value)
  },
  setAppDeaths ({ commit }, value) {
    commit('setAppDeaths', value)
  },
  setAppCritical ({ commit }, value) {
    commit('setAppCritical', value)
  },
  setAppRecovered ({ commit }, value) {
    commit('setAppRecovered', value)
  },
}

const getters = {
  getAppData: state => {
    return state.data
  },
  getAppActive: state => {
    return state.active
  },
  getAppCases: state => {
    return state.cases
  },
  getAppDeaths: state => {
    return state.deaths
  },
  getAppCritical: state => {
    return state.critical
  },
  getAppRecovered: state => {
    return state.recovered
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

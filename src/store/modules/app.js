const state = {
  data: {},
  active: 'Belgium',

  cases: 0,
  deaths: 0,
  critical: 0,
  recovered: 0,

  totalCases: 0,
  totaldeaths: 0,
  totalCritical: 0,
  totalRecovered: 0
}

const mutations = {
  setAppData (state, value) {
    state.data = value
  },
  setAppActive (state, value) {
    state.active = value
  }
}

const actions = {
  setAppData ({ commit }, value) {
    commit('setAppData', value)
    updateToday(value, state.active)
  },
  setAppActive ({ commit }, value) {
    commit('setAppActive', value)
    updateToday(state.data, value)
  }
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
  getAppTotalCases: state => {
    return state.totalCases
  },
  getAppDeaths: state => {
    return state.deaths
  },
  getAppTotalDeaths: state => {
    return state.totaldeaths
  },
  getAppCritical: state => {
    return state.critical
  },
  getAppTotalCritical: state => {
    return state.totalCritical
  },
  getAppRecovered: state => {
    return state.recovered
  },
  getAppTotalRecovered: state => {
    return state.totalRecovered
  }
}

const updateToday = (data, country) => {
  console.log(data)
  console.log(country)

  state.cases = 0
  state.totalCases = 0

  state.deaths = 0
  state.totaldeaths = 0

  state.critical = 0
  state.totalCritical = 0

  state.recovered = 0
  state.totalRecovered = 0

  data.map((item) => {
    state.totalCases += parseInt(item.cases)
    state.totaldeaths += parseInt(item.deaths)
    state.totalCritical += parseInt(item.critical)
    state.totalRecovered += parseInt(item.recovered)

    if (country === item.country || country === '') {
      state.cases += parseInt(item.cases)
      state.deaths += parseInt(item.deaths)
      state.critical += parseInt(item.critical)
      state.recovered += parseInt(item.recovered)
    }
  })
}

export default {
  state,
  mutations,
  actions,
  getters
}

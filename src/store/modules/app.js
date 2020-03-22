const state = {
  active: '',

  data: {},
  dataYesterday: {},

  cases: 0,
  casesYesterday: 0,

  deaths: 0,
  deathsYesterday: 0,

  critical: 0,
  criticalYesterday: 0,

  recovered: 0,
  recoveredYesterday: 0,

  totalCases: 0,
  totalCasesYesterday: 0,

  totalDeaths: 0,
  totalDeathsYesterday: 0,

  totalCritical: 0,
  totalCriticalYesterday: 0,

  totalRecovered: 0,
  totalRecoveredYesterday: 0
}

const mutations = {
  setAppData (state, value) {
    state.data = value
  },
  setAppDataYesterday (state, value) {
    state.dataYesterday = value
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
  setAppDataYesterday ({ commit }, value) {
    commit('setAppDataYesterday', value)
    updateYesterday(value, state.active)
  },
  setAppActive ({ commit }, value) {
    commit('setAppActive', value)

    updateToday(state.data, value)
    updateYesterday(state.dataYesterday, value)
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
  getAppCasesYesterday: state => {
    return state.casesYesterday
  },
  getAppTotalCases: state => {
    return state.totalCases
  },
  getAppTotalCasesYesterday: state => {
    return state.totalCasesYesterday
  },
  getAppDeaths: state => {
    return state.deaths
  },
  getAppDeathsYesterday: state => {
    return state.deathsYesterday
  },
  getAppTotalDeaths: state => {
    return state.totalDeaths
  },
  getAppTotalDeathsYesterday: state => {
    return state.totalDeathsYesterday
  },
  getAppCritical: state => {
    return state.critical
  },
  getAppCriticalYesterday: state => {
    return state.criticalYesterday
  },
  getAppTotalCritical: state => {
    return state.totalCritical
  },
  getAppTotalCriticalYesterday: state => {
    return state.totalCriticalYesterday
  },
  getAppRecovered: state => {
    return state.recovered
  },
  getAppRecoveredYesterday: state => {
    return state.recoveredYesterday
  },
  getAppTotalRecovered: state => {
    return state.totalRecovered
  },
  getAppTotalRecoveredYesterday: state => {
    return state.totalRecoveredYesterday
  }
}

const updateToday = (data, country) => {
  state.cases = 0
  state.totalCases = 0

  state.deaths = 0
  state.totalDeaths = 0

  state.critical = 0
  state.totalCritical = 0

  state.recovered = 0
  state.totalRecovered = 0

  data.map((item) => {
    state.totalCases += parseInt(item.cases)
    state.totalDeaths += parseInt(item.deaths)
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

const updateYesterday = (data, country) => {
  if (Object.keys(data).length > 0) {
    state.casesYesterday = 0
    state.totalCasesYesterday = 0

    state.deathsYesterday = 0
    state.totalDeathsYesterday = 0

    state.criticalYesterday = 0
    state.totalCriticalYesterday = 0

    state.recoveredYesterday = 0
    state.totalRecoveredYesterday = 0

    data.map((item) => {
      state.totalCasesYesterday += parseInt(item.cases)
      state.totalDeathsYesterday += parseInt(item.deaths)
      state.totalCriticalYesterday += parseInt(item.critical)
      state.totalRecoveredYesterday += parseInt(item.recovered)

      if (country === item.country || country === '') {
        state.casesYesterday += parseInt(item.cases)
        state.deathsYesterday += parseInt(item.deaths)
        state.criticalYesterday += parseInt(item.critical)
        state.recoveredYesterday += parseInt(item.recovered)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

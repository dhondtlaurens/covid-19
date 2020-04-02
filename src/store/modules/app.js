const state = {
  active: '',
  activeStates: '',

  data: {},
  dataStates: {},

  dataYesterday: {},
  dataYesterdayStates: {},

  cases: 0,
  casesStates: 0,

  casesYesterday: 0,
  casesYesterdayStates: 0,

  deaths: 0,
  deathsStates: 0,

  deathsYesterday: 0,
  deathsYesterdayStates: 0,

  critical: 0,
  criticalStates: 0,

  criticalYesterday: 0,
  criticalYesterdayStates: 0,

  recovered: 0,
  recoveredStates: 0,

  recoveredYesterday: 0,
  recoveredYesterdayStates: 0,

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
  setAppDataStates (state, value) {
    state.dataStates = value
  },

  setAppDataYesterday (state, value) {
    state.dataYesterday = value
  },
  setAppDataYesterdayStates (state, value) {
    state.dataYesterdayStates = value
  },

  setAppActive (state, value) {
    state.active = value
  },
  setAppActiveStates (state, value) {
    state.activeStates = value
  }
}

const actions = {
  setAppData ({ commit }, value) {
    commit('setAppData', value)
    updateToday(value, state.active)
  },
  setAppDataStates ({ commit }, value) {
    commit('setAppDataStates', value)
    updateTodayStates(value, state.activeStates)
  },

  setAppDataYesterday ({ commit }, value) {
    commit('setAppDataYesterday', value)
    updateYesterday(value, state.active)
  },
  setAppDataYesterdayStates ({ commit }, value) {
    commit('setAppDataYesterdayStates', value)
    updateYesterdayStates(value, state.activeStates)
  },

  setAppActive ({ commit }, value) {
    commit('setAppActive', value)

    updateToday(state.data, value)
    updateYesterday(state.dataYesterday, value)
  },
  setAppActiveStates ({ commit }, value) {
    commit('setAppActiveStates', value)

    updateTodayStates(state.dataStates, value)
    updateYesterdayStates(state.dataYesterdayStates, value)
  }
}

const getters = {
  getAppData: state => {
    return state.data
  },
  getAppDataStates: state => {
    return state.dataStates
  },

  getAppActive: state => {
    return state.active
  },
  getAppActiveStates: state => {
    return state.activeStates
  },

  getAppCases: state => {
    return state.cases
  },
  getAppCasesStates: state => {
    return state.casesStates
  },

  getAppCasesYesterday: state => {
    return state.casesYesterday
  },
  getAppCasesYesterdayStates: state => {
    return state.casesYesterdayStates
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
  getAppDeathsStates: state => {
    return state.deathsStates
  },

  getAppDeathsYesterday: state => {
    return state.deathsYesterday
  },
  getAppDeathsYesterdayStates: state => {
    return state.deathsYesterdayStates
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
  getAppCriticalStates: state => {
    return state.criticalStates
  },

  getAppCriticalYesterday: state => {
    return state.criticalYesterday
  },
  getAppCriticalYesterdayStates: state => {
    return state.criticalYesterdayStates
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
  getAppRecoveredStates: state => {
    return state.recoveredStates
  },

  getAppRecoveredYesterday: state => {
    return state.recoveredYesterday
  },
  getAppRecoveredYesterdayStates: state => {
    return state.recoveredYesterdayStates
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

const updateTodayStates = (data, country) => {
  if (country !== '') {
    state.casesStates = 0
    state.deathsStates = 0
    state.criticalStates = 0
    state.recoveredStates = 0

    data.map((item) => {
      if (country === item.country) {
        state.casesStates += parseInt(item.cases)
        state.deathsStates += parseInt(item.deaths)
        state.criticalStates += parseInt(item.critical)
        state.recoveredStates += parseInt(item.recovered)
      }
    })
  }
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

const updateYesterdayStates = (data, country) => {
  if (country !== '') {
    if (Object.keys(data).length > 0) {
      state.casesYesterdayStates = 0
      state.deathsYesterdayStates = 0
      state.criticalYesterdayStates = 0
      state.getAppRecoveredYesterdayStates = 0

      data.map((item) => {
        if (country === item.country) {
          state.casesYesterdayStates += parseInt(item.cases)
          state.deathsYesterdayStates += parseInt(item.deaths)
          state.criticalYesterdayStates += parseInt(item.critical)
          state.getAppRecoveredYesterdayStates += parseInt(item.recovered)
        }
      })
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

<template>
  <div class="charts">
    <curve-component
      v-if="loading === false"
    />

    <div
      class="flex flex-wrap w-full"
      v-if="loading === true"
    >
      <div class="w-full lg:w-1/2 px-16 mb-32">
        <div class="w-full h-full border border-gray-100 overflow-hidden bg-blue-100">
          <div class="loading loading-chart w-full h-full"></div>
        </div>
      </div>

      <div class="w-full lg:w-1/2 px-16 mb-32">
        <div class="w-full h-full border border-gray-100 overflow-hidden bg-blue-100">
          <div class="loading loading-chart w-full h-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Curve from '@/components/charts/curve/Curve'

export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'getAppData',
      'getAppDataStates',

      'getDatesData',
      'getDatesDataStates'
    ])
  },
  methods: {
    fetchAPI () {
      const self = this
      self.loading = true

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      const day = yesterday.getDate() < 10 ? '0' + yesterday.getDate() : yesterday.getDate()
      const month = (yesterday.getMonth() + 1) < 10 ? '0' + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1)
      const year = yesterday.getFullYear().toString().substr(-2) < 10 ? '0' + yesterday.getFullYear().toString().substr(-2) : yesterday.getFullYear().toString().substr(-2)

      fetch('https://covid19-data-api.herokuapp.com/countries/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache'
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            return response.json()
          } else {
            self.fetchLocal()
          }
        })
        .then(function (data) {
          data.sort((a, b) => (parseInt(a.id.substring(6, 8) + a.id.substring(3, 5) + a.id.substring(0, 2)) > parseInt(b.id.substring(6, 8) + b.id.substring(3, 5) + b.id.substring(0, 2))) ? 1 : -1)

          data.map((date) => {
            if (date.id === day + '_' + month + '_' + year) self.$store.dispatch('setAppDataYesterday', JSON.parse(date.value))

            self.$store.dispatch('addDatesData', {
              key: date.id,
              value: JSON.parse(date.value)
            })
          })

          if (Object.keys(self.getDatesDataStates).length > 0) self.loading = false
        })
        .catch(function () {
          self.fetchLocal()
        })
    },
    fetchStatesAPI () {
      const self = this
      self.loading = true

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      const day = yesterday.getDate() < 10 ? '0' + yesterday.getDate() : yesterday.getDate()
      const month = (yesterday.getMonth() + 1) < 10 ? '0' + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1)
      const year = yesterday.getFullYear().toString().substr(-2) < 10 ? '0' + yesterday.getFullYear().toString().substr(-2) : yesterday.getFullYear().toString().substr(-2)

      fetch('https://covid19-data-api.herokuapp.com/states/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache'
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            return response.json()
          } else {
            self.fetchStatesLocal()
          }
        })
        .then(function (data) {
          data.sort((a, b) => (parseInt(a.id.substring(6, 8) + a.id.substring(3, 5) + a.id.substring(0, 2)) > parseInt(b.id.substring(6, 8) + b.id.substring(3, 5) + b.id.substring(0, 2))) ? 1 : -1)

          data.map((date) => {
            if (date.id === day + '_' + month + '_' + year) self.$store.dispatch('setAppDataYesterdayStates', JSON.parse(date.value))

            self.$store.dispatch('addDatesDataStates', {
              key: date.id,
              value: JSON.parse(date.value)
            })
          })

          if (Object.keys(self.getDatesData).length > 0) self.loading = false
        })
        .catch(function () {
          self.fetchStatesLocal()
        })
    },
    fetchLocal () {
      const self = this

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      const day = yesterday.getDate() < 10 ? '0' + yesterday.getDate() : yesterday.getDate()
      const month = (yesterday.getMonth() + 1) < 10 ? '0' + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1)
      const year = yesterday.getFullYear().toString().substr(-2) < 10 ? '0' + yesterday.getFullYear().toString().substr(-2) : yesterday.getFullYear().toString().substr(-2)

      fetch('/data/countries.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache'
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          data.sort((a, b) => (parseInt(a.id.substring(6, 8) + a.id.substring(3, 5) + a.id.substring(0, 2)) > parseInt(b.id.substring(6, 8) + b.id.substring(3, 5) + b.id.substring(0, 2))) ? 1 : -1)

          data.map((date) => {
            if (date.id === day + '_' + month + '_' + year) self.$store.dispatch('setAppDataYesterday', JSON.parse(date.value))

            self.$store.dispatch('addDatesData', {
              key: date.id,
              value: JSON.parse(date.value)
            })
          })

          if (Object.keys(self.getDatesDataStates).length > 0) self.loading = false
        })
    },
    fetchStatesLocal () {
      const self = this

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      const day = yesterday.getDate() < 10 ? '0' + yesterday.getDate() : yesterday.getDate()
      const month = (yesterday.getMonth() + 1) < 10 ? '0' + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1)
      const year = yesterday.getFullYear().toString().substr(-2) < 10 ? '0' + yesterday.getFullYear().toString().substr(-2) : yesterday.getFullYear().toString().substr(-2)

      fetch('/data/states.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache'
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          data.sort((a, b) => (parseInt(a.id.substring(6, 8) + a.id.substring(3, 5) + a.id.substring(0, 2)) > parseInt(b.id.substring(6, 8) + b.id.substring(3, 5) + b.id.substring(0, 2))) ? 1 : -1)

          data.map((date) => {
            if (date.id === day + '_' + month + '_' + year) self.$store.dispatch('setAppDataYesterdayStates', JSON.parse(date.value))

            self.$store.dispatch('addDatesDataStates', {
              key: date.id,
              value: JSON.parse(date.value)
            })
          })

          if (Object.keys(self.getDatesData).length > 0) self.loading = false
        })
    }
  },
  watch: {
    getAppData: function () {
      this.fetchAPI()
    },
    getAppDataStates: function () {
      this.fetchStatesAPI()
    }
  },
  components: {
    'curve-component': Curve
  }
}

</script>

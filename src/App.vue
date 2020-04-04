<template>
  <div id="app" class="min-h-screen w-full overflow-x-hidden font-app">
    <header-chart-component />
    <header-component />

    <router-view />

    <footer-component
      @updateData="fetchAPI"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Header from '@/components/header/Header'
import HeaderChart from '@/components/header/Chart'
import Footer from '@/components/footer/Footer'

export default {
  beforeMount () {
    this.fetchAPI()
    this.fetchStatesAPI()
  },
  computed: {
    ...mapGetters([
      'getAppData',
      'getAppDataStates'
    ])
  },
  methods: {
    fetchAPI () {
      const self = this
      const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }))

      const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
      const year = today.getFullYear().toString().substr(-2) < 10 ? '0' + today.getFullYear().toString().substr(-2) : today.getFullYear().toString().substr(-2)

      fetch('https://covid19-data-api.herokuapp.com/countries/' + day + '_' + month + '_' + year, {
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
          if (JSON.parse(data[0].value).length > 0) {
            self.$store.dispatch('setAppData', JSON.parse(data[0].value))

            if (self.$route.params.country === 'USA' && self.$route.params.state !== undefined) {
              self.setState(self.$route.params.state)
            } else {
              self.setCountry(self.$route.params.country)
            }
          } else {
            self.fetchLocal()
          }
        })
        .catch(function () {
          self.fetchLocal()
        })
    },
    fetchStatesAPI () {
      const self = this
      const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }))

      const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
      const year = today.getFullYear().toString().substr(-2) < 10 ? '0' + today.getFullYear().toString().substr(-2) : today.getFullYear().toString().substr(-2)

      fetch('https://covid19-data-api.herokuapp.com/states/' + day + '_' + month + '_' + year, {
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
          if (JSON.parse(data[0].value).length > 0) {
            self.$store.dispatch('setAppDataStates', JSON.parse(data[0].value))
          } else {
            self.fetchStatesLocal()
          }
        })
        .catch(function () {
          self.fetchStatesLocal()
        })
    },
    fetchLocal () {
      const self = this

      fetch('/data/countriesToday.json', {
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
          self.$store.dispatch('setAppData', JSON.parse(data[0].value))

          if (self.$route.params.country === 'USA' && self.$route.params.state !== undefined) {
            self.setState(self.$route.params.state)
          } else {
            self.setCountry(self.$route.params.country)
          }
        })
    },
    fetchStatesLocal () {
      const self = this

      fetch('/data/statesToday.json', {
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
          self.$store.dispatch('setAppDataStates', JSON.parse(data[0].value))
        })
    },
    setCountry (country) {
      if (Object.keys(this.getAppData).length > 0) {
        if (country !== undefined) {
          const filter = this.getAppData.filter((item) => {
            return item.country === country
          })

          if (filter.length === 1) {
            this.$store.dispatch('setAppActive', country)
            this.$store.dispatch('setAppActiveStates', '')
          } else {
            this.$router.push('/')
          }
        } else {
          if (localStorage.getItem('covidAppActive') !== null && localStorage.getItem('covidAppActive') !== '') {
            this.$router.push('/' + localStorage.getItem('covidAppActive'))
          } else {
            this.$store.dispatch('setAppActive', '')
            this.$store.dispatch('setAppActiveStates', '')
          }
        }
      } else {
        setTimeout(() => {
          this.setCountry(country)
        }, 200)
      }
    },
    setState (country) {
      if (Object.keys(this.getAppDataStates).length > 0) {
        if (country !== undefined) {
          const filter = this.getAppDataStates.filter((item) => {
            return item.country === country
          })

          if (filter.length === 1) {
            this.$store.dispatch('setAppActive', 'USA')
            this.$store.dispatch('setAppActiveStates', country)
          } else {
            this.$router.push('/')
          }
        } else {
          if (localStorage.getItem('covidAppActive') !== null && localStorage.getItem('covidAppActive') !== '') {
            this.$router.push('/' + localStorage.getItem('covidAppActive'))
          } else {
            this.$store.dispatch('setAppActive', '')
            this.$store.dispatch('setAppActiveStates', '')
          }
        }
      } else {
        setTimeout(() => {
          this.setState(country)
        }, 200)
      }
    }
  },
  watch: {
    $route () {
      if (this.$route.params.country === 'USA' && this.$route.params.state !== '' && this.$route.params.state !== undefined) {
        this.setState(this.$route.params.state)
      } else {
        this.setCountry(this.$route.params.country)
      }
    }
  },
  components: {
    'header-component': Header,
    'header-chart-component': HeaderChart,
    'footer-component': Footer
  }
}

</script>

<style lang="scss">

.loading {
    min-height: 120px;

    background: linear-gradient(to right, rgba(235, 243, 255, 0) 0%,lighten(rgba(235, 243, 255, 1), 2%) 50%,rgba(235, 243, 255, 0) 100%);
    animation: progress 1s ease-in-out infinite;
  }

@keyframes progress {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}

</style>

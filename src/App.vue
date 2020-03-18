<template>
  <div id="app" class="min-h-screen font-app">
    <header-chart-component />
    <header-component />

    <router-view />

    <footer-component
      @updateData="fetchAPI"
    />
  </div>
</template>

<script>

import Header from '@/components/header/Header'
import HeaderChart from '@/components/header/Chart'
import Footer from '@/components/footer/Footer'

export default {
  beforeMount () {
    this.fetchAPI()
  },
  methods: {
    fetchAPI () {
      let self = this
      let today = new Date()

      let day = today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)

      fetch('https://covid19-data-api.herokuapp.com/countries/' + day + '_' + month + '_20', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
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
          self.$store.dispatch('setAppData', JSON.parse(data[0].value))
        })
        .catch(function () {
          self.fetchLocal()
        })
    },
    fetchLocal () {
      let self = this

      fetch('/data/countries.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          self.$store.dispatch('setAppData', JSON.parse(data[0].value))
        })
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

</style>

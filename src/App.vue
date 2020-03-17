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
          self.$store.dispatch('setAppData', data)
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

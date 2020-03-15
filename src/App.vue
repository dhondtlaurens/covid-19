<template>
  <div id="app" class="font-app">
    <header-chart-component />
    <header-component />

    <router-view />
  </div>
</template>

<script>

import Header from '@/components/header/Header'
import HeaderChart from '@/components/header/Chart'

export default {
  beforeCreate () {
    let self = this

    // TODO: ADD CACHE API
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
  },
  components: {
    'header-component': Header,
    'header-chart-component': HeaderChart
  }
}

</script>

<style lang="scss">

</style>

<template>
  <div class="list absolute inset-0">
    <div
      class="px-16 py-8 flex justify-between border-b border-gray-100"
      v-for="country in computedCountryList"
      :key="country.country"
    >
      <div class="text-blue-300">
        {{ country.country }}
      </div>

      <div class="text-blue-200">
        {{ country.cases }}
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getAppData'
    ]),
    computedCountryList () {
      let list = [...this.getAppData]

      list.sort((a, b) => (a.cases < b.cases) ? 1 : -1)

      return list
    }
  }
}

</script>

<style lang="scss">

</style>

<div class="relative w-full h-full">
  <div class="absolute inset-0">

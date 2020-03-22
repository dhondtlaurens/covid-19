<template>
  <div
    class="list-container relative px-16 overflow-scroll"
    ref="list-container"
  >
    <div class="list absolute inset-0">
      <div
        class="flex h-32 items-center justify-between border-b border-gray-100 hover:bg-blue-100 cursor-pointer text-12"
        :class="{'bg-blue-100': country.country === getAppActive}"

        v-for="(country, index) in computedCountryList"

        :key="country.country"
        :ref="country.country"
        :data-country="country.country"

        @click="setCountry"
      >
        <div class="h-full flex items-center px-16 text-blue-300 w-2/4 sm:w-2/5 border-r border-gray-100" >
          {{ index + 1 }}. {{ country.country }}
        </div>

        <div class="h-full hidden sm:flex justify-center items-center px-16 text-blue-300 sm:w-1/5 border-r border-gray-100">
          {{ population[country.country] }}
        </div>

        <div class="h-full flex items-center justify-center px-16 text-blue-200 w-1/4 sm:w-1/5 border-r border-gray-100">
          {{ country.cases }}
        </div>

        <div class="h-full flex items-center justify-center px-16 text-red-100 w-1/4 sm:w-1/5">
          {{ country.deaths }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import population from '@/assets/json/population.json'

export default {
  data () {
    return {
      population: population
    }
  },
  mounted () {
    if (this.getAppActive !== '') this.$refs['list-container'].scrollTop = this.$refs[this.getAppActive][0].offsetTop
  },
  computed: {
    ...mapGetters([
      'getAppData',
      'getAppActive'
    ]),
    computedCountryList () {
      let list = [...this.getAppData]
      list.sort((a, b) => (a.cases < b.cases) ? 1 : -1)

      return list
    }
  },
  methods: {
    setCountry (e) {
      localStorage.setItem('covidAppActive', e.currentTarget.dataset.country)
      this.$router.push('/' + e.currentTarget.dataset.country)
    }
  },
  watch: {
    'getAppActive': function () {
      if (this.getAppActive !== '') this.$refs['list-container'].scrollTop = this.$refs[this.getAppActive][0].offsetTop
    }
  }
}

</script>

<style lang="scss">

 .list-container {
   height: calc(100% - 32px);
   min-height: 300px;
 }

</style>

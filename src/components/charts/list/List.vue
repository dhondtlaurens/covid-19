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
        <div class="h-full flex flex-shrink-0 flex-grow-0 items-center px-16 text-blue-300 w-1/3 sm:w-1/4 md:w-1/6 border-r border-gray-100 truncate" >
          {{ index + 1 }}. {{ country.country }}
        </div>

        <div class="h-full flex-shrink-0 flex-grow-0 items-center justify-end px-16 text-blue-300 hidden md:flex w-1/3 sm:w-1/4 md:w-1/6 md:border-r md:border-gray-100">
          {{ formatNumber(population[country.country]) }}
        </div>

        <div class="h-full flex flex-shrink-0 flex-grow-0 items-center justify-end px-16 text-blue-200 w-1/3 sm:w-1/4 md:w-1/6 border-r border-gray-100">
          {{ formatNumber(country.cases) }}
        </div>

        <div class="h-full flex-shrink-0 flex-grow-0 items-center justify-end px-16 text-blue-300 hidden md:flex w-1/3 sm:w-1/4 md:w-1/6 md:border-r md:border-gray-100">
          {{ formatNumber(population[country.country] !== undefined ? Math.round((1000000 / population[country.country]) * country.cases) : 0) }}
        </div>

        <div class="h-full flex flex-shrink-0 flex-grow-0 items-center justify-end px-16 text-red-100 w-1/3 sm:w-1/4 md:w-1/6 sm:border-r sm:border-gray-100">
          {{ formatNumber(country.deaths) }}
        </div>

        <div class="h-full hidden sm:flex flex-shrink-0 flex-grow-0 items-center justify-end px-16 text-blue-300 w-1/3 sm:w-1/4 md:w-1/6">
          {{ ((country.deaths / country.cases) * 100).toFixed(2) }}%
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
  props: [
    'sort'
  ],
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
      let listAppend = [...this.getAppData]

      switch (this.sort) {
        case 'population':
          list = list.filter((country) => {
            return population[country.country] !== undefined
          })

          list.sort((a, b) => (parseInt(population[a.country]) < parseInt(population[b.country])) ? 1 : -1)

          listAppend = listAppend.filter((country) => {
            return population[country.country] === undefined
          })

          list = [...list, ...listAppend]
          break

        case 'cases':
          list.sort((a, b) => (a.cases < b.cases) ? 1 : -1)
          break

        case 'infection':
          list = list.filter((country) => {
            return population[country.country] !== undefined
          })

          list.sort((a, b) => ((1000000 / parseInt(population[a.country])) * a.cases) < ((1000000 / parseInt(population[b.country])) * b.cases) ? 1 : -1)

          listAppend = listAppend.filter((country) => {
            return population[country.country] === undefined
          })

          list = [...list, ...listAppend]
          break

        case 'deaths':
          list.sort((a, b) => (a.deaths < b.deaths) ? 1 : -1)
          break

        case 'mortality':
          list = list.filter((country) => {
            return country.deaths !== 0
          })

          list.sort((a, b) => ((a.deaths / a.cases) < (b.deaths / b.cases)) ? 1 : -1)

          listAppend = listAppend.filter((country) => {
            return population[country.country] === 0
          })

          list = [...list, ...listAppend]
          break
      }

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
      if (this.getAppActive !== '') {
        this.$refs['list-container'].scrollTop = this.$refs[this.getAppActive][0].offsetTop
      } else {
        this.$refs['list-container'].scrollTop = 0
      }
    },
    'sort': function () {
      setTimeout(() => {
        if (this.getAppActive !== '') {
          this.$refs['list-container'].scrollTop = this.$refs[this.getAppActive][0].offsetTop
        } else {
          this.$refs['list-container'].scrollTop = 0
        }
      }, 10)
    }
  }
}

</script>

<style lang="scss">

 .list-container {
   height: calc(100% - 32px);
   min-height: 300px;

   scrollbar-width: none;
   -ms-overflow-style: none;

   &::-webkit-scrollbar {
    display: none;
  }
 }

</style>

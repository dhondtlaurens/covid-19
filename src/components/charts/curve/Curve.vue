<template>
  <div class="curve flex flex-wrap w-full">
    <div
      v-if="getAppActive !== ''"
      class="w-full lg:w-1/2 px-16 mb-32"
    >
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          {{ getAppActive }}

          <div class="text-12 pl-8">
            ({{ $t('components.charts.linear') }})
          </div>
        </div>

        <div class="p-16">
          <line-chart
            :chartData="computedCountryChartData"
            :options="optionsLinear"
          />
        </div>
      </div>
    </div>

    <div
      v-if="getAppActive !== ''"
      class="w-full lg:w-1/2 px-16 mb-32"
    >
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          {{ getAppActive }}

          <div class="text-12 pl-8">
            ({{ $t('components.charts.logarithmic') }})
          </div>
        </div>

        <div class="p-16">
          <line-chart
            :chartData="computedCountryChartData"
            :options="optionsLogarithmic"
          />
        </div>
      </div>
    </div>

    <div
      v-if="getAppActive !== ''"
      class="w-full lg:w-1/2 px-16 mb-32"
    >
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          {{ getAppActive }}

          <div class="text-12 pl-8">
            ({{ $t('components.charts.day') }})
          </div>
        </div>

        <div class="p-16">
          <line-chart
            :chartData="computedCountryChartDataDay"
            :options="optionsLinear"
          />
        </div>
      </div>
    </div>

    <div
      v-if="getAppActive !== ''"
      class="w-full lg:w-1/2 px-16 mb-32"
    >
      <div class="w-full h-full border border-gray-100">
        <div class="flex flex-wrap items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          {{ getAppActive }}

          <div class="flex items-center flex-wrap text-12 pl-8">
            ({{ $t('components.charts.compare') }}

            <div class="select relative w-64 sm:w-auto overflow-hidden sm:overflow-auto">
              <select
                class="h-18 mx-1 my-1 pl-8 pr-16 bg-blue-100 appearance-none outline-none text-blue-300 text-12 font-bold cursor-pointer rounded-none"
                v-model="compareType"
              >
                <option value="cases">
                  {{ $t('views.home.cases').toLowerCase() }}
                </option>

                <option value="deaths">
                  {{ $t('views.home.deaths').toLowerCase() }}
                </option>

                <option value="critical">
                  {{ $t('views.home.critical').toLowerCase() }}
                </option>

                <option value="recovered">
                  {{ $t('views.home.recovered').toLowerCase() }}
                </option>
              </select>

              <div class="select-chevron absolute top-0 right-0 h-18 fill-current w-8 h-18 mx-1 leading-normal pointer-events-none">
                <div v-icon-chevron-down ></div>
              </div>
            </div>

            <div class="mx-1">
              {{ $t('components.charts.with') }}
            </div>

            <div class="select relative w-64 sm:w-auto overflow-hidden sm:overflow-auto">
              <select
                class="h-18 ml-1 my-1 pl-8 pr-16 bg-blue-100 appearance-none outline-none text-blue-300 text-12 font-bold cursor-pointer rounded-none"
                v-model="compare"
              >
                <option
                  v-for="data in computedCountryList"

                  :key="data.country"
                  :value="data.country"
                >
                  {{ data.country }}
                </option>
              </select>

              <div class="select-chevron absolute top-0 right-0 h-18 fill-current w-8 h-18 mx-1 leading-normal pointer-events-none">
                <div v-icon-chevron-down ></div>
              </div>
            </div>
            )
          </div>
        </div>

        <div class="p-16">
          <line-chart
            :chartData="computedCountryChartCompare"
            :options="optionsLinear"
          />
        </div>
      </div>
    </div>

    <div class="w-full xl:w-2/3 xl:order-2 px-16 mb-32">
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          <div class="h-full flex flex-shrink-0 flex-grow-0 items-center px-16 w-1/3 sm:w-1/4 md:w-1/6 border-r border-gray-100 leading-tight">
            {{ $t('components.charts.list.country') }}
          </div>

          <div
            class="h-full flex-shrink-0 flex-grow-0 items-center justify-end px-16 hidden md:flex w-1/3 sm:w-1/4 md:w-1/6 md:border-r md:border-gray-100 text-center text-12 cursor-pointer hover:bg-blue-100 leading-tight"
            :class="{'bg-blue-100': sort === 'population'}"
            @click="sort = 'population'"
          >
            {{ $t('components.charts.list.population') }}

            <div class="fill-current w-8 h-18 ml-1 leading-normal flex-shrink-0">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
            class="h-full flex flex-shrink-0 flex-grow-0 items-center justify-end px-16 w-1/3 sm:w-1/4 md:w-1/6 border-r border-gray-100 text-center text-12 cursor-pointer hover:bg-blue-100 leading-tight"
            :class="{'bg-blue-100': sort === 'cases'}"
            @click="sort = 'cases'"
          >
            {{ $t('components.charts.list.cases') }}

            <div class="fill-current w-8 h-18 ml-1 leading-normal flex-shrink-0">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
          class="h-full flex-shrink-0 flex-grow-0 items-center justify-end px-16 hidden md:flex w-1/3 sm:w-1/4 md:w-1/6 md:border-r md:border-gray-100 text-center text-12 cursor-pointer hover:bg-blue-100 leading-tight"
            :class="{'bg-blue-100': sort === 'infection'}"
            @click="sort = 'infection'"
          >
            {{ $t('components.charts.list.infection') }}

            <div class="fill-current w-8 h-18 ml-1 leading-normal flex-shrink-0">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
            class="h-full flex flex-shrink-0 flex-grow-0 items-center justify-end px-16 w-1/3 sm:w-1/4 md:w-1/6 sm:border-r sm:border-gray-100 text-center text-12 cursor-pointer hover:bg-blue-100 leading-tight"
            :class="{'bg-blue-100': sort === 'deaths'}"
            @click="sort = 'deaths'"
          >
            {{ $t('components.charts.list.deaths') }}

            <div class="fill-current w-8 h-18 ml-1 leading-normal flex-shrink-0">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
            class="h-full hidden sm:flex flex-shrink-0 flex-grow-0 items-center justify-end px-16 w-1/3 sm:w-1/4 md:w-1/6 text-center text-12 cursor-pointer hover:bg-blue-100 leading-tight"
            :class="{'bg-blue-100': sort === 'mortality'}"
            @click="sort = 'mortality'"
          >
            {{ $t('components.charts.list.mortality') }}

            <div class="fill-current w-8 h-18 ml-1 leading-normal flex-shrink-0">
              <div v-icon-chevron-down ></div>
            </div>
          </div>
        </div>

        <list-component :sort="sort" />
      </div>
    </div>

    <div class="w-full xl:w-1/3 px-16 mb-32">
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          {{ $t('components.charts.global') }}

          <div class="text-12 pl-8">
            ({{ $t('components.charts.linear') }})
          </div>
        </div>

        <div class="p-16">
          <line-chart
            :key="updateTotal"
            :chartData="computedTotalChartData"
            :options="optionsLinear"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import LineChart from '@/components/charts/chartjs/LineChart'
import List from '@/components/charts/list/List'

export default {
  data () {
    return {
      sort: 'cases',

      compare: 'USA',
      compareType: 'cases',

      updateTotal: 0,

      optionsLinear: {
        maintainAspectRatio: false,
        response: true
      },

      optionsLogarithmic: {
        maintainAspectRatio: false,
        response: true,
        scales: {
          yAxes: [{
            type: 'logarithmic',
            ticks: {
              min: 0,
              max: 1000000,
              callback: function (value, index, values) {
                if (value === 1000000) return '1000000'
                if (value === 100000) return '100000'
                if (value === 10000) return '10000'
                if (value === 1000) return '1000'
                if (value === 100) return '100'
                if (value === 10) return '10'
                if (value === 0) return '0'
                return null
              }
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getAppActive',
      'getAppData',
      'getDatesData'
    ]),
    computedCountryChartData () {
      let self = this

      let chartData = {
        labels: [],
        datasets: [
          {
            label: self.$t('views.home.cases'),
            borderColor: 'rgba(1, 104, 250, 1)',
            backgroundColor: 'rgba(1, 104, 250, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.deaths'),
            borderColor: 'rgba(239, 116, 116, 1)',
            backgroundColor: 'rgba(239, 116, 116, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.critical'),
            borderColor: 'rgba(239, 187, 116, 1)',
            backgroundColor: 'rgba(239, 187, 116, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.recovered'),
            borderColor: 'rgba(149, 230, 139, 1)',
            backgroundColor: 'rgba(149, 230, 139, 0.08)',
            data: []
          }
        ]
      }

      let today = new Date()
      let day = today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)

      today = day + '_' + month + '_20'

      for (let date in self.getDatesData) {
        if (date !== today) {
          let countryData = self.getDatesData[date].filter((country) => {
            return country.country === self.getAppActive
          })

          if (countryData.length > 0) {
            chartData.labels.push(date.replace(/_/g, '/'))

            chartData.datasets[0].data.push(countryData[0].cases)
            chartData.datasets[1].data.push(countryData[0].deaths)
            chartData.datasets[2].data.push(countryData[0].critical)
            chartData.datasets[3].data.push(countryData[0].recovered)
          }
        }
      }

      return chartData
    },
    computedCountryChartCompare () {
      let self = this

      let compareType = {
        cases: {
          label: self.$t('views.home.cases'),
          active: 'rgba(1, 104, 250, 1)',
          compare: 'rgba(1, 104, 250, 0.5)',
          background: 'rgba(1, 104, 250, 0.08)'
        },
        deaths: {
          label: self.$t('views.home.deaths'),
          active: 'rgba(239, 116, 116, 1)',
          compare: 'rgba(239, 116, 116, 0.5)',
          background: 'rgba(239, 116, 116, 0.08)'
        },
        critical: {
          label: self.$t('views.home.critical'),
          active: 'rgba(239, 187, 116, 1)',
          compare: 'rgba(239, 187, 116, 0.5)',
          background: 'rgba(239, 187, 116, 0.08)'
        },
        recovered: {
          label: self.$t('views.home.recovered'),
          active: 'rgba(149, 230, 139, 1)',
          compare: 'rgba(149, 230, 139, 0.5)',
          background: 'rgba(149, 230, 139, 0.08)'
        }
      }

      let chartData = {
        labels: [],
        datasets: [
          {
            label: compareType[self.compareType].label + ' ' + self.getAppActive,
            borderColor: compareType[self.compareType].active,
            backgroundColor: compareType[self.compareType].background,
            data: []
          },
          {
            label: compareType[self.compareType].label + ' ' + self.compare,
            borderColor: compareType[self.compareType].compare,
            backgroundColor: compareType[self.compareType].background,
            data: []
          }
        ]
      }

      let today = new Date()
      let day = today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)

      today = day + '_' + month + '_20'

      for (let date in self.getDatesData) {
        if (date !== today) {
          let countryData = self.getDatesData[date].filter((country) => {
            return country.country === self.getAppActive
          })

          let countryDataCompare = self.getDatesData[date].filter((country) => {
            return country.country === self.compare
          })

          if (countryData.length > 0 || countryDataCompare.length) {
            chartData.labels.push(date.replace(/_/g, '/'))

            if (countryData.length > 0) {
              chartData.datasets[0].data.push(countryData[0][self.compareType])
            } else {
              chartData.datasets[0].data.push(0)
            }

            if (countryDataCompare.length > 0) {
              chartData.datasets[1].data.push(countryDataCompare[0][self.compareType])
            } else {
              chartData.datasets[1].data.push(0)
            }
          }
        }
      }

      return chartData
    },
    computedCountryChartDataDay () {
      let self = this

      let chartData = {
        labels: [],
        datasets: [
          {
            label: self.$t('views.home.cases'),
            borderColor: 'rgba(1, 104, 250, 1)',
            backgroundColor: 'rgba(1, 104, 250, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.deaths'),
            borderColor: 'rgba(239, 116, 116, 1)',
            backgroundColor: 'rgba(239, 116, 116, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.critical'),
            borderColor: 'rgba(239, 187, 116, 1)',
            backgroundColor: 'rgba(239, 187, 116, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.recovered'),
            borderColor: 'rgba(149, 230, 139, 1)',
            backgroundColor: 'rgba(149, 230, 139, 0.08)',
            data: []
          }
        ]
      }

      let today = new Date()
      let day = today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)

      today = day + '_' + month + '_20'

      let keys = Object.keys(self.getDatesData)

      for (let date in self.getDatesData) {
        if (date !== today) {
          let countryData = self.getDatesData[date].filter((country) => {
            return country.country === self.getAppActive
          })

          if (chartData.datasets[0].data.length === 0) {
            if (countryData.length > 0) {
              chartData.labels.push(date.replace(/_/g, '/'))

              chartData.datasets[0].data.push(countryData[0].cases)
              chartData.datasets[1].data.push(countryData[0].deaths)
              chartData.datasets[2].data.push(countryData[0].critical)
              chartData.datasets[3].data.push(countryData[0].recovered)
            }
          } else {
            let countryDataYesterday = self.getDatesData[keys[keys.indexOf(date) - 1]].filter((country) => {
              return country.country === self.getAppActive
            })

            chartData.labels.push(date.replace(/_/g, '/'))

            if (countryData.length > 0 && countryDataYesterday.length > 0) {
              chartData.datasets[0].data.push(countryData[0].cases - countryDataYesterday[0].cases > 0 ? countryData[0].cases - countryDataYesterday[0].cases : 0)
              chartData.datasets[1].data.push(countryData[0].deaths - countryDataYesterday[0].deaths > 0 ? countryData[0].deaths - countryDataYesterday[0].deaths : 0)
              chartData.datasets[2].data.push(countryData[0].critical - countryDataYesterday[0].critical > 0 ? countryData[0].critical - countryDataYesterday[0].critical : 0)
              chartData.datasets[3].data.push(countryData[0].recovered - countryDataYesterday[0].recovered > 0 ? countryData[0].recovered - countryDataYesterday[0].recovered : 0)
            } else {
              chartData.datasets[0].data.push(0)
              chartData.datasets[1].data.push(0)
              chartData.datasets[2].data.push(0)
              chartData.datasets[3].data.push(0)
            }
          }
        }
      }

      return chartData
    },
    computedTotalChartData () {
      let self = this

      let chartData = {
        labels: [],
        datasets: [
          {
            label: self.$t('views.home.cases'),
            borderColor: 'rgba(1, 104, 250, 1)',
            backgroundColor: 'rgba(1, 104, 250, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.deaths'),
            borderColor: 'rgba(239, 116, 116, 1)',
            backgroundColor: 'rgba(239, 116, 116, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.critical'),
            borderColor: 'rgba(239, 187, 116, 1)',
            backgroundColor: 'rgba(239, 187, 116, 0.08)',
            data: []
          },
          {
            label: self.$t('views.home.recovered'),
            borderColor: 'rgba(149, 230, 139, 1)',
            backgroundColor: 'rgba(149, 230, 139, 0.08)',
            data: []
          }
        ]
      }

      let today = new Date()
      let day = today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)

      today = day + '_' + month + '_20'

      for (let date in self.getDatesData) {
        if (date !== today) {
          chartData.labels.push(date.replace(/_/g, '/'))

          let cases = 0
          let deaths = 0
          let critical = 0
          let recovered = 0

          self.getDatesData[date].map((country) => {
            cases += parseInt(country.cases)
            deaths += parseInt(country.deaths)
            critical += parseInt(country.critical)
            recovered += parseInt(country.recovered)
          })

          chartData.datasets[0].data.push(cases)
          chartData.datasets[1].data.push(deaths)
          chartData.datasets[2].data.push(critical)
          chartData.datasets[3].data.push(recovered)
        }
      }

      return chartData
    },
    computedCountryList () {
      let self = this
      let countries = [...self.getAppData]

      countries.sort((a, b) => {
        let countryA = a.country.toLowerCase()
        let countryB = b.country.toLowerCase()

        return (countryA < countryB) ? -1 : (countryA > countryB) ? 1 : 0
      })

      return countries
    }
  },
  watch: {
    'getAppActive': function () {
      this.updateTotal++
    }
  },
  components: {
    'line-chart': LineChart,
    'list-component': List
  }
}

</script>

<style lang="scss">
  .select {
    .select-chevron {
      transform: translate(-4px, 4px);
    }
  }

 .curve {
   .list-container {
     height: calc(100% - 32px);
     min-height: 300px;
   }
 }

</style>

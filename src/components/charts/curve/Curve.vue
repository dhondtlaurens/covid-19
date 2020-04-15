<template>
  <div class="curve flex flex-wrap w-full">
    <div
      v-if="getAppActive !== ''"
      class="w-full lg:w-1/2 px-16 mb-32"
    >
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          <div class="pr-8 truncate">
            {{ getAppActiveStates !== '' && getAppActiveStates !== undefined ? mapState(getAppActiveStates) : getAppActive}}
          </div>

          <div class="text-12 ">
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
          <div class="pr-8 truncate">
            {{ getAppActiveStates !== '' && getAppActiveStates !== undefined ? mapState(getAppActiveStates) : getAppActive}}
          </div>

          <div class="text-12">
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
          <div class="pr-8 truncate">
            {{ getAppActiveStates !== '' && getAppActiveStates !== undefined ? mapState(getAppActiveStates) : getAppActive}}
          </div>

          <div class="text-12">
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
        <div class="flex flex-wrap sm:flex-no-wrap items-center px-16 py-8 sm:py-0 h-auto sm:h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          <div class="mb-1 sm:mb-0 pr-8 truncate">
              {{ getAppActiveStates !== '' && getAppActiveStates !== undefined ? mapState(getAppActiveStates) : getAppActive}}
          </div>

          <div class="flex flex-shrink-0 items-center flex-wrap text-12">
            <div class="hidden sm:inline-block">
              ({{ $t('components.charts.compare.compare') }}
            </div>

            <div class="select mr-1 sm:mx-1 relative overflow-hidden sm:overflow-auto">
              <select
                class="w-80 sm:w-100 pl-8 pr-16 bg-blue-100 font-medium appearance-none outline-none cursor-pointer rounded-md"
                v-model="compareType"
              >
                <option value="cases">
                  {{ $t('views.home.cases').toLowerCase() }}
                </option>

                <option
                  value="casesNormalised"
                  v-if="getAppActiveStates === '' ||  getAppActiveStates === undefined"
                >
                  {{ $t('components.charts.list.casesNormalised').toLowerCase() }}
                </option>

                <option value="deaths">
                  {{ $t('views.home.deaths').toLowerCase() }}
                </option>

                <option
                  value="deathsNormalised"
                  v-if="getAppActiveStates === '' ||  getAppActiveStates === undefined"
                >
                  {{ $t('components.charts.list.deathsNormalised').toLowerCase() }}
                </option>

                <option value="critical">
                  {{ $t('views.home.critical').toLowerCase() }}
                </option>

                <option value="recovered">
                  {{ $t('views.home.recovered').toLowerCase() }}
                </option>
              </select>

              <div class="select-chevron absolute top-0 right-0 fill-current">
                <div v-icon-chevron-down ></div>
              </div>
            </div>

            <div class="hidden sm:inline-block mx-1">
              {{ $t('components.charts.with') }}
            </div>

            <div class="select mx-1 relative overflow-hidden sm:overflow-auto">
              <select
                class="w-80 sm:w-100 pl-8 pr-16 bg-blue-100 font-medium appearance-none outline-none cursor-pointer rounded-md"
                v-if="getAppActiveStates === '' ||  getAppActiveStates === undefined"
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

              <select
                class="w-80 sm:w-100 pl-8 pr-16 bg-blue-100 font-medium appearance-none outline-none cursor-pointer rounded-md"
                v-if="getAppActiveStates !== '' &&  getAppActiveStates !== undefined"
                v-model="compare"
              >
                <option
                  v-for="data in computedStatesList"

                  :key="data.country"
                  :value="data.country"
                >
                  {{ mapState(data.country) }}
                </option>
              </select>

              <div class="select-chevron absolute top-0 right-0 fill-current">
                <div v-icon-chevron-down ></div>
              </div>
            </div>

            <div class="select mx-1 relative overflow-hidden sm:overflow-auto">
              <select
                class="w-80 sm:w-100 pl-8 pr-16 bg-blue-100 font-medium appearance-none outline-none cursor-pointer rounded-md"
                v-model="compareTimeline"
              >
                <option value="date">
                  {{ $t('components.charts.compare.date').toLowerCase() }}
                </option>

                <option value="patientOne">
                {{ $t('components.charts.compare.patientOne').toLowerCase() }}
                </option>

                <option value="patientHundred">
                {{ $t('components.charts.compare.patientHundred').toLowerCase() }}
                </option>
              </select>

              <div class="select-chevron absolute top-0 right-0 fill-current">
                <div v-icon-chevron-down ></div>
              </div>
            </div>

            <div class="hidden sm:inline-block">
              )
            </div>
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

    <div
      class="w-full lg:w-1/2 px-16 mb-32"
      v-if="getAppActive === ''"
    >
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

    <div
      class="w-full lg:w-1/2 px-16 mb-32"
      v-if="getAppActive === ''"
    >
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          <div class="pr-8 truncate">
              {{ $t('components.charts.global') }}
          </div>

          <div class="text-12">
            ({{ $t('components.charts.day') }})
          </div>
        </div>

        <div class="p-16">
          <line-chart
            :chartData="computedTotalChartDataDay"
            :options="optionsLinear"
          />
        </div>
      </div>
    </div>

    <div class="list w-full px-16 mb-32">
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          <div class="list-column h-full flex items-center justify-start px-16 text-center font-medium text-16 leading-tight border-r border-gray-100">
            {{ $t('components.charts.list.country') }}
          </div>

          <div
            class="list-column h-full hidden lg:flex items-center justify-end px-16 text-center text-12 cursor-pointer hover:bg-blue-100 leading-tight border-r border-gray-100"
            :class="{'bg-blue-100': sort === 'population'}"
            @click="sort = 'population'"
          >
            <div class="truncate">
              {{ $t('components.charts.list.population') }}
            </div>

            <div class="flex-shrink-0 list-chevron fill-current">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
            class="list-column h-full flex items-center justify-end px-16 text-12 cursor-pointer hover:bg-blue-100 leading-tight border-r border-gray-100"
            :class="{'bg-blue-100': sort === 'cases'}"
            @click="sort = 'cases'"
          >
            <div class="truncate">
              {{ $t('components.charts.list.cases') }}
            </div>

            <div class="flex-shrink-0 list-chevron fill-current">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
            class="list-column h-full hidden md:flex items-center justify-end px-16 text-12 cursor-pointer hover:bg-blue-100 leading-tight border-r border-gray-100"
            :class="{'bg-blue-100': sort === 'casesNormalised'}"
            @click="sort = 'casesNormalised'"
          >
            <div class="truncate">
              {{ $t('components.charts.list.casesNormalised') }}
            </div>

            <div class="flex-shrink-0 list-chevron fill-current">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
          class="list-column h-full flex items-center justify-end px-16 text-12 cursor-pointer hover:bg-blue-100 leading-tight border-r-0 md:border-r border-gray-100"
            :class="{'bg-blue-100': sort === 'deaths'}"
            @click="sort = 'deaths'"
          >
            <div class="truncate">
              {{ $t('components.charts.list.deaths') }}
            </div>

            <div class="flex-shrink-0 list-chevron fill-current">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
          class="list-column h-full hidden md:flex items-center justify-end px-16 text-12 cursor-pointer hover:bg-blue-100 leading-tight border-r-0 xl:border-r border-gray-100"
            :class="{'bg-blue-100': sort === 'deathsNormalised'}"
            @click="sort = 'deathsNormalised'"
          >
            <div class="truncate">
              {{ $t('components.charts.list.deathsNormalised') }}
            </div>

            <div class="flex-shrink-0 list-chevron fill-current">
              <div v-icon-chevron-down ></div>
            </div>
          </div>

          <div
            class="list-column h-full hidden xl:flex items-center justify-end px-16 text-12 cursor-pointer hover:bg-blue-100 leading-tight"
            :class="{'bg-blue-100': sort === 'mortality'}"
            @click="sort = 'mortality'"
          >
            {{ $t('components.charts.list.mortality') }}

            <div class="flex-shrink-0 list-chevron fill-current">
              <div v-icon-chevron-down ></div>
            </div>
          </div>
        </div>

        <list-component :sort="sort" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import LineChart from '@/components/charts/chartjs/LineChart'
import List from '@/components/charts/list/List'

import population from '@/assets/json/population.json'

export default {
  data () {
    return {
      sort: 'cases',
      population: population,

      compare: '',
      compareType: 'cases',
      compareTimeline: 'date',

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
      'getAppActiveStates',

      'getAppData',
      'getAppDataStates',

      'getDatesData',
      'getDatesDataStates'
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

      let today = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }))

      let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
      let year = today.getFullYear().toString().substr(-2) < 10 ? '0' + today.getFullYear().toString().substr(-2) : today.getFullYear().toString().substr(-2)

      today = day + '_' + month + '_' + year

      if (self.getAppActiveStates === '' || self.getAppActiveStates === undefined) {
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
      } else {
        for (let date in self.getDatesDataStates) {
          if (date !== today) {
            let countryData = self.getDatesDataStates[date].filter((country) => {
              return country.country === self.getAppActiveStates
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
        casesNormalised: {
          label: self.$t('components.charts.list.casesNormalised'),
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
        deathsNormalised: {
          label: self.$t('components.charts.list.deathsNormalised'),
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

      let today = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }))

      let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
      let year = today.getFullYear().toString().substr(-2) < 10 ? '0' + today.getFullYear().toString().substr(-2) : today.getFullYear().toString().substr(-2)

      today = day + '_' + month + '_' + year

      if (self.getAppActiveStates === '' || self.getAppActiveStates === undefined) {
        for (let date in self.getDatesData) {
          if (date !== today) {
            let countryData = self.getDatesData[date].filter((country) => {
              return country.country === self.getAppActive
            })

            let countryDataCompare = self.getDatesData[date].filter((country) => {
              return country.country === self.compare
            })

            if (countryData.length > 0 || countryDataCompare.length) {
              if (self.compareTimeline === 'date') chartData.labels.push(date.replace(/_/g, '/'))

              if (countryData.length > 0) {
                switch (self.compareType) {
                  case 'casesNormalised':
                    if (self.compareTimeline === 'patientHundred') {
                      if (countryData[0].cases >= 100) {
                        chartData.datasets[0].data.push(self.population[self.getAppActive] !== undefined ? Math.round((1000000 / self.population[self.getAppActive]) * countryData[0].cases) : 0)
                      }
                    } else {
                      chartData.datasets[0].data.push(self.population[self.getAppActive] !== undefined ? Math.round((1000000 / self.population[self.getAppActive]) * countryData[0].cases) : 0)
                    }
                    break

                  case 'deathsNormalised':
                    if (self.compareTimeline === 'patientHundred') {
                      if (countryData[0].cases >= 100) {
                        chartData.datasets[0].data.push(self.population[self.getAppActive] !== undefined ? Math.round((1000000 / self.population[self.getAppActive]) * countryData[0].deaths) : 0)
                      }
                    } else {
                      chartData.datasets[0].data.push(self.population[self.getAppActive] !== undefined ? Math.round((1000000 / self.population[self.getAppActive]) * countryData[0].deaths) : 0)
                    }
                    break

                  default:
                    if (self.compareTimeline === 'patientHundred') {
                      if (countryData[0].cases >= 100) {
                        chartData.datasets[0].data.push(countryData[0][self.compareType])
                      }
                    } else {
                      chartData.datasets[0].data.push(countryData[0][self.compareType])
                    }
                }
              } else if (self.compareTimeline === 'date') {
                chartData.datasets[0].data.push(0)
              }

              if (countryDataCompare.length > 0) {
                switch (self.compareType) {
                  case 'casesNormalised':
                    if (self.compareTimeline === 'patientHundred') {
                      if (countryDataCompare[0].cases >= 100) {
                        chartData.datasets[1].data.push(self.population[self.compare] !== undefined ? Math.round((1000000 / self.population[self.compare]) * countryDataCompare[0].cases) : 0)
                      }
                    } else {
                      chartData.datasets[1].data.push(self.population[self.compare] !== undefined ? Math.round((1000000 / self.population[self.compare]) * countryDataCompare[0].cases) : 0)
                    }
                    break

                  case 'deathsNormalised':
                    if (self.compareTimeline === 'patientHundred') {
                      if (countryDataCompare[0].cases >= 100) {
                        chartData.datasets[1].data.push(self.population[self.compare] !== undefined ? Math.round((1000000 / self.population[self.compare]) * countryDataCompare[0].deaths) : 0)
                      }
                    } else {
                      chartData.datasets[1].data.push(self.population[self.compare] !== undefined ? Math.round((1000000 / self.population[self.compare]) * countryDataCompare[0].deaths) : 0)
                    }
                    break

                  default:
                    if (self.compareTimeline === 'patientHundred') {
                      if (countryDataCompare[0].cases >= 100) {
                        chartData.datasets[1].data.push(countryDataCompare[0][self.compareType])
                      }
                    } else {
                      chartData.datasets[1].data.push(countryDataCompare[0][self.compareType])
                    }
                }
              } else if (self.compareTimeline === 'date') {
                chartData.datasets[1].data.push(0)
              }
            }
          }
        }

        if (self.compareTimeline === 'patientOne' || self.compareTimeline === 'patientHundred') {
          let maxLength = chartData.datasets[0].data.length > chartData.datasets[1].data.length ? chartData.datasets[0].data.length : chartData.datasets[1].data.length

          for (let i = 0; i < maxLength; i++) {
            chartData.labels.push(self.$t('components.charts.compare.day') + ' ' + i)
          }
        }
      } else {
        for (let date in self.getDatesDataStates) {
          chartData.datasets[0].label = compareType[self.compareType].label + ' ' + self.mapState(self.getAppActiveStates)
          chartData.datasets[1].label = compareType[self.compareType].label + ' ' + self.mapState(self.compare)

          if (date !== today) {
            let countryData = self.getDatesDataStates[date].filter((country) => {
              return country.country === self.getAppActiveStates
            })

            let countryDataCompare = self.getDatesDataStates[date].filter((country) => {
              return country.country === self.compare
            })

            if (countryData.length > 0 || countryDataCompare.length) {
              if (self.compareTimeline === 'date') chartData.labels.push(date.replace(/_/g, '/'))

              if (countryData.length > 0) {
                if (self.compareTimeline === 'patientHundred') {
                  if (countryData[0].cases >= 100) {
                    chartData.datasets[0].data.push(countryData[0][self.compareType])
                  }
                } else {
                  chartData.datasets[0].data.push(countryData[0][self.compareType])
                }
              } else if (self.compareTimeline === 'date') {
                chartData.datasets[0].data.push(0)
              }

              if (countryDataCompare.length > 0) {
                if (self.compareTimeline === 'patientHundred') {
                  if (countryDataCompare[0].cases >= 100) {
                    chartData.datasets[1].data.push(countryDataCompare[0][self.compareType])
                  }
                } else {
                  chartData.datasets[1].data.push(countryDataCompare[0][self.compareType])
                }
              } else if (self.compareTimeline === 'date') {
                chartData.datasets[1].data.push(0)
              }
            }
          }
        }

        if (self.compareTimeline === 'patientOne' || self.compareTimeline === 'patientHundred') {
          let maxLength = chartData.datasets[0].data.length > chartData.datasets[1].data.length ? chartData.datasets[0].data.length : chartData.datasets[1].data.length

          for (let i = 0; i < maxLength; i++) {
            chartData.labels.push(self.$t('components.charts.compare.day') + ' ' + i)
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

      let today = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }))

      let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
      let year = today.getFullYear().toString().substr(-2) < 10 ? '0' + today.getFullYear().toString().substr(-2) : today.getFullYear().toString().substr(-2)

      today = day + '_' + month + '_' + year

      let keys = Object.keys(self.getDatesData)

      if (self.getAppActiveStates === '' || self.getAppActiveStates === undefined) {
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
      } else {
        for (let date in self.getDatesDataStates) {
          if (date !== today) {
            let countryData = self.getDatesDataStates[date].filter((country) => {
              return country.country === self.getAppActiveStates
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
              let countryDataYesterday = self.getDatesDataStates[keys[keys.indexOf(date) - 1]].filter((country) => {
                return country.country === self.getAppActiveStates
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

      let today = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }))

      let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
      let year = today.getFullYear().toString().substr(-2) < 10 ? '0' + today.getFullYear().toString().substr(-2) : today.getFullYear().toString().substr(-2)

      today = day + '_' + month + '_' + year

      for (let date in self.getDatesData) {
        if (date !== today) {
          chartData.labels.push(date.replace(/_/g, '/'))

          let cases = 0
          let deaths = 0
          let critical = 0
          let recovered = 0

          self.getDatesData[date].map((country) => {
            cases += country.cases !== null ? parseInt(country.cases) : 0
            deaths += country.deaths !== null ? parseInt(country.deaths) : 0
            critical += country.critical !== null ? parseInt(country.critical) : 0
            recovered += country.recovered !== null ? parseInt(country.recovered) : 0
          })

          chartData.datasets[0].data.push(cases)
          chartData.datasets[1].data.push(deaths)
          chartData.datasets[2].data.push(critical)
          chartData.datasets[3].data.push(recovered)
        }
      }

      return chartData
    },
    computedTotalChartDataDay () {
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

      let today = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }))

      let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
      let year = today.getFullYear().toString().substr(-2) < 10 ? '0' + today.getFullYear().toString().substr(-2) : today.getFullYear().toString().substr(-2)

      today = day + '_' + month + '_' + year

      let keys = Object.keys(self.getDatesData)

      for (let date in self.getDatesData) {
        if (date !== today) {
          if (chartData.datasets[0].data.length === 0) {
            chartData.labels.push(date.replace(/_/g, '/'))

            let cases = 0
            let deaths = 0
            let critical = 0
            let recovered = 0

            self.getDatesData[date].map((country) => {
              cases += country.cases !== null ? parseInt(country.cases) : 0
              deaths += country.deaths !== null ? parseInt(country.deaths) : 0
              critical += country.critical !== null ? parseInt(country.critical) : 0
              recovered += country.recovered !== null ? parseInt(country.recovered) : 0
            })

            chartData.datasets[0].data.push(cases)
            chartData.datasets[1].data.push(deaths)
            chartData.datasets[2].data.push(critical)
            chartData.datasets[3].data.push(recovered)
          } else {
            chartData.labels.push(date.replace(/_/g, '/'))

            let cases = 0
            let casesYesterday = 0

            let deaths = 0
            let deathsYesterday = 0

            let critical = 0
            let criticalYesterday = 0

            let recovered = 0
            let recoveredYesterday = 0

            self.getDatesData[date].map((country) => {
              cases += country.cases !== null ? parseInt(country.cases) : 0
              deaths += country.deaths !== null ? parseInt(country.deaths) : 0
              critical += country.critical !== null ? parseInt(country.critical) : 0
              recovered += country.recovered !== null ? parseInt(country.recovered) : 0
            })

            self.getDatesData[keys[keys.indexOf(date) - 1]].map((country) => {
              casesYesterday += country.cases !== null ? parseInt(country.cases) : 0
              deathsYesterday += country.deaths !== null ? parseInt(country.deaths) : 0
              criticalYesterday += country.critical !== null ? parseInt(country.critical) : 0
              recoveredYesterday += country.recovered !== null ? parseInt(country.recovered) : 0
            })

            chartData.datasets[0].data.push(cases - casesYesterday > 0 ? cases - casesYesterday : 0)
            chartData.datasets[1].data.push(deaths - deathsYesterday > 0 ? deaths - deathsYesterday : 0)
            chartData.datasets[2].data.push(critical - criticalYesterday > 0 ? critical - criticalYesterday : 0)
            chartData.datasets[3].data.push(recovered - recoveredYesterday > 0 ? recovered - recoveredYesterday : 0)
          }
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
    },
    computedStatesList () {
      let self = this
      let countries = [...self.getAppDataStates]

      countries.sort((a, b) => {
        let countryA = a.country.toLowerCase()
        let countryB = b.country.toLowerCase()

        return (countryA < countryB) ? -1 : (countryA > countryB) ? 1 : 0
      })

      return countries
    }
  },
  mounted () {
    this.compareType = 'cases'
    this.compareTimeline = 'date'
    this.compare = this.getAppActiveStates !== '' && this.getAppActiveStates !== undefined ? this.getAppActiveStates : this.getAppActive

    this.updateTotal++
  },
  watch: {
    'getAppActive': function () {
      this.compareType = 'cases'
      this.compareTimeline = 'date'
      this.compare = this.getAppActiveStates !== '' && this.getAppActiveStates !== undefined ? this.getAppActiveStates : this.getAppActive

      this.updateTotal++
    },
    'getAppActiveStates': function () {
      this.compareType = 'cases'
      this.compareTimeline = 'date'
      this.compare = this.getAppActiveStates !== '' && this.getAppActiveStates !== undefined ? this.getAppActiveStates : this.getAppActive

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
    text-overflow: ellipsis;

    .select-chevron {
      width: 18px;
      height: 18px;

      transform-origin: center;
      transform: scale(0.5);
    }
  }

  .list {
    .list-column {
      width: 33.33%;

      @media (min-width: 768px) {
        width: 20%;
      }

      @media (min-width: 1024px) {
        width: 16.66%;
      }

      @media (min-width: 1280px) {
        width: 14.28%;
      }
    }

    .list-chevron {
      width: 18px;
      height: 18px;

      transform-origin: center;
      transform: scale(0.5);
    }
  }

 .curve {
   .list-container {
     height: calc(100% - 32px);
     min-height: 300px;
   }
 }

</style>

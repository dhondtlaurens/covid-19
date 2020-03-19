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
      class="w-full px-16 mb-32"
      :class="{'lg:w-1/2': getAppActive !== ''}"
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
      class="w-full px-16 mb-32"
      :class="{'lg:w-1/2': getAppActive !== ''}"
    >
      <div class="w-full h-full border border-gray-100">
        <div class="flex items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
          {{ $t('components.charts.global') }}

          <div class="text-12 pl-8">
            ({{ $t('components.charts.logarithmic') }})
          </div>
        </div>

        <div class="p-16">
          <line-chart
            :key="updateTotal"
            :chartData="computedTotalChartData"
            :options="optionsLogarithmic"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import LineChart from '@/components/charts/chartjs/LineChart'

export default {
  data () {
    return {
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

      let keys = Object.keys(self.getDatesData)

      let countryDataYesterday = self.getDatesData[keys[keys.length - 2]].filter((country) => {
        return country.country === self.getAppActive
      })

      for (let date in self.getDatesData) {
        let countryData = self.getDatesData[date].filter((country) => {
          return country.country === self.getAppActive
        })

        if (date === keys[keys.length - 1]) {
          if (countryData[0].cases !== countryDataYesterday[0].cases || countryData[0].deaths !== countryDataYesterday[0].deaths || countryData[0].critical !== countryDataYesterday[0].critical || countryData[0].recovered !== countryDataYesterday[0].recovered) {
            if (countryData.length > 0) {
              chartData.labels.push(date.replace(/_/g, '/'))

              chartData.datasets[0].data.push(countryData[0].cases)
              chartData.datasets[1].data.push(countryData[0].deaths)
              chartData.datasets[2].data.push(countryData[0].critical)
              chartData.datasets[3].data.push(countryData[0].recovered)
            }
          }
        } else {
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

      for (let date in self.getDatesData) {
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

      return chartData
    }
  },
  watch: {
    'getAppActive': function () {
      this.updateTotal++
    }
  },
  components: {
    'line-chart': LineChart
  }
}

</script>

<style lang="scss">

</style>

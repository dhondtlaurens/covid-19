<template>
  <div class="curve w-full p-32 border border-gray-100">
    <line-chart
      :chartData="computedChartData"
      :options="options"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import LineChart from '@/components/charts/vue/LineChart'

export default {
  data () {
    return {
      options: {
        maintainAspectRatio: false
      }
    }
  },
  props: [
    'loading',
    'datesData'
  ],
  computed: {
    ...mapGetters([
      'getAppActive',
      'getDatesData'
    ]),
    computedChartData () {
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
        if (self.getAppActive !== '') {
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
        } else {
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
    }
  },
  components: {
    'line-chart': LineChart
  }
}

</script>

<style lang="scss">

</style>

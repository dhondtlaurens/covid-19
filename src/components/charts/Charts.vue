<template>
  <div class="charts pb-32">
    <div class="row px-16 flex flex-wrap">
      <curve-component
        v-if="loading === false"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Curve from '@/components/charts/Curve'

export default {
  data () {
    return {
      loading: true,
      dates: []
    }
  },
  computed: {
    ...mapGetters([
      'getAppData',
      'getDatesData'
    ])
  },
  beforeMount () {
    for (var i = 1; i < 30; i++) {
      this.dates.push((i < 10 ? '0' + i : i) + '_02_20')
    }

    for (var j = 1; j < 17; j++) {
      this.dates.push((j < 10 ? '0' + j : j) + '_03_20')
    }

    this.fetchLocal()
  },
  methods: {
    fetchLocal () {
      let self = this

      let date = self.dates[0]
      let today = new Date()

      let day = today.getDate()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)

      fetch('/data/date/countries_' + date + '.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          self.dates.shift()

          self.$store.dispatch('addDatesData', {
            key: date,
            value: data
          })

          if (self.dates.length > 0) {
            self.fetchLocal()
          } else {
            self.$store.dispatch('addDatesData', {
              key: day + '_' + month + '_20',
              value: self.getAppData
            })

            self.loading = false
          }
        })
    }
  },
  components: {
    'curve-component': Curve
  }
}

</script>

<style lang="scss">

</style>

<template>
  <div class="charts">

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      dates: ['14_03_20', '15_03_20']
    }
  },
  computed: {
    ...mapGetters([
      'getDatesData'
    ])
  },
  beforeMount () {
    this.fetchLocal()
  },
  methods: {
    fetchLocal () {
      let self = this
      let date = self.dates[0]

      fetch('/data/date/countries_' +  date + '.json', {
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
            self.loading = false
            console.log(self.getDatesData)
          }
        })
    }
  }
}

</script>

<style lang="scss">

</style>

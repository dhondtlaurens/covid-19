<template>
  <div class="charts">
    <curve-component
      v-if="loading === false"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Curve from '@/components/charts/curve/Curve'

export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'getAppData',
      'getDatesData'
    ])
  },
  methods: {
    fetchAPI () {
      let self = this
      self.loading = true

      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      let day = yesterday.getDate()
      let month = (yesterday.getMonth() + 1) < 10 ? '0' + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1)

      fetch('https://covid19-data-api.herokuapp.com/countries/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            return response.json()
          } else {
            self.fetchLocal()
          }
        })
        .then(function (data) {
          data.map((date) => {
            if (date.id === day + '_' + month + '_20') self.$store.dispatch('setAppDataYesterday', JSON.parse(date.value))

            self.$store.dispatch('addDatesData', {
              key: date.id,
              value: JSON.parse(date.value)
            })
          })

          self.loading = false
        })
        .catch(function () {
          self.fetchLocal()
        })
    },
    fetchLocal () {
      let self = this

      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      let day = yesterday.getDate()
      let month = (yesterday.getMonth() + 1) < 10 ? '0' + (yesterday.getMonth() + 1) : (yesterday.getMonth() + 1)

      fetch('/data/history.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          data.map((date) => {
            if (date.id === day + '_' + month + '_20') self.$store.dispatch('setAppDataYesterday', JSON.parse(date.value))

            self.$store.dispatch('addDatesData', {
              key: date.id,
              value: JSON.parse(date.value)
            })
          })

          self.loading = false
        })
    }
  },
  watch: {
    'getAppData': function () {
      this.fetchAPI()
    }
  },
  components: {
    'curve-component': Curve
  }
}

</script>

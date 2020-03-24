import Vue from 'vue'

Vue.mixin({
  methods: {
    formatNumber (number) {
      return number !== undefined ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
    }
  }
})

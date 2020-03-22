<template>
  <div
    class="list-container relative px-16 overflow-scroll"
    ref="list-container"
  >
    <div class="list absolute inset-0">
      <div
        class="px-16 py-8 flex justify-between border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
        :class="{'bg-gray-100': country.country === getAppActive}"

        v-for="(country, index) in computedCountryList"

        :key="country.country"
        :ref="country.country"
        :data-country="country.country"

        @click="setCountry"
      >
        <div class="text-blue-300" >
          {{ index + 1 }}. {{ country.country }}
        </div>

        <div class="text-blue-200">
          {{ country.cases }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {

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

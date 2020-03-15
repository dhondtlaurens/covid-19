<template>
  <div class="header h-64 px-32 flex border-b border-gray-100">
    <div
      class="logo h-full pr-64 flex items-center border-r border-gray-100 cursor-pointer"
      @click="setGlobal"
    >
      <div class="text-blue-300 text-24 font-bold ">
        covid<span class="text-blue-200">19</span>
      </div>
    </div>

    <div class="search relative flex-grow text-14 text-blue-300">
      <input
        class="w-full h-full px-32 appearance-none outline-none"

        type="text"
        v-model="search"

        @focus="focus = true"

        placeholder="Klik om te zoeken "
      />

      <div
        class="results absolute bg-white border-t border-l border-r border-gray-100"
        v-if="focus === true && search !== '' && filteredResults.length > 0 "
      >
        <div
          class="flex items-center px-32 h-64 border-b border-gray-100 hover:bg-blue-100 cursor-pointer"

          v-for="result in filteredResults"
          :data-country="result.original"
          @click="setCountry"
        >
          {{ result.original }}
        </div>
      </div>
    </div>

    <div class="locale pl-64 h-full flex items-center border-l border-gray-100">
      <select class="w-full h-full bg-white appearance-none outline-none text-blue-300 text-14 font-bold cursor-pointer" name="">
        <option value="NL">
          NL
        </option>
      </select>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import fuzzy from 'fuzzy'

export default {
  name: 'Header',
  data () {
    return {
      list: [],
      search: '',
      focus: false
    }
  },
  computed: {
    ...mapGetters([
      'getAppData'
    ]),
    filteredResults: function () {
      let results = []

      if (this.search !== '') {
        results = fuzzy.filter(this.search, this.list)

        results = results.filter((result, index) => {
          return result.score > 3 && index < 5
        })
      }

      return results
    }
  },
  methods: {
    setGlobal () {
      this.search = ''
      this.focus = false

      this.$store.dispatch('setAppActive', this.search)
    },
    setCountry (e) {
      this.search = e.currentTarget.dataset.country
      this.focus = false

      this.$store.dispatch('setAppActive', this.search)
    }
  },
  watch: {
    'getAppData': function () {
      if (this.getAppData.length > 0) {
        this.getAppData.map((item) => {
          this.list.push(item.country)
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>

 .header {
   .search {
     .results {
       left: -1px;
       top: 100%;

       width: calc( 100% + 2px);
     }
   }
 }

</style>

<template>
  <div class="header relative z-50 flex flex-wrap">
    <div
      class="logo w-full sm:w-auto flex flex-shrink-0 items-center h-64 px-32 border-r border-b border-gray-100 cursor-pointer"
      @click="setGlobal"
    >
      <div class="text-blue-300 text-24 font-bold ">
        covid

        <span class="text-blue-200">
          19
        </span>
      </div>
    </div>

    <div class="relative flex flex-grow h-64 border-b border-gray-100">
      <div class="search flex flex-grow items-center border-r border-gray-100 text-blue-300">
        <!--
        <div class="pl-32 flex-shrink-0">
          <div
            class="fill-current w-16 h-16"
            v-icon-search
          ></div>
        </div>

        <input
          class="flex-grow flex-shrink min-w-0 h-full px-32 appearance-none outline-none truncate"

          type="text"
          size="1"

          v-model="search"

          @focus="focus = true; search = ''"
          @blur="setBlur"

          :placeholder="$t('components.header.placeholder')"
        />

        <div
          v-if="search !== ''"
          @click="setGlobal"
          class="pr-32 flex-shrink-0 cursor-pointer"
        >
          <div
            class="fill-current w-16 h-16"
            v-icon-times
          ></div>
        </div>
        -->
      </div>

      <div class="locale flex items-center flex-shrink-0 h-full px-32">
        <select
          class="w-full bg-white appearance-none outline-none text-blue-300 text-14 font-bold uppercase cursor-pointer"
          v-model="$i18n.locale"
        >
          <option
            v-for="(lang, i) in langs"

            :key="`Lang${i}`"
            :value="lang"
          >
            {{ lang }}
          </option>
        </select>
      </div>

      <div
        class="results absolute bg-white border-t border-l border-r border-gray-100 shadow-xl"
        v-if="focus === true && search !== ''"
      >
        <div
          class="flex items-center px-32 h-64 border-b border-gray-100 hover:bg-blue-100 cursor-pointer"

          v-for="result in filteredResults"
          :key="result.original"

          :data-country="result.original"
          :data-type="result.type"

          @click="setCountryOrState"
        >
          <div
            class="mr-1 bg-blue-100 px-8 py-1 rounded-md mr-2 text-blue-200 font-medium "
            v-if="result.type === 'state'"
          >
            USA
          </div>

          {{ result.original }}
        </div>

        <div
          v-if="filteredResults.length === 0 && search.length >= 2"
          class="flex items-center px-32 h-64 border-b border-gray-100"
        >
          <div v-html="$t('components.header.empty')"></div>
        </div>
      </div>
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
      langs: ['en', 'nl', 'es'],

      list: [],
      listStates: [],

      search: '',
      focus: false
    }
  },
  computed: {
    ...mapGetters([
      'getAppData',
      'getAppDataStates',

      'getAppActive',
      'getAppActiveStates'
    ]),
    filteredResults: function () {
      let results = []
      let resultsStates = []

      if (this.search !== '') {
        // COUNTRIES
        results = fuzzy.filter(this.search, this.list)

        results = results.filter((result, index) => {
          return result.score > 3
        })

        results = results.map((result) => {
          result.type = 'country'
          return result
        })

        // STATES
        resultsStates = fuzzy.filter(this.search, this.listStates)

        resultsStates = resultsStates.filter((result, index) => {
          return result.score > 3
        })

        resultsStates = resultsStates.map((result) => {
          result.type = 'state'
          return result
        })
      }

      results = [...results, ...resultsStates].sort((a, b) => (a.score < b.score) ? 1 : -1)
      return results.slice(0, 5)
    }
  },
  methods: {
    setBlur () {
      if (this.search === '') this.setGlobal()
    },
    setGlobal () {
      this.focus = false

      localStorage.setItem('covidAppActive', '')
      this.$router.push('/')
    },
    setCountryOrState (e) {
      this.focus = false

      if (e.currentTarget.dataset.type === 'country') {
        if (this.getAppActive !== e.currentTarget.dataset.country) {
          localStorage.setItem('covidAppActive', e.currentTarget.dataset.country)
          this.$router.push('/' + e.currentTarget.dataset.country)
        } else if (this.getAppActive === 'USA' && e.currentTarget.dataset.country === 'USA') {
          localStorage.setItem('covidAppActive', e.currentTarget.dataset.country)
          this.$router.push('/' + e.currentTarget.dataset.country)
        }
      } else if (e.currentTarget.dataset.type === 'state' && this.getAppActiveStates !== this.mapStateReverse(e.currentTarget.dataset.country)) {
        localStorage.setItem('covidAppActive', 'USA/' + this.mapStateReverse(e.currentTarget.dataset.country))
        this.$router.push('/USA/' + this.mapStateReverse(e.currentTarget.dataset.country))
      } else {
        this.search = this.getAppActiveStates !== '' ? this.mapState(this.getAppActiveStates) : this.getAppActive
      }
    }
  },
  watch: {
    'getAppActive': function () {
      this.search = this.getAppActiveStates !== '' ? this.mapState(this.getAppActiveStates) : this.getAppActive
    },
    'getAppActiveStates': function () {
      this.search = this.getAppActiveStates !== '' ? this.mapState(this.getAppActiveStates) : this.getAppActive
    },
    'getAppData': function () {
      if (this.getAppData.length > 0) {
        this.list = []

        this.getAppData.map((item) => {
          if (typeof item.country === 'string' || item.country instanceof String) this.list.push(item.country)
        })
      }
    },
    'getAppDataStates': function () {
      if (this.getAppDataStates.length > 0) {
        this.listStates = []

        this.getAppDataStates.map((item) => {
          this.listStates.push(this.mapState(item.country))
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>

 .header {
   .results {
     left: -1px;
     top: 100%;

     width: calc( 100% + 2px);
   }

   .locale {
     .chevron {
       width: 12px;
       height: 12px;
     }
   }
 }

</style>

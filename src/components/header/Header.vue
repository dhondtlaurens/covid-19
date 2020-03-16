<template>
  <div class="header flex flex-wrap">
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
        <div class="pl-32 flex-shrink-0">
          <div
            class="fill-current w-16 h-16"
            v-icon-search
          ></div>
        </div>

        <input
          class="flex-grow flex-shrink min-w-0 h-full px-32 appearance-none outline-none"

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
      </div>

      <div
        class="locale flex-shrink-0 h-64 px-32 border-b border-gray-100 cursor-pointer"
      >
        <select
          class="w-full h-full bg-white appearance-none outline-none text-blue-300 text-14 font-bold uppercase cursor-pointer"
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
        class="results absolute bg-white border-t border-l border-r border-gray-100"
        v-if="focus === true && search !== ''"
      >
        <div
          class="flex items-center px-32 h-64 border-b border-gray-100 hover:bg-blue-100 cursor-pointer"

          v-for="result in filteredResults"
          :data-country="result.original"
          @click="setCountry"
        >
          {{ result.original }}
        </div>

        <div
          v-if="filteredResults.length === 0 && search.length >= 2"
          class="flex items-center px-32 h-64 border-b border-gray-100"
        >
          <div
            class="opacity-50"
            v-html="$t('components.header.empty')"
          ></div>
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
      list: [],
      langs: ['nl', 'en'],
      search: 'Belgium',
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
    setBlur () {
      if (this.search === '') this.setGlobal()
    },
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

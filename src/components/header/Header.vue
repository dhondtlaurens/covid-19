<template>
  <div class="header h-64 px-32 flex border-b border-gray-100">
    <div class="logo h-full pr-64 flex items-center border-r border-gray-100">
      <div class="text-blue-200 text-24 font-bold ">
        covid

        <span class="text-blue-100">
          19
        </span>
      </div>
    </div>

    <!--
    <div class="search flex-grow text-14 text-blue-200">
      <input
        class="w-full h-full px-32 appearance-none outline-none"

        type="text"
        v-model="search"

        placeholder="Klik om te zoeken "
      />
    </div>

    <div class="locale pl-64 h-full flex items-center border-l border-gray-100">
      <select class="w-full h-full bg-white appearance-none outline-none text-blue-200 text-14 font-bold cursor-pointer" name="">
        <option value="NL">
          NL
        </option>
      </select>
    </div>
  -->
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'getAppData'
    ])
  },
  watch: {
    'getAppData': function () {
      // TODO: MAKE LUNR SEARCH AND SET ACTIVE COUNTRY
    }
  }
}

</script>

<style lang="scss" scoped>

 .header {

 }

</style>

<template>
  <div class="chart relative h-8 w-full bg-blue-200">
    <div class="absolute inset-0 flex justify-start">
      <div
        class="case h-full bg-red-100 transition-900 transition-all transition-in-out"
        :style="{'width': ((getAppDeaths / getAppCases) * 100) +'%' }"
      ></div>

      <div
        class="case h-full bg-orange-100 transition-900 transition-all transition-in-out"
        :style="{'width': ((getAppCritical / getAppCases) * 100) +'%' }"
      ></div>
    </div>

    <div class="absolute inset-0 flex justify-end">
      <div
        class="case h-full bg-green-100 transition-900 transition-all transition-in-out"
        :style="{'width': ((getAppRecovered / getAppCases) * 100) +'%' }"
      ></div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Chart',
  computed: {
    ...mapGetters([
      'getAppCases',
      'getAppDeaths',
      'getAppCritical',
      'getAppRecovered'
    ])
  }
}

</script>

<style lang="scss" scoped>

 .chart {
   .case {
     width: 0%;
   }
 }

</style>

<template>
  <div class="home px-16 pt-32 pb-64 ">
    <div class="row flex flex-wrap">
      <div class="w-full lg:w-1/2 px-16 pb-32 text-blue-300">
        <div
          class="mb-16 text-24 font-medium"
          v-html="$t('views.home.title')"
        ></div>

        <div
          class="text-16 leading-relaxed"
          v-html="$t('views.home.description')"
        ></div>
      </div>

      <div class="flex flex-wrap w-full lg:w-1/2">
        <div class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32">
          <div class="flex flex-col h-full border border-gray-100">
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.cases') }}

              <div
                class="text-12 font-bold text-blue-200 cursor-pointer"
                v-if="getAppCases !== 0 && getAppTotalCases !== 0 && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ getAppTotalCases }} ({{ Math.round((getAppCases / getAppTotalCases) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-blue-200 font-bold">
              <div>
                {{ getAppCases }}
              </div>

              <div v-if="getAppCasesYesterday !== 0 && (getAppCases - getAppCasesYesterday) > 0" class="text-12">
                +{{ getAppCases - getAppCasesYesterday }} (+{{ Math.round(((getAppCases - getAppCasesYesterday) / getAppCases) * 100) }}%)
              </div>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32">
          <div class="flex flex-col h-full border border-gray-100">
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.deaths') }}

              <div
                class="text-12 font-bold text-red-100 cursor-pointer"
                v-if="getAppDeaths !== 0 && getAppTotalDeaths !== 0  && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ getAppTotalDeaths }} ({{ Math.round((getAppDeaths / getAppTotalDeaths) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-red-100 font-bold">
              {{ getAppDeaths }}

              <div v-if="getAppDeathsYesterday !== 0 && (getAppDeaths - getAppDeathsYesterday) > 0" class="text-12">
                  +{{ getAppDeaths - getAppDeathsYesterday }} (+{{ Math.round(((getAppDeaths - getAppDeathsYesterday) / getAppDeaths) * 100) }}%)
              </div>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32">
          <div class="flex flex-col h-full border border-gray-100">
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.critical') }}

              <div
                class="text-12 font-bold text-orange-100 cursor-pointer"
                v-if="getAppCritical !== 0 && getAppTotalCritical !== 0  && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ getAppTotalCritical }} ({{ Math.round((getAppCritical / getAppTotalCritical) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-orange-100 font-bold">
              {{ getAppCritical }}

              <div v-if="getAppCriticalYesterday !== 0 && (getAppCritical - getAppCriticalYesterday) > 0" class="text-12">
                +{{ getAppCritical - getAppCriticalYesterday }} (+{{ Math.round(((getAppCritical - getAppCriticalYesterday) / getAppCritical) * 100) }}%)
              </div>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32">
          <div class="flex flex-col h-full border border-gray-100">
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.recovered') }}

              <div
                class="text-12 font-bold text-green-100 cursor-pointer"
                v-if="getAppRecovered !== 0 && getAppTotalRecovered !== 0  && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ getAppTotalRecovered }} ({{ Math.round((getAppRecovered / getAppTotalRecovered) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-green-100 font-bold">
              {{ getAppRecovered }}

              <div v-if="getAppRecoveredYesterday !== 0 && (getAppRecovered - getAppRecoveredYesterday) > 0" class="text-12">
                +{{ getAppRecovered - getAppRecoveredYesterday }} (+{{ Math.round(((getAppRecovered - getAppRecoveredYesterday) / getAppRecovered) * 100) }}%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <charts-component />
    <!--<social-component />-->
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Charts from '@/components/charts/Charts'
// import Social from '@/components/social/Social'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'getAppActive',

      'getAppCases',
      'getAppCasesYesterday',

      'getAppTotalCases',
      'getAppTotalCasesYesterday',

      'getAppDeaths',
      'getAppDeathsYesterday',

      'getAppTotalDeaths',
      'getAppTotalDeathsYesterday',

      'getAppCritical',
      'getAppCriticalYesterday',

      'getAppTotalCritical',
      'getAppTotalCriticalYesterday',

      'getAppRecovered',
      'getAppRecoveredYesterday',

      'getAppTotalRecovered',
      'getAppTotalRecoveredYesterday'
    ])
  },
  methods: {
    setGlobal () {
      localStorage.setItem('covidAppActive', '')
      this.$router.push('/')
    }
  },
  components: {
    'charts-component': Charts
    // 'social-component': Social
  }
}

</script>

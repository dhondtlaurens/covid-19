<template>
  <div class="home leading-relaxed px-16 pt-32 pb-64 ">
    <div class="row flex flex-wrap">
      <div
        class="w-full lg:w-1/2 px-16 pb-32 text-blue-300"
        :class="{'hidden': getAppActive !== ''}"
      >
        <div
          class="mb-16 text-24 font-medium"
          v-html="$t('views.home.title')"
        ></div>

        <div
          class="text-16"
          v-html="$t('views.home.description')"
        ></div>
      </div>

      <div
        class="flex flex-wrap w-full lg:w-1/2"
        :class="{'lg:w-full': getAppActive !== ''}"
        v-if="getAppActiveStates === ''"
      >
        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppData).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.cases') }}

              <div
                class="text-12 font-bold text-blue-200 cursor-pointer"
                v-if="getAppCases !== 0 && getAppTotalCases !== 0 && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ formatNumber(getAppTotalCases) }} ({{ Math.round((getAppCases / getAppTotalCases) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-blue-200 font-bold">
              <div>
                {{ formatNumber(getAppCases) }}
              </div>

              <div v-if="getAppCasesYesterday !== 0 && (getAppCases - getAppCasesYesterday) > 0" class="text-12">
                +{{ formatNumber(getAppCases - getAppCasesYesterday) }} (+{{ Math.round(((getAppCases - getAppCasesYesterday) / getAppCases) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppData).length === 0"
          >
            <div class="loading w-full h-full"></div>
          </div>
        </div>

        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppData).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.deaths') }}

              <div
                class="text-12 font-bold text-red-100 cursor-pointer"
                v-if="getAppDeaths !== 0 && getAppTotalDeaths !== 0  && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ formatNumber(getAppTotalDeaths) }} ({{ Math.round((getAppDeaths / getAppTotalDeaths) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-red-100 font-bold">
              {{ formatNumber(getAppDeaths) }}

              <div v-if="getAppDeathsYesterday !== 0 && (getAppDeaths - getAppDeathsYesterday) > 0" class="text-12">
                  +{{ formatNumber(getAppDeaths - getAppDeathsYesterday) }} (+{{ Math.round(((getAppDeaths - getAppDeathsYesterday) / getAppDeaths) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppData).length === 0"
          >
            <div class="loading w-full h-full"></div>
          </div>
        </div>

        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppData).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.critical') }}

              <div
                class="text-12 font-bold text-orange-100 cursor-pointer"
                v-if="getAppCritical !== 0 && getAppTotalCritical !== 0  && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ formatNumber(getAppTotalCritical) }} ({{ Math.round((getAppCritical / getAppTotalCritical) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-orange-100 font-bold">
              {{ formatNumber(getAppCritical) }}

              <div v-if="getAppCriticalYesterday !== 0 && (getAppCritical - getAppCriticalYesterday) > 0" class="text-12">
                +{{ formatNumber(getAppCritical - getAppCriticalYesterday) }} (+{{ Math.round(((getAppCritical - getAppCriticalYesterday) / getAppCritical) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppData).length === 0"
          >
            <div class="loading w-full h-full"></div>
          </div>
        </div>

        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppData).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.recovered') }}

              <div
                class="text-12 font-bold text-green-100 cursor-pointer"
                v-if="getAppRecovered !== 0 && getAppTotalRecovered !== 0  && getAppActive !== ''"
                @click="setGlobal"
              >
                {{ formatNumber(getAppTotalRecovered) }} ({{ Math.round((getAppRecovered / getAppTotalRecovered) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-green-100 font-bold">
              {{ formatNumber(getAppRecovered) }}

              <div v-if="getAppRecoveredYesterday !== 0 && (getAppRecovered - getAppRecoveredYesterday) > 0" class="text-12">
                +{{ formatNumber(getAppRecovered - getAppRecoveredYesterday) }} (+{{ Math.round(((getAppRecovered - getAppRecoveredYesterday) / getAppRecovered) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppData).length === 0"
          >
            <div class="loading w-full h-full"></div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-wrap w-full lg:w-1/2"
        :class="{'lg:w-full': getAppActive !== ''}"
        v-if="getAppActiveStates !== ''"
      >
        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppDataStates).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.cases') }}

              <div
                class="text-12 font-bold text-blue-200 cursor-pointer"
                v-if="getAppCasesStates !== 0 && getAppCases !== 0 && getAppActiveStates !== ''"
                @click="setUSA"
              >
                🇺🇸 {{ formatNumber(getAppCases) }} ({{ Math.round((getAppCasesStates / getAppCases) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-blue-200 font-bold">
              <div>
                {{ formatNumber(getAppCasesStates) }}
              </div>

              <div v-if="getAppCasesYesterdayStates !== 0 && (getAppCasesStates - getAppCasesYesterdayStates) > 0" class="text-12">
                +{{ formatNumber(getAppCasesStates - getAppCasesYesterdayStates) }} (+{{ Math.round(((getAppCasesStates - getAppCasesYesterdayStates) / getAppCasesStates) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppDataStates).length === 0"
          >
            <div class="loading w-full h-full"></div>
          </div>
        </div>

        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppDataStates).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.deaths') }}

              <div
                class="text-12 font-bold text-red-100 cursor-pointer"
                v-if="getAppDeathsStates !== 0 && getAppDeaths !== 0  && getAppActiveStates !== ''"
                @click="setUSA"
              >
                🇺🇸 {{ formatNumber(getAppDeaths) }} ({{ Math.round((getAppDeathsStates / getAppDeaths) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-red-100 font-bold">
              {{ formatNumber(getAppDeathsStates) }}

              <div v-if="getAppDeathsYesterdayStates !== 0 && (getAppDeathsStates - getAppDeathsYesterdayStates) > 0" class="text-12">
                  +{{ formatNumber(getAppDeathsStates - getAppDeathsYesterdayStates) }} (+{{ Math.round(((getAppDeathsStates - getAppDeathsYesterdayStates) / getAppDeathsStates) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppDataStates).length === 0"
          >
            <div class="loading w-full h-full"></div>
          </div>
        </div>

        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppDataStates).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.critical') }}

              <div
                class="text-12 font-bold text-orange-100 cursor-pointer"
                v-if="getAppCriticalStates !== 0 && getAppCritical !== 0  && getAppActiveStates !== ''"
                @click="setUSA"
              >
                🇺🇸 {{ formatNumber(getAppCritical) }} ({{ Math.round((getAppCriticalStates / getAppCritical) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-orange-100 font-bold">
              {{ formatNumber(getAppCriticalStates) }}

              <div v-if="getAppCriticalYesterdayStates !== 0 && (getAppCriticalStates - getAppCriticalYesterdayStates) > 0" class="text-12">
                +{{ formatNumber(getAppCriticalStates - getAppCriticalYesterdayStates) }} (+{{ Math.round(((getAppCriticalStates - getAppCriticalYesterdayStates) / getAppCriticalStates) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppData).length === 0"
          >
            <div class="loading w-full h-full"></div>
          </div>
        </div>

        <div
          class="flex-shrink-0 px-16 w-full sm:w-1/2 mb-32"
          :class="{'lg:w-1/4': getAppActive !== ''}"
        >
          <div
            class="flex flex-col h-full border border-gray-100"
            v-if="Object.keys(getAppDataStates).length > 0"
          >
            <div class="flex justify-between items-center px-16 h-32 text-blue-300 font-medium text-16 border-b border-gray-100">
              {{ $t('views.home.recovered') }}

              <div
                class="text-12 font-bold text-green-100 cursor-pointer"
                v-if="getAppRecoveredStates !== 0 && getAppRecovered !== 0  && getAppActiveStates !== ''"
                @click="setUSA"
              >
                🇺🇸 {{ formatNumber(getAppRecovered) }} ({{ Math.round((getAppRecoveredStates / getAppRecovered) * 100) }}%)
              </div>
            </div>

            <div class="flex flex-col justify-center items-center flex-grow p-16 text-34 text-green-100 font-bold">
              {{ formatNumber(getAppRecoveredStates) }}

              <div v-if="getAppRecoveredYesterdayStates !== 0 && (getAppRecoveredStates - getAppRecoveredYesterdayStates) > 0" class="text-12">
                +{{ formatNumber(getAppRecoveredStates - getAppRecoveredYesterdayStates) }} (+{{ Math.round(((getAppRecoveredStates - getAppRecoveredYesterdayStates) / getAppRecoveredStates) * 100) }}%)
              </div>
            </div>
          </div>

          <div
            class="flex flex-col h-full border border-gray-100 overflow-hidden bg-blue-100"
            v-if="Object.keys(getAppDataStates).length === 0"
          >
            <div class="loading w-full h-full"></div>
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
      'getAppActiveStates',

      'getAppData',
      'getAppDataStates',

      'getAppCases',
      'getAppCasesStates',

      'getAppCasesYesterday',
      'getAppCasesYesterdayStates',

      'getAppTotalCases',
      'getAppTotalCasesYesterday',

      'getAppDeaths',
      'getAppDeathsStates',

      'getAppDeathsYesterday',
      'getAppDeathsYesterdayStates',

      'getAppTotalDeaths',
      'getAppTotalDeathsYesterday',

      'getAppCritical',
      'getAppCriticalStates',

      'getAppCriticalYesterday',
      'getAppCriticalYesterdayStates',

      'getAppTotalCritical',
      'getAppTotalCriticalYesterday',

      'getAppRecovered',
      'getAppRecoveredStates',

      'getAppRecoveredYesterday',
      'getAppRecoveredYesterdayStates',

      'getAppTotalRecovered',
      'getAppTotalRecoveredYesterday'
    ])
  },
  methods: {
    setGlobal () {
      localStorage.setItem('covidAppActive', '')
      this.$router.push('/')
    },
    setUSA () {
      localStorage.setItem('covidAppActive', 'USA')
      this.$router.push('/USA')
    }
  },
  components: {
    'charts-component': Charts
    // 'social-component': Social
  }
}

</script>

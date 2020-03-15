<template>
  <div class="home px-16 py-32">
    <div class="row flex flex-wrap">
      <div class="w-full md:w-1/2 lg:w-1/3 px-16 pb-32  text-blue-200">
        <div class="mb-16 text-24 font-medium">
          Blijf gewoon

          <span class="text-blue-100">thuis,</span>
        </div>

        <div class="text-16">
            Hier wordt gewerkt aan een duidelijk dashboard over covid 19. Help mee en <span class="text-blue-100">blijf gewoon thuis</span>!
        </div>
      </div>

      <div class="flex flex-wrap w-full md:w-1/2 lg:w-2/3">
        <div class="flex-shrink-0 px-16 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-32">
          <div class="border border-gray-100">
            <div class="flex items-center px-16 h-32 text-blue-200 font-medium text-16 border-b border-gray-100">
              cases
            </div>

            <div class="flex justify-center p-16 text-34 text-blue-100 font-bold">
              {{ getAppCases }}
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 px-16 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-32">
          <div class="border border-gray-100">
            <div class="flex items-center px-16 h-32 text-blue-200 font-medium text-16 border-b border-gray-100">
              deaths
            </div>

            <div class="flex justify-center p-16 text-34 text-red-100 font-bold">
              {{ getAppDeaths }}
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 px-16 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-32">
          <div class="border border-gray-100">
            <div class="flex items-center px-16 h-32 text-blue-200 font-medium text-16 border-b border-gray-100">
              critical
            </div>

            <div class="flex justify-center p-16 text-34 text-orange-100 font-bold">
              {{ getAppCritical }}
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 px-16 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-32">
          <div class="border border-gray-100">
            <div class="flex items-center px-16 h-32 text-blue-200 font-medium text-16 border-b border-gray-100">
              recovered
            </div>

            <div class="flex justify-center p-16 text-34 text-green-100 font-bold">
              {{ getAppRecovered }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'home',
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

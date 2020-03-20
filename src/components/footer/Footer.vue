<template>
  <div class="footer flex fixed w-full h-64 bottom-0 border-t bg-white border-gray-100">
    <div class="flex justify-between items-center flex-grow h-full px-32 flex border-r border-gray-100">
      <div class="hidden sm:flex text-16 text-blue-200">
        <a class='text-blue-200 no-underline appearance-none mr-32' target='_blank' href='https://www.linkedin.com/in/laurens-d-hondt-6b860a55/'>
          Laurens D&#39;Hondt
        </a>

        <a class='text-blue-200 no-underline appearance-none' target='_blank' href='https://www.coronaviruschecklist.co/'>
          Coronavirus Checklist
        </a>
    </div>

      <div
        class="text-16 text-blue-300 no-underline"
        v-html="$t('components.footer.refresh')"
      ></div>
    </div>

    <div class="interval flex items-center flex-shrink-0 h-full px-32">
      <div class="flex text-blue-300 text-24 font-bold">

        <div
          class="mr-2"
          v-if="minutes !== 0"
        >
          {{ minutes }}m
        </div>

        {{ seconds }}s
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Chart',
  data () {
    return {
      interval: 600,
      minutes: 0,
      seconds: 0
    }
  },
  beforeMount () {
    this.initInterval()
  },
  methods: {
    initInterval () {
      let self = this
      self.minutes = Math.floor(self.interval / 60)
      self.seconds = self.interval - self.minutes * 60

      setInterval(() => {
        self.interval--

        self.minutes = Math.floor(self.interval / 60)
        self.seconds = self.interval - self.minutes * 60

        if (self.interval <= 0) {
          self.interval = 600
          self.$emit('updateData')
        }
      }, 1000)
    }
  }
}

</script>

<style lang="scss" scoped>

 .footer {
   a {
     margin-right: 32px;
   }
 }

</style>

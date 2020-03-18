<template>
  <div class="footer flex fixed w-full h-64 bottom-0 border-t bg-white border-gray-100">
    <div class="info flex justify-between items-center flex-grow h-full px-32 flex border-r border-gray-100">
      <div
        class="hidden sm:flex text-16 text-blue-200"
        v-html="$t('components.footer.info')"
      ></div>

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

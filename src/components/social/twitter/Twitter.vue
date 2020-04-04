<template>
  <div class="flex flex-wrap w-full xl:w-3/4">
    <div class="twitter w-full md:w-1/3 px-16 mb-32">
      <div class="px-16 h-full border border-gray-100 overflow-scroll">
        <div class="relative w-full h-full">
          <div class="absolute inset-0">
            <a class="twitter-timeline" href="https://twitter.com/be_gezondheid?ref_src=twsrc%5Etfw"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="twitter w-full md:w-1/3 px-16 mb-32">
      <div class="px-16 h-full border border-gray-100 overflow-scroll">
        <div class="relative w-full h-full">
          <div class="absolute inset-0">
            <a class="twitter-timeline" href="https://twitter.com/sciensano?ref_src=twsrc%5Etfw"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="twitter w-full md:w-1/3 px-16 mb-32">
      <div class="px-16 h-full border border-gray-100 overflow-scroll">
        <div class="relative w-full h-full">
          <div class="absolute inset-0">
            <a class="twitter-timeline" href="https://twitter.com/vrtnws?ref_src=twsrc%5Etfw"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  mounted () {
    const twitter = document.createElement('script')

    twitter.async = true
    twitter.setAttribute('src', 'https://platform.twitter.com/widgets.js')

    document.head.appendChild(twitter)
  }
}

</script>

<style lang="scss">

.twitter {
  height: 300px;
}

</style>

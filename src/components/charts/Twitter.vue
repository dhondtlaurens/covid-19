<template>
  <div class="flex flex-wrap">
    <div class="twitter w-full sm:w-1/2 xl:w-1/4 px-16 mb-32">
      <div class="px-16 h-full border border-gray-100 overflow-scroll">
        <div class="relative w-full h-full">
          <div class="absolute inset-0">
            <a class="twitter-timeline" href="https://twitter.com/be_gezondheid?ref_src=twsrc%5Etfw"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="twitter w-full sm:w-1/2 xl:w-1/4 px-16 mb-32">
      <div class="px-16 h-full border border-gray-100 overflow-scroll">
        <div class="relative w-full h-full">
          <div class="absolute inset-0">
            <a class="twitter-timeline" href="https://twitter.com/sciensano?ref_src=twsrc%5Etfw"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  mounted () {
    let twitter = document.createElement('script')

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

<template>
  <div class="twitter w-full lg:w-1/3 px-16">
    <div class="px-16 h-full border border-gray-100 overflow-scroll">
      <div
        ref="scroll"
        class="relative w-full h-full"
      >
        <div class="absolute inset-0">
          <a class="twitter-timeline" href="https://twitter.com/laurensdhondt/lists/list?ref_src=twsrc%5Etfw"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      options: {

      }
    }
  },
  mounted () {
    let twitter = document.createElement('script')

    twitter.async = true
    twitter.setAttribute('src', 'https://platform.twitter.com/widgets.js')

    document.head.appendChild(twitter)

    console.log(scroll)
  }
}

</script>

<style lang="scss">

.twitter {
  min-height: 300px;

  .timeline-header, .timeline-footer
  {
    display:none;
  }
}

</style>

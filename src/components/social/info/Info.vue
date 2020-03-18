<template>
  <div class="w-full px-16 xl:w-1/4 text-blue-300 mb-32">
    <div
      class="mb-16 text-24 font-medium"
      v-html="$t('components.info.title')"
    ></div>

    <div
      class="text-16"
      v-html="$t('components.info.description')"
    ></div>
  </div>
</template>

<script>

export default {
  mounted () {

  }
}

</script>

<style lang="scss">

.twitter {
  height: 300px;
}

</style>

<template>
  <a
    class="flex items-center coffee h-40 pl-8 pr-8 sm:pr-16 rounded-md text-24 bg-blue-200 text-white"
    href="https://www.buymeacoffee.com/laurensdhondt"
    target="_blank"
  >
    <img
      class="h-32 w-32 sm:mr-8"
      src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
      alt="Buy me a coffee"
    >

    <div class="hidden sm:inline-block">
      Buy me a coffee
    </div>
  </a>
</template>

<script>

export default {
  name: 'Coffee'
}

</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');

.coffee {
    font-family: 'Cookie', cursive !important;
}

</style>

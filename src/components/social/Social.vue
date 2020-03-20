<template>
  <div class="flex flex-wrap w-full social mb-32">
    <twitter-component />
    <info-component />
  </div>
</template>

<script>

import Twitter from '@/components/social/twitter/Twitter'
import Info from '@/components/social/info/Info'

export default {
  components: {
    'twitter-component': Twitter,
    'info-component': Info
  }
}

</script>

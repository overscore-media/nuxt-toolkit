<template>
  <v-layout class="white black--text">
  </v-layout>
</template>

<script>
import Social from '~/components/Social'
// Notice the custom layout; Vue Goodshare doesn't seem to like being a page component for reasons I can't explain
export default {
  layout: 'goodshare',
  componnents: {
    Social
  },
  head () {
    return {
      title: 'Vue Goodshare'
    }
  }
}
</script>

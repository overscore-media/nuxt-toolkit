<template>
  <v-layout class="grey darken-3">
    <v-container>
      <vue-disqus
        v-if="onDisqusPage"
        shortname="nuxt-toolkit"
        :identifier="`nuxt-toolkit-disqus-page`"
        :url="`https://nuxt-toolkit.overscore.media/disqus`"
      ></vue-disqus>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  computed: {
    onDisqusPage () {
      return this.$route.path === '/disqus'
    }
  },
  head () {
    return {
      title: 'Disqus'
    }
  }
}
</script>

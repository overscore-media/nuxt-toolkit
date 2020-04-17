<template>
  <v-layout class="comment-box">
    <v-container>
      <vue-disqus
        v-if="metadata"
        shortname="nuxt-toolkit"
        :identifier="`nuxt-toolkit-${metadata.title}`"
        :url="`https://nuxt-toolkit.overscore.media/${metadata.url}`"
      ></vue-disqus>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  computed: {
    metadata () {
      const metadata = this.$store.state.blogPosts.slice()

      const postMeta = metadata.filter((post) => {
        return `/blog/${post.url}` === this.$route.path
      })[0]

      return postMeta
    }
  }
}
</script>

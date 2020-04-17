<template>
  <v-layout>
    <MarkdownRenderer
      :content="postContent"
      :title="postMeta.title"
      :date="postMeta.date"
    />
  </v-layout>
</template>

<script>
import MarkdownRenderer from '~/components/MarkdownRenderer'

export default {
  layout: 'post',
  components: {
    MarkdownRenderer
  },
  data () {
    return {
      title: this.$route.params.post
    }
  },
  computed: {
    name () {
      return this.postMeta.title
    }
  },
  head () {
    return {
      title: this.name,
      meta: [
        { hid: 'description', name: 'description', content: this.postMeta.description || 'A test of the nuxt-toolkit blogging engine' }
      ]
    }
  },
  async asyncData ({ store, params, error }) {
    /*
      Comment from https://github.com/tylermercer/nuxt-netlifycms-boilerplate:
      Interestingly, if you just return the raw post object as it is imported,
      Nuxt fails to build, but if you create your own object with the data you
      need, it works. The issue is discussed here, but apparently it wasn't
      completely fixed. https://github.com/nuxt-community/apollo-module/issues/163
      However, I like the code more this way anyway--it's more explicit what
      you're bringing in from the JSON.
    */
    const metadata = [...store.state.blogPosts]

    const post = await import(`!!raw-loader!~/blog/compiled/${params.post}.html`)
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not Found' })
      })

    const postMeta = metadata.filter((post) => {
      return post.url === params.post
    })[0]

    if (post) {
      const postContent = post.default
      return { postContent, postMeta }
    } else {
      error({ statusCode: 404, message: 'Page not Found' })
    }
  }
}
</script>

<template>
  <v-layout class="blog-page-wrapper">
    <v-container class="text-center">
      <h1 class="display-1 mt-5">
        Custom Bloggin Engine
      </h1>
      <br />
      <p class="mt-5 title">
        This is an example of OverScore Media's custom blogging engine
      </p>
      <br />
      <p class="mt-5 headline">
        Filter by Tags:
      </p>
      <br />
      <v-divider />
      <br />
      <v-row
        alignment="center"
        justify="center"
      >
        <v-col
          v-for="post in filteredData"
          :key="post.url"
          cols="12"
          md="6"
          lg="6"
          xl="6"
        >
          <v-card
            max-width="700"
            height="475"
            class="mx-auto justify-center black--text"
            color="#C9C3B2"
            shaped
          >
            <v-img
              v-if="post.img"
              :src="post.img"
              max-height="200"
            />
            <v-card-title class="d-inline-block margin-auto post-card-title mb-n5">
              {{ post.title }}
            </v-card-title>
            <br />
            <v-card-subtitle v-if="post.date" class="black--text">
              <p v-if="post.desc" class="title font-weight-medium">
                {{ post.desc }}
              </p>
              <p class="subtitle-1">
                Last Edited: {{ post.date }}
              </p>
            </v-card-subtitle>
            <v-card-actions class="justify-center align-center">
              <v-btn
                nuxt
                :to="`blog/${post.url}`"
                color="#1818A7"
              >
                Check it Out!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  layout: 'page',
  data () {
    return {
      filteredData: {},
      activeTag: 'all'
    }
  },
  computed: {
    tagsList () {
      return this.$store.state.tagsList.slice()
    },
    metadata () {
      const blogPostsList = this.$store.state.blogPosts.slice()
      const orderedblogPostsList = blogPostsList.sort((a, b) => {
        const dateA = DateTime.fromFormat(a.date, 'DDD')
        const dateB = DateTime.fromFormat(b.date, 'DDD')

        const dateOrder = dateA > dateB
        if (dateOrder) {
          return a.name < b.name ? -1 : 1
        }
        return 1
      })
      return orderedblogPostsList
    }
  },
  created () {
    this.filteredData = this.metadata
  },
  head () {
    return {
      title: 'Blog',
      meta: []
    }
  }
}
</script>

<style lang="scss">
.blog-page-wrapper {
  background-color: #2f2f2f !important;
  margin-top: 56px;
  color: #e2e2e2 !important;
}
</style>

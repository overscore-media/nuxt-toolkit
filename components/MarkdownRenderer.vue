<template>
  <!-- So no client-side JS tries to run on the server -->
  <client-only>
    <v-runtime-template :template="modifiedContent" />
  </client-only>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'

export default {
  name: 'MarkdownHTML',
  components: {
    VRuntimeTemplate
  },
  props: {
    // Can be taken from a .md file like in the About page
    content: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    date: {
      type: String,
      required: false
    }
  },
  computed: {
    modifiedContent () {
      if (this.title) {
        const pageTitle = `<h1>${this.title}</h1>`
        if (this.date) {
          const pageDate = `<h3>Last Edited: ${this.date}</h3>`
          return `<div class="markdown-body">${pageTitle}${pageDate}<hr />${this.content}</div>`
        }
        return `<div class="markdown-body">${pageTitle}<hr />${this.content}</div>`
      }
      return `<div class="markdown-body">${this.content}</div>`
    }
  }
}
</script>

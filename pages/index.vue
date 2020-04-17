<template>
  <v-layout class="white black--text">
    <v-container>
      <h1 class="display-2 mt-5 text-center">
        The Nuxt Toolkit
      </h1>
      <h2 class="my-5 text-center">
        Useful utilities for your Nuxt app, by <a class="grey--text" href="https://overscore.media" rel="noreferrer nofollow" target="_blank">OverScore Media</a>
      </h2>
      <hr />
      <h3 class="my-7 headline text-center">
        This site is by no means documentation; it's meant to serve as a proof-of-concept. See our article on Dev.to and check out this site's code on GitHub for more information.
      </h3>      <hr />
      <h3 class="my-7 headline text-center">
        Here's what the Toolkit currently contains (subject to change):
      </h3>
      <v-card class="mx-auto" max-width="700" tile>
        <v-list light shaped two-line>
          <v-list-item-group v-if="toolkitItems">
            <v-list-item v-for="(item, index) in toolkitItems" :key="index" nuxt :to="item.link">
              <v-icon class="mr-3">
                {{ item.icon }}
              </v-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { mdiPostOutline, mdiAnimationPlayOutline, mdiDisqus, mdiFormatAlignJustify, mdiAtomVariant, mdiAudioVideo, mdiCodeArray, mdiVideo3d, mdiTypewriter, mdiShareAllOutline, mdiTooltipImage } from '@mdi/js'

export default {
  components: {
  },
  data () {
    return {
      toolkitItems: [
        { text: 'A custom blogging engine for Nuxt with Markdown, Vue components, and much more', icon: mdiPostOutline, link: '/blog' },
        { text: 'Ways to incorporate Anime.js into your Nuxt project', icon: mdiAnimationPlayOutline, link: '/anime' },
        { text: 'Embed a Disqus commenting system in your site', icon: mdiDisqus, link: '/disqus' },
        { text: 'Integrate a Netlify Form in your site', icon: mdiFormatAlignJustify, link: '/netlify-forms' },
        { text: 'Use Particles.js for nice particle effects', icon: mdiAtomVariant, link: '/particles' },
        { text: 'Put a Plyr.js component for audio and video in your site', icon: mdiAudioVideo, link: '/plyr' },
        { text: 'Make use of Prism.js to syntax-highlight code blocks', icon: mdiCodeArray, link: '/prism' },
        { text: 'Render 3D models in your website with THREE.js', icon: mdiVideo3d, link: '/three' },
        { text: 'Get text to type itself with Typed.js', icon: mdiTypewriter, link: '/typed' },
        { text: 'Vue-Goodshare can give you useful social sharing buttons', icon: mdiShareAllOutline, link: '/vue-goodshare' },
        { text: 'Create a photo gallery with Vue-Picture-Swipe', icon: mdiTooltipImage, link: '/vue-picture-swipe' }
      ]
    }
  },
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>

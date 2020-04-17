<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-text="'More from OverScore Media:'">
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in additionalItems"
          :key="i"
          :href="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
            <v-list-item-subtitle v-text="item.label"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-icon
        class="mr-5"
        @click.stop="drawer = !drawer"
      >
        {{ burgerSVG }}
      </v-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn color="primary" link href="https://github.com/overscore-media/nuxt-toolkit">
        Github Repo
      </v-btn>
    </v-app-bar>
    <nuxt />
    <Social />
    <Comments />
  </v-app>
</template>

<script>
import { mdiHome, mdiMenu, mdiPostOutline, mdiAnimationPlayOutline, mdiDisqus, mdiFormatAlignJustify, mdiAtomVariant, mdiAudioVideo, mdiCodeArray, mdiVideo3d, mdiTypewriter, mdiShareAllOutline, mdiTooltipImage, mdiDevTo, mdiWeb, mdiInstagram, mdiTwitter, mdiGithub } from '@mdi/js'
import Social from '~/components/Social'
import Comments from '~/components/Comments'

export default {
  components: {
    Social,
    Comments
  },
  data () {
    return {
      burgerSVG: mdiMenu,
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: mdiHome,
          title: 'Home',
          to: '/'
        },
        {
          icon: mdiPostOutline,
          title: 'Blogging Engine',
          to: '/blog'
        },
        {
          icon: mdiAnimationPlayOutline,
          title: 'Anime.js',
          to: '/anime'
        },
        {
          icon: mdiDisqus,
          title: 'Disqus',
          to: '/disqus'
        },
        {
          icon: mdiFormatAlignJustify,
          title: 'Netlify Forms',
          to: '/netlify-forms'
        },
        {
          icon: mdiAtomVariant,
          title: 'Particles.js',
          to: '/particles'
        },
        {
          icon: mdiAudioVideo,
          title: 'Plyr',
          to: '/plyr'
        },
        {
          icon: mdiCodeArray,
          title: 'Prism',
          to: '/prism'
        },
        {
          icon: mdiVideo3d,
          title: 'THREE.js',
          to: '/three'
        },
        {
          icon: mdiTypewriter,
          title: 'Typed.js',
          to: '/typed'
        },
        {
          icon: mdiShareAllOutline,
          title: 'Vue-Goodshare',
          to: '/vue-good-share'
        },
        {
          icon: mdiTooltipImage,
          title: 'Vue-Picture-Swipe',
          to: '/vue-picture-swipe'
        }
      ],
      additionalItems: [
        {
          icon: mdiDevTo,
          title: 'Dev.to',
          label: '@overscoremedia',
          to: 'https://dev.to/overscoremedia'
        },
        {
          icon: mdiWeb,
          title: 'Our Website',
          label: 'overscore.media',
          to: 'https://overscore.media'
        },
        {
          icon: mdiInstagram,
          title: 'Find us on Instagram',
          label: '@overscore_media',
          to: 'https://instagram.com/overscore_media'
        },
        {
          icon: mdiTwitter,
          title: 'Follow us on Twitter',
          label: '@overscoremedia',
          to: 'https://twitter.com/overscoremedia'
        },
        {
          icon: mdiGithub,
          title: 'Check us out on GitHub',
          label: '@overscore-media',
          to: 'https://github.com/overscore-media'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'Nuxt Toolkit'
    }
  },
  mounted () {
    if (process.browser && this.$route.name.substr(0, 11) === '/blog/') {
      document.querySelector('.layout').style.backgroundColor = '#121212'
    }
  }

}
</script>

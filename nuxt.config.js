/* eslint-disable nuxt/no-cjs-in-config */
import colors from 'vuetify/es5/util/colors'

const path = require('path')
const fs = require('fs')

// For generating dynamic routes for blog posts
const blogPostsList = []
const blogPostDirectory = path.join(__dirname, 'blog')

// This adds to the blogPostsList using the filenames of the .md files in the /blog directory
fs.readdir(blogPostDirectory, (err, files) => {
  if (err) {
    throw err
  }
  files.forEach((file) => {
    // Do the following for every non-directory
    if (!fs.lstatSync(`${blogPostDirectory}/${file}`).isDirectory() && path.extname(file) === '.md') {
      blogPostsList.push(`/blog/${path.basename(file, '.md')}`)
    }
  })
})

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + 'OverScore Nuxt Toolkit',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'The Nuxt Toolkit by OverScore Media is a set of helpful Nuxt plugins, components, and modules to help you level up your Nuxt application.'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@overscoremedia' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@overscoremedia' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/main.scss', // For the entire site
    'katex/dist/katex.min.css', // For math
    '~/assets/markdown.scss', // For markdown in blog posts
    'plyr/dist/plyr.css' // For video/audio players
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/anime',
    { src: '~/plugins/clipboard', mode: 'client' },
    { src: '~/plugins/disqus', mode: 'client' },
    { src: '~/plugins/prism', mode: 'client' },
    { src: '~/plugins/vuex-persistence', mode: 'client' },
    { src: '~/plugins/gallery', mode: 'client' },
    { src: '~/plugins/typed', mode: 'client' },
    { src: '~/plugins/video-player' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    'nuxt-rfg-icon',
    '@nuxtjs/manifest'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    path.join(__dirname, 'markdown.js')
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  pwa: {
    icon: false
  },
  sitemap: {
    hostname: 'https://nuxt-toolkit.overscore.media',
    gzip: true,
    routes: blogPostsList // Adds generated posts to the sitemap
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      defaultAssets: {
        icons: false // Disable loading MDI fonts from jsdelivr
      },
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // Favicon Generator Module Options
  'rfg-icon': {

  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Very important to use the compiler build of Vue because the
      config.resolve.alias.vue = 'vue/dist/vue.common'
      config.module.rules.push(
        {
          test: /\.gltf$/i,
          use: 'file-loader'
        },
        {
          test: /\.glb$/i,
          use: 'file-loader'
        },
        {
          test: /\.md$/i,
          use: 'raw-loader'
        }
      )
    }
  },
  generate: {
    fallback: true, // So custom error pages work on Netlify
    routes: blogPostsList // Again, adds the blog posts to the generated routes list
  }
}

<template>
  <client-only>
    <div class="social-links">
      <v-container>
        <hr />
        <h4 class="black--text font-weight-medium pt-5 text-center">
          Share this page using:
        </h4>
        <v-layout class="text-center justify-center">
          <v-row class="justify-center my-5">
            <VueGoodshareEmail
              :page_url="`https://nuxt-toolkit.overscore.media/${pageURL}`"
              title_social="E-Mail"
              mail-subject="The Nuxt Toolkit from OverScore Media"
              has_icon
            />
            <VueGoodshareFacebook
              :page_url="`https://nuxt-toolkit.overscore.media/${pageURL}`"
              title_social="Facebook"
              has_icon
            />
            <VueGoodshareLinkedIn
              :page_url="`https://nuxt-toolkit.overscore.media/${pageURL}`"
              title_social="LinkedIn"
              has_icon
            />
            <VueGoodsharePinterest
              :page_url="`https://nuxt-toolkit.overscore.media/${pageURL}`"
              title_social="Pinterest"
              has_icon
            />
            <VueGoodshareReddit
              :page_url="`https://nuxt-toolkit.overscore.media/${pageURL}`"
              title_social="Reddit"
              has_icon
            />
            <VueGoodshareTwitter
              :page_url="`https://nuxt-toolkit.overscore.media/${pageURL}`"
              title_social="Twitter"
              has_icon
            />
            <VueGoodshareWhatsApp
              :page_url="`https://nuxt-toolkit.overscore.media/${pageURL}`"
              title_social="WhatsApp"
              has_icon
            />
          </v-row>
        </v-layout>
        <hr />
      </v-container>
    </div>
  </client-only>
</template>

<script>
import VueGoodshareEmail from 'vue-goodshare/src/providers/Email.vue'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
import VueGoodshareLinkedIn from 'vue-goodshare/src/providers/LinkedIn.vue'
import VueGoodsharePinterest from 'vue-goodshare/src/providers/Pinterest.vue'
import VueGoodshareReddit from 'vue-goodshare/src/providers/Reddit.vue'
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
import VueGoodshareWhatsApp from 'vue-goodshare/src/providers/WhatsApp.vue'

export default {
  name: 'Social',
  components: {
    VueGoodshareEmail,
    VueGoodshareFacebook,
    VueGoodshareLinkedIn,
    VueGoodsharePinterest,
    VueGoodshareReddit,
    VueGoodshareTwitter,
    VueGoodshareWhatsApp
  },
  computed: {
    pageURL () {
      return this.$route.path
    }
  }
}
</script>

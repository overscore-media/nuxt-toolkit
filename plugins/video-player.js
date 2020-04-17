import Vue from 'vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr'

Vue.component('video-player', {
  components: {
    VuePlyr
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    plyr: {
      fullscreen: {
        enabled: true
      }
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    emit: ['embed'],
    type: {
      type: String,
      default: 'video', // 'audio' or 'video'
      required: false
    },
    source: {
      type: String,
      default: 'web', // 'youtube', 'web', or 'vimeo'
      required: false
    },
    id: {
      type: String,
      required: false // bTqVqk7FSmY
    },
    mp3URL: {
      type: String,
      required: false // https://example.com/audio.mp3
    },
    oggURL: {
      type: String,
      required: false // https://example.com/audio.ogg
    },
    videoURL: {
      type: String,
      required: false // https://example.com/video.mp4
    },
    thumbnail: {
      type: String,
      required: false // poster.png
    },
    videoType: {
      type: String,
      required: false,
      default: 'video/mp4'
    },
    videoSourceSizes: {
      type: Array, // [720, 1080]
      required: false
    },
    videoSizeURLS: {
      type: Array, // [video-720p.mp4, video-1080p.mp4]
      required: false
    },
    videoCaptions: {
      type: Object, // {[name: 'English', lang: 'en', src: 'captions-en.vtt'], [name: 'Spanish', lang: 'es', src: 'captions-es.vtt']}
      required: false
    }
  },
  computed: {
    vimeoURL () {
      return `https://player.vimeo.com/video/${this.id}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`
    },
    youtubeURL () {
      return `https://www.youtube.com/embed/${this.id}?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`
    }
  },
  template: `
    <div class="video-player">
      <vue-plyr v-if="type === 'video' && source === 'youtube'">
        <div class="plyr__video-embed">
          <iframe
            :src="youtubeURL"
            allowfullscreen allowtransparency allow="autoplay">
          </iframe>
        </div>
      </vue-plyr>
      <vue-plyr v-if="type === 'video' && source === 'vimeo'">
        <div class="plyr__video-embed">
          <iframe
            :src="vimeoURL"
            allowfullscreen allowtransparency allow="autoplay">
          </iframe>
        </div>
      </vue-plyr>
      <vue-plyr v-if="type === 'video' && source === 'web'">
        <video :poster="thumbnail" :src="videoURL">
          <source v-for="(url, index) in videoSizeURLS" :key="url" :src="url" :type="videoType" :size="videoSourceSizes[index]">
          <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default>
        </video>
      </vue-plyr>
      <vue-plyr v-if="type === 'audio' && source === 'web'">
        <source v-if="mp3URL" :src="mp3URL" type="audio/mp3" />
        <source v-if="oggURL" :src="oggURL" type="audio/ogg" />
      </vue-plyr>
    </div>
  `
})

import Vue from 'vue'
import VuePictureSwipe from 'vue-picture-swipe'

Vue.component('Gallery', {
  components: {
    VuePictureSwipe
  },
  props: {
    imgs: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default () {
        return {
          bgOpacity: 0.95,
          shareEl: true,
          zoomEl: true
        }
      }
    }
  },
  template: `<vue-picture-swipe :items="imgs" :options="options" />`
})

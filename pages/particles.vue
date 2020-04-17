<template>
  <v-layout class="white black--text">
    <client-only>
      <Particles
        color="#2f2f2f"
        :particles-number="100"
        shape-type="star"
        :particle-size="3"
        movement-direction="top"
        lines-color="#dedede"
        :line-linked="false"
        :move-speed="0.75"
      />
    </client-only>
  </v-layout>
</template>

<script>
import Particles from '~/components/Particles.vue'

export default {
  components: {
    Particles
  },
  head () {
    return {
      title: 'Particles'
    }
  }
}
</script>

<style lang="scss">
div[id^="particles-instance-"] {
  height: 100vh !important;
  width: 100vw !important;
  position: fixed !important;
  top: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  z-index: 2 !important;
}
</style>

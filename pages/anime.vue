<template>
  <v-layout class="white black--text" justify-center align-center text-center>
    <client-only>
      <div v-anime="{ zIndex: 1, height: '50vw', maxHeight: '500px', width: '50vw', maxWidth: '500px', rotate: '1turn', backgroundColor: '#272727', duration: 5000, loop: true, direction: 'alternate' }"></div>
    </client-only>
  </v-layout>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anime'
    }
  }
}
</script>

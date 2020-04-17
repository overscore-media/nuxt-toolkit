<template>
  <v-layout class="white black--text">
    <v-container>
      <Gallery :imgs="[{src: 'https://picsum.photos/200/300', thumbnail: 'https://picsum.photos/200/300', w: 200, h: 300, alt: 'random picture', title: 'Some Picture'}, {src: 'https://picsum.photos/400/300', thumbnail: 'https://picsum.photos/400/300', w: 400, h: 300, alt: 'Another Random Picture', title: 'Another Picture'}]" />
    </v-container>
  </v-layout>
</template>

<script>
export default {
  head () {
    return {
      title: 'Vue Picture Swipe'
    }
  }
}
</script>

<template>
  <v-layout class="white black--text">
    <v-container>
      <vue-typed-js :strings="['Typed.js test', 'Uses https://github.com/Orlandster/vue-typed-js']" :loop="true">
        <h1 class="typing"></h1>
      </vue-typed-js>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  head () {
    return {
      title: 'Typed'
    }
  }
}
</script>

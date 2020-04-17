<template>
  <v-layout class="white black--text">
    <v-container>
      <prism lang="scss">
        .some-class {
        &::before {
        content: 'Hello World'
        }
        }
      </prism>
      <prism lang="ruby">
        message = 'hello world'
        puts message
      </prism>
      <prism lang="html">
        &lt;html&gt;
        &lt;head&gt;
        &lt;title&gt;Hello Web!&lt;/title&gt;
        &lt;/head&gt;

        &lt;body&gt;
        &lt;h1&gt;Hello Web!&lt;/h1&gt;
        &lt;/body&gt;
        &lt;/html&gt;
      </prism>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  head () {
    return {
      title: 'Prism'
    }
  }
}
</script>

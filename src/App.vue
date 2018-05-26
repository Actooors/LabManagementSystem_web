<template>
  <div id="app">
    <head-bar :key-height="headBarKeyHeight"></head-bar>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeadBar from 'components/headBar/headBar'
  import FooterBar from "components/footer/footerBar";

  export default {
    name: 'App',
    components: {
      FooterBar,
      HeadBar
    },
    computed: {
      headBarKeyHeight() {
        return this.$route.name === 'mainPage' ? window.innerHeight : -1
      }
    }
  }
</script>

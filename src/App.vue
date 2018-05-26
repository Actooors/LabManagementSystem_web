<template>
  <div id="app">
    <head-bar :key-height="headBarKeyHeight"></head-bar>
    <router-view v-loading.fullscreen.lock="loading>0"></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeadBar from 'components/headBar/headBar'
  import FooterBar from "components/footer/footerBar";
  import store from 'store/store.js'
  import {mapState} from 'vuex'

  export default {
    store,
    name: 'App',
    components: {
      FooterBar,
      HeadBar
    },
    computed: {
      ...mapState(['loading']),
      headBarKeyHeight() {
        return this.$route.name === 'mainPage' ? window.innerHeight : -1
      }
    }
  }
</script>

<template>
  <div>
    <head-bar></head-bar>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeadBar from 'components/headBar/headBar'
  import FooterBar from "components/footer/footerBar";

  export default {
    name: "student",
    components: {
      FooterBar,
      HeadBar
    },
  }
</script>

<style scoped>

</style>

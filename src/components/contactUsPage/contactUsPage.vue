<template>
    <div>
      <head-bar></head-bar>
      <member-itroduction></member-itroduction>
      <footer-bar class="footerinterval"></footer-bar>
    </div>
</template>

<script>
    import HeadBar from "../headBar/headBar";
    import FooterBar from "../footer/footerBar";
    import MemberItroduction from "../memberIntroduction/memberItroduction";

    export default {
      components: {
        MemberItroduction,
        FooterBar,
        HeadBar},
      name: "contact-us-page"
    }
</script>

<style scoped>
.footerinterval{
  margin-top:300px
}
</style>

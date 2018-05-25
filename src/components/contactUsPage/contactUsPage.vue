<template>
    <div style="background-color:gainsboro">
      <head-bar ref="headbar"></head-bar>
      <member-itroduction ></member-itroduction>
      <footer-bar class="footerinterval"></footer-bar>
    </div>
</template>

<script>
    import HeadBar from "../headBar/headBar";
    import FooterBar from "../footer/footerBar";
    import MemberItroduction from "../memberIntroduction/memberItroduction";
    import Mymap from "../map/mymap";

    export default {
      components: {
        Mymap,
        MemberItroduction,
        FooterBar,
        HeadBar
      },
      name: "contact-us-page",
      mounted(){
      //  console.log("挂在完成")
        var member=document.getElementById("memberItroduction");
        //console.log(member)
        var height=document.getElementById("headbar").children[0].clientHeight;
        // var height = document.getElementById("headbar").clientHeight;
        //console.log(height)
        member.style.marginTop=height+'px';
        // member.style.marginTop=height.toString();
      },
    }
</script>

<style scoped>
.footerinterval{
  /*margin-top:300px*/
}
</style>

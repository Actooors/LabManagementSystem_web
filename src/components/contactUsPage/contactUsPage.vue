<template>
    <div style="background-color:gainsboro">
      <member-itroduction ></member-itroduction>
    </div>
</template>

<script>
    import MemberItroduction from "components/memberIntroduction/memberItroduction";
    import Mymap from "base/map/mymap";

    export default {
      components: {
        Mymap,
        MemberItroduction,
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

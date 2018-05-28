<template>
  <div id="messageContainer">
  <message-overview></message-overview>
  </div>
</template>

<script>
  import MessageOverview from "./messageOverview";
  import MessageContent from "./messageContent";

  export default {
    components: {
      MessageContent,
      MessageOverview},
    name: "messagePage",
    data(){
      return{

      }
    },
    mounted(){
      this.settop();
    },
    methods:{
      settop(){
        var height=document.getElementById("headbar").children[0].clientHeight;
        // console.log(height);
        var message=document.getElementById("messageContainer");
        // console.log(message)
        message.style.marginTop=height+'px';
      },
    }

  }

</script>

<style scoped>
#messageContainer{
  background-color: rgba(169,169,169,.1);
}
</style>

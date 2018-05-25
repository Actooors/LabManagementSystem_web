<template>
<div>
  <div class="container">
    <div class="row">

      <div class="col-xs-2">
        <nav class="navbar" id="sidebar-wrapper" role="navigation">
          <ul class="nav sidebar-nav">
            <li> <a href="#" id="meeting" @click="confirmmeeting" > 会议通知</a> </li>
            <li> <a href="#" id="outing" @click="confirmouting"> 出行通知 </a> </li>
            <li> <a href="#" id="competition" @click="confirmcompertition"> 竞赛通知 </a> </li>
            <li><a href="#" id="all" @click="checkall">查看全部</a> </li>
          </ul>
        </nav>
      </div>
      <div class="col-xs-10">
        <message-content :type="type"></message-content>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import MessageContent from "./messageContent";

    export default {
      components: {MessageContent},
      name: "messageOverview",
      data(){
        return{
          type:''
        }
      },
      mounted(){

      },
      methods:{
        confirmmeeting(){
          this.type="meeting";
        },
        confirmouting(){
          this.type="outing";
        },
        confirmcompertition(){
          this.type="competition";
        },
        checkall(){
          this.type='';
        }
      }
    }

</script>

<style scoped>
li{
  border:1px gray solid;
  border-radius: 10px;
  overflow: hidden;
}
  .navbar{
    padding-top: 20px;
  }
</style>

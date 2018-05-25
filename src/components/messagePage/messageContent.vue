<template>
<div class="container">
  <div class="panel panel-default">
    <div v-for="item in this.details">
      <div v-show="item.type===type||type===''">
        <div class="panel-body"  style="border-radius: 5px;border: 1px gray solid">
          <span><h1><mark>{{item.title}}</mark></h1></span>
          <br><hr><br>
          <div class="font">
            {{item.content}}
          </div>
          <div class="font" style="text-align: right;padding-right: 20%">
            {{item.author}}
          </div>
          <div class="font" style="text-align: right;padding-right: 20%">
            {{item.time}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
      props:{
        type: String
      },
      name: "message-content",
      data(){
        return{
          details:[
            {
              type:'meeting',
              title:'关于XXX议会',
              content:"             今天下午14：00点全体工作员在办公室开会，请大家安排好工作，准时参加会议。\n",
              author:"XXX 办公室",
              time:"X年XX月XX日"
            },
            {
              type:'meeting',
              title:'关于XXX议会',
              content:"             今天下午14：00点全体工作员在办公室开会，请大家安排好工作，准时参加会议。\n",
              author:"XXX 办公室",
              time:"X年XX月XX日"
            },
            {
              type:'meeting',
              title:'关于XXX议会',
              content:"             今天下午14：00点全体工作员在办公室开会，请大家安排好工作，准时参加会议。\n",
              author:"XXX 办公室",
              time:"X年XX月XX日"
            },
            {
              type:'outing',
              title:'往深圳大学交流',
              content:"猜你喜欢\n" +
              "百度糯米\n" +
              "京东商城\n",
              author:"XXX 办公室",
              time:"X年XX月XX日"
            },
            {
              type:'competition',
              title:'XXX大赛通知',
              content:"猜你喜欢\n" +
              "百度糯米\n" +
              "京东商城\n" +
              "1号店\n" +
              "苏宁易购\n",
              author:"XXX 办公室",
              time:"X年XX月XX日"
            }
          ],
        }
      },
      methods:{
          changeheight(){
              console.log(type)
          }
      },
      watch:{
        type(val){

        }

      }

    }
</script>

<style scoped>
.container{
  margin-top: 20px;
  width: 100%;
  padding: 0px;
}
  mark{
    background-color: #6eaeae;
  }
  .panel-body:hover{
    background-color: #f0f0f0;
    font-weight: bold;
    position: relative;
    width: 104%;
    left: -2%;


    border-radius:2%;
    /*height: ;*/
  }
  hr{
    height: 1px;
    background-color: gray;
    border: none;
  }
  .panel-body:hover hr{

    border: none;
    background-color: #0f0f0f;
    box-sizing: border-box;
  }
  .font{
    font-family:'Microsoft YaHei UI Light';
    font-size: medium;
  }
</style>

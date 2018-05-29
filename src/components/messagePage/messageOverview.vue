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
            <li><a href="#boundary" id="new">新建通知</a> </li>
          </ul>
        </nav>
      </div>
      <div class="col-xs-10">
        <message-content :type="type"></message-content>
      </div>
    </div>
    <div style="height: 100px;" id="boundary"></div>
    <div class="row" >
    <div class="col-xs-offset-2 col-xs-10" style="padding-top: 10px; border-radius: 5px; background-color:  #8baab4">
      <div class="col-xs-offset-5">
        <div>
          <h1>新 建 通 知</h1>
        </div>
      </div>
      <div id="newnotification" style="padding: 20px;">
        <form class="form-horizontal" role="form" id="newnotif">
          <div class="form-group">
            <label for="title" class="col-sm-2 control-label">通知题目</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="title" placeholder="请输入通知名称">
            </div>
          </div>
          <div class="form-group">
            <label for="time" class="col-sm-2 control-label">执行时间</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="time" placeholder="请输入执行时间">
            </div>
          </div>
          <div class="form-group">
            <label for="content" class="col-sm-2 control-label">具体内容</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="3" id="content" placeholder="请输入通知内容"></textarea>
              <!--<input type="text" class="form-control" id="lastname" placeholder="请输入通知内容">-->
            </div>
          </div>
          <div class="form-group">
            <label for="content" class="col-sm-2 control-label">具体内容</label>
            <div class="col-sm-10">
              <select style="height:40px;width: 100px;border-radius: 5px">
                <option value ="meeting">会议通知</option>
                <option value ="outing">出行通知</option>
                <option value="competition">竞赛通知</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <el-button size="mini" @click="submitnot" >保存修改</el-button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
    import axios from 'axios'
    import store from 'store/store'
    import {mapState} from 'vuex'
    import CollapsePanel from 'base/collapsePanel/collapsePanel'
    import {Option, Select} from 'iview'

    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillEditor} from 'vue-quill-editor'
    import MessageContent from "./messageContent";
    // import '../../assets/js/bootstrap-select.min'
    export default {
      components: {
        MessageContent,
        CollapsePanel,
        Select,
        Option,
        quillEditor
    },
      name: "messageOverview",
      data(){
        return{
          type:'',
          newsType: '',
          newsInfo: {
            title: '',
            author: '',
            datetime: '',
            content: ''
          },
          panelEditable: {
            title: false,
            type: false
          },
          panelInfo: {
            title: '',
            type: ''
          },
          clickTimer: {
            title: null,
            type: null
          },
          editMode: true,
          editContent: null
        }
      },
      methods: {
        confirmmeeting() {
          this.type = "meeting";
        },
        confirmouting() {
          this.type = "outing";
        },
        confirmcompertition() {
          this.type = "competition";
        },
        checkall() {
          this.type = '';
        },
       handleClickSaveBtn() {
        this.$notify({
          title: '提示',
          message: "新增通知成功！"
        })
       },
        handleClickFailBtn() {
          this.$notify({
            title: '警告',
            message: "新增通知失败！"
          })
        },
        submitnot(){
          var title=document.getElementById("title").innerText;
          var content=document.getElementById("content").innerText;
          var time=document.getElementById('time').innerText;
          var types=document.getElementsByTagName('option')
          var type;
          for(var i=0;i<types.length;i++){
            if(types[i].selected=true){
              type=types[i].value;
            }
          }
          axios({
            url:apiRootPath+'message/new',
            methods:'post',
            params:{
                title:title,
              content:content,
              time:time,
              type:type
            }
          }).then((response)=>{
            if(response.data.code==="SUCCESS")
              handleClickSaveBtn();
          }).catch((error)=>{
            console.log("增加通知失败")
            this.handleClickFailBtn();
          })
          setTimeout(function () {
            document.getElementById('newnotif').reset();
          },2000)
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

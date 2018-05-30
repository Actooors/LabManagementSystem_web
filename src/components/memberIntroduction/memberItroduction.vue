<template>
  <div>
  <div id="memberItroduction">
    <div class="container">
      <div id="leader" >
        <div class="row justify-center" >
          <div id="headshot" class="col-xs-4 ">
            <img src="../../assets/img/headshot.jpg"/>
          </div>
          <div class="col-xs-8">
            <div>
              <label style="font-size: xx-large">{{leader.name}}</label>
              <div v-for="pos in this.leader.position" class="inline-block">
                <span style="font-size: medium;font-weight: bolder;color: gray">&nbsp;| </span>
                <div  class="btn btn-default inline-block" style="color: gray">{{pos}}</div>
              </div>
              <div v-for="content in this.leader.details">
                <div class="container-fluid">
                  <div class="glyphicon glyphicon-hand-right col-xs-1 content">
                  </div>
                  <div class="col-xs-11 content">
                    {{content}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div id="teachers" class="container-fluid">
        <div class="col-xs-12" style="text-align: center">
          <span class="title2">参与研发教师成员</span>
        </div>
          <div v-for="(member,index) in this.teachers">
            <div class="col-xs-3">
              <!--<div><img src="this.member.headshoturl"/></div>-->
              <div style="-webkit-border-radius: 50%;overflow: hidden">
                <div :style="{background:'url(' + member.avatar+ ') center center'}" class="headshot" id="Tmemberhead">
                  <div style="background: rgba(255,255,255,0.5)" id="Tcover">
                    <span>{{member.phone}}</span><br>
                    <span>{{member.position[1]}}</span>
                  </div>
                </div>
              </div>
              <div style="text-align: center">
                <a href="#">{{member.username}}</a><br/>
                <span>{{member.position[0]}}</span>
              </div>
            </div>
          </div>
        </div>

      <div class="line"></div>
      <div id="member" class="container-fluid">
        <div class="col-xs-12" style="text-align: center">
          <span class="title2">参与研发学生成员</span>
        </div>
          <div v-for="(member,index) in this.member">
            <div class="col-xs-3" style="position: relative">
              <!--<div><img src="this.member.headshoturl"/></div>-->
              <div style="-webkit-border-radius: 50%;overflow: hidden">
                <div :style="{background:'url(' + member.avatar+ ') center center'}" class="headshot" id="memberhead">
                  <div style="background: rgba(255,255,255,0.5)" id="cover">
                    <span>{{member.phone}}</span><br>
                    <span>{{member.position[1]}}</span>
                  </div>
                </div>
              </div>
              <div style="text-align: center">
                <a href="#">{{member.name}}</a><br/>
                <span>{{member.position[0]}}</span>
              </div>
            </div>
          </div>
        </div>
      <div class="line"></div>
      <mymap></mymap>
        </div>
      </div>

  </div>
</template>

<script>
  import Mymap from "../../base/map/mymap";
  import axios from 'axios';
  export default {
    components: {Mymap},
    name: "member-itroduction",
    data(){
      return{
        leader:{
          name:'李晓强',
          position:['实验室总负责人','上海大学计算机工程与科学学院副教授','硕士生导师','理学博士学位'],
          research:['信息隐藏与数字水印','数字图像处理','模式识别','数字版权管理'],
          details:["  2004年6月毕业于复旦大学计算机科学与工程系计算机应用专业，获理学博士学位。主要研究兴趣为信息隐藏与数字水印、数字图像处理与模式识别、数字版权管理。",
            "  先后在《计算机学报》、《通信学报》等国内权威期刊和IEEE等举办的重要国际会议上发表论文10余篇，其中已被SCIE/EI/ISTP检索8篇。",
            "  曾参加863项目“多媒体数据检索与处理技术”、国家自然科学基金项目“高维数据索引结构的研究”、上海市科技发展基金项目“数字水印算法研究”等多项课题。目前，主持上海市教委项目两项，横向项目一项。"]
        },
        teachers:[
          {
            username:'XXX',
            avatar:require('../../assets/img/headshot.jpg'),
            phone:'博客:xxx',
            position:['硕士生','上海交通大学'],
          }
        ],
        member:[{
          name:'XXX',
          headshoturl:require('../../assets/img/headshot.jpg'),
          contaction:'博客:xxx',
          position:['硕士生','上海交通大学'],
        }],
      }
    },
    mounted(){
      axios({
        url: apiRootPath+'user/all',
        methods:'get'
      }).then((response)=>{
        if(response.data.code==="SUCCESS"){
          console.log(response.data.data)
          this.teachers=response.data.data.teachers;
          this.member=response.data.data.member;
        }
      }).catch((error)=>{
        console.log(error)
      })
    },

    // mounted(){
    //   console.log(`${backgrounds[1]}`)
    // }
  }
</script>

<style scoped>
  img{
    width: 100%;
    border-radius: 50%;
    display: block;
    /*图片居中我搞不定*/
    /*margin: px auto 15px;*/
  }
  .inline-block{
    display: inline-block !important;
  }
  .content{
    /*不知道这里应不应该写死*/
    line-height:40px;
  }
  .container{
    background-color: rgba(255,255,255,0.9);
    padding-top: 10px;
  }
  #memberItroduction{
    background-image: url('../../assets/img/上海.jpg');
    background-size: cover;
  }
  #leader{
    /*border:1px dotted gray;*/
    /*border-radius: 5%;*/
  }
  .justify-center{
    display: flex;
    justify-items: center !important;
  }
  a{
    text-decoration: none;
    color: #6c5e80;
    font-size: 20px;
  }
  .headshot{
    width:100%;
  }
  #memberhead div{
    padding: 70% 0% 10% 50%;
  }
  /*居然不能同时选中两个id下面的元素*/
  #Tmemberhead div{
     padding: 70% 0% 10% 50%;
   }
  img:hover{
    animation: mygrayscals 1s forwards;
  }
  @-webkit-keyframes mygrayscals {
    from{filter: grayscale(0%)}
    to{filter: grayscale(30%)}
  }
  @keyframes mygrayscals {
    from{filter: grayscale(0%)}
    to{filter: grayscale(30%)}
  }
  #cover{
    visibility: hidden;
    white-space: nowrap;
  }
  #Tcover{
    visibility: hidden;
    white-space: nowrap;
  }
  #memberhead:hover #cover{
    animation: mycover 1s forwards;

  }
  #Tmemberhead:hover #Tcover{
    animation: mycover 1s forwards;

  }
  @-webkit-keyframes mycover{
    from{visibility: hidden}
    to{visibility: visible}
  }

  #cover,#Tcover span{
    font-size: 20px;
    color:gray;
    font-weight: bolder;
    font-family: "Adobe 楷体 Std R";
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .line{

    margin-top: 3%;
    margin-bottom: 3%;
    border-top: 1px solid gray;
  }
  .title2{
    display: block;
    color: gray;
    font-size: 30px;
    font-family: "Adobe 楷体 Std R";
    font-weight: bolder;
    letter-spacing: 10px;
    line-height: 50px;
    margin-bottom: 20px;
  }
</style>

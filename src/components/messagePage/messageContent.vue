<template>
<div class="container">
  <div class="panel panel-default">
    <div v-for="item in this.details">
      <div v-show="item.type===type||type===''">
        <div class="panel-body"  style="border-radius: 5px;border: 1px gray solid">
          <div style="display: inline-block;float:right;">
          <button :title=item.title @click="handleOnClickDeleteButton(item.title)" class="btn btn-default">
            删除本条通知
          </button>
          </div>
          <span><h1><mark>{{item.title}}</mark></h1></span>
          <br><hr><br>
          <div class="font">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{item.time}}{{item.content}}
          </div>
          <div class="font" style="text-align: right;padding-right: 20%">
            {{item.author}}
          </div>
          <div class="font" style="text-align: right;padding-right: 20%">
            {{item.publishTime}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import axios from 'axios';
    export default {
      props:{
        type: String
      },
      name: "message-content",
      data(){
        return{
          details:[

          ],
        }
      },
      created(){
         this.lodeDetails();
      },
      methods:{
          changeheight(){
              // console.log(type)
          },
          lodeDetails(){
              // var vm=this;
              axios({
                url: apiRootPath+'notice/allNotice',
                method: 'get'
              }).then((response) => {
                console.log("data");
                console.log(response.data.data)
                this.details = response.data.data
              }).catch((error) => {
               console.log(error)
                console.log("有问题")
              })
          },



        handleOnClickDeleteButton(title) {
          this.$confirm('此操作将删除本通知, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("title是"+title);
            axios({
              url: apiRootPath+'notice/deleteNotice',
              method:'post',
              data:{
                title:title
              }
            }).then(
              (response)=>{
                console.log(response.data);
                if(response.data.code==="SUCCESS")
                  // alert("删除成功")
                {
                  this.details=response.data.data;
                  this.$message({
                      type: 'success',
                      message: '删除成功!',
                    }
                  );
                  this.lodeDetails();
                }

              }
            ).catch(
              (error)=>{
                console.log("删除失败")
                console.log(error)
                this.$message({
                  type: 'warning',
                  message: '删除失败!',
                })
              }
            );
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
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

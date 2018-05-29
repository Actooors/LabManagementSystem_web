<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="bread-crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{name:'topic'}">话题</el-breadcrumb-item>
          <el-breadcrumb-item>发表话题</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-wrapper">
        <el-form v-model="form" label-width="80px">
          <el-form-item label="话题标题">
            <el-input v-model="form.title" placeholder="键入标题"></el-input>
          </el-form-item>
          <el-form-item label="话题类别">
            <el-input v-model="form.type" placeholder="键入类别"></el-input>
          </el-form-item>
          <el-form-item label="话题内容" style="margin-bottom:0"></el-form-item>
          <quillEditor v-model="form.content" class="form-item" style="background-color: white"></quillEditor>
          <el-button size="small" class="form-item news-submit" type="primary" @click="handleOnSubmit">发表</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  // require styles
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  import axios from 'axios'


  export default {
    name: "newNews",
    components: {
      quillEditor
    },
    data() {
      return {
        form: {
          title: '',
          type: '',
          content: ''
        }
      }
    },
    methods: {
      handleOnSubmit() {
        axios({
          url: apiRootPath+'topic/addTopic',
          method: 'post',
          data: this.form
        }).then((response) => {
          if (response.data.code === 'SUCCESS') {
            this.$message({
              type: 'success',
              message: '发布成功！'
            })
            this.$router.push({path: '/topic'})
          } else {
            this.$message.warning(`发布失败，错误提示: ${response.data.message}`)
          }
        }).catch((error) => {
          this.$message.error('发布失败，请检查网络连接！')
          process.env.NODE_ENV === 'development' && console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/newNews';
</style>

<style>
  .ql-container {
    height: 500px;
  }
</style>

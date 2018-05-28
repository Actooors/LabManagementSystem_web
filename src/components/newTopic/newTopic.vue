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
          content:''
        }
      }
    },
    methods: {
      handleOnSubmit() {
        process.env.NODE_ENV === "development" && console.log("点击了提交")
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

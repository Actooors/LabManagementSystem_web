<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="bread-crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/news/'}">新闻</el-breadcrumb-item>
          <el-breadcrumb-item>发布新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-wrapper">
        <el-form v-model="form" label-width="80px">
          <el-form-item label="新闻标题">
            <el-input v-model="form.title" placeholder="键入标题"></el-input>
          </el-form-item>
          <el-form-item label="新闻分类">
            <el-select v-model="form.type" placeholder="选择分类">
              <el-option :label="item.label" :value="item.value" v-for="(item,index) in newsTypeList.items"
                         :key="index.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-model="form.content" label="新闻内容" style="margin-bottom:0"></el-form-item>
          <quillEditor class="form-item" style="background-color: white"></quillEditor>
          <el-button size="small" class="form-item news-submit" type="primary" @click="handleOnSubmit">发布</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

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
          content: ''
        },
        newsTypeList: {
          "num": 3,
          "items": [{
            "label": "实验室动态",
            "value": "labnews"
          }, {
            "label": "学界重要新闻",
            "value": "academic"
          }, {
            "label": "其他新闻",
            "value": "others"
          }]
        }
      }
    },
    methods: {
      handleOnSubmit() {
        axios({
          url: '//localhost:8081/api/news/addNews',
          method: 'post',
          data: this.form
        }).then((response) => {
          if (response.data.code === 'SUCCESS') {
            this.$message({
              type: 'success',
              message: '发布成功！'
            })
            this.$router.push({path: '/news'})
          } else {
            this.$message.warning(`保存失败，错误提示: ${response.data.message}`)
          }
        }).catch((error) => {
          this.$message.error('发布失败，请检查网络连接！')
          process.env.NODE_ENV === 'development' && console.log(error)
        })
      }
    },
    created() {
      axios({
        url: '//localhost:8081/api/news/newsType',
        method: 'get',
      }).then((response) => {
        this.newsTypeList = response.data.data
      }).catch((error) => {
        this.newsTypeList = []
      })

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

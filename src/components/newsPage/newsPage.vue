<template>
  <div class="page-wrapper">
    <sidebar class="sidebar"
             @mouseover="handleMouseOverMenu"
             :itemList="sideNewsList"
             v-model="activeSidebarMenuItem"></sidebar>
    <div class="content" ref="content">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>新闻</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/student/news/'+$route.params.newstype}">{{newsType}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.params.hasOwnProperty('newsid')">新闻详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
  </div>


</template>

<script>
  import shave from 'shave'
  import Sidebar from 'components/sidebar/sidebar'
  import axios from 'axios'

  export default {
    name: "newsPage",
    components: {
      Sidebar
    },
    data() {
      return {
        newsType: "",
        sideNewsList: [],
        activeSidebarMenuItem: '',
        newsTypes: ['labnews', 'academic', 'others'],
        newsNames: ['实验室动态', '学界重要新闻', '其他新闻']
      }
    },
    methods: {
      handleMouseOverMenu(out) {
        let hasMoveRight = this.$refs.content.classList.contains('moveRight')
        if (!(out ^ hasMoveRight)) {
          if (!out) {
            this.$refs.content.classList.add('moveRight')
          } else {
            this.$refs.content.classList.remove('moveRight')
          }
        }
      },
      updateComponents() {
        //面包屑
        let index;
        if ((index = this.newsTypes.indexOf(this.$route.params.newstype)) === -1) {
          this.$router.replace('/404')
        }
        this.$nextTick(() => {
          this.newsType = this.newsNames[index]
          //侧边栏
          // process.env.NODE_ENV === "development" && console.log('update', this.$route.fullPath, this.activeSidebarMenuItem)
          this.activeSidebarMenuItem = this.$route.fullPath
        })
      },
      shaveIt() {
        let maxheight = 160
        shave('.content-para', maxheight);
      },
      initShave() {
        var timer = null
        this.shaveIt()
        window.onresize = () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.shaveIt()
          }, 100)
        }
        this.$Lazyload.$on('loaded', () => {
          this.shaveIt()
        })
      },
      loadData() {
        //侧边栏数据
        let cfg = {
          url: '/api/news',
          method: 'post',
          data: {
            type: 'matter'
          }
        }
        axios(cfg)
          .then((response) => {
            if (response.data.code === 'SUCCESS' && response.data.data !== null) {
              console.log(response.data.data)
              this.sideNewsList = response.data.data
            } else {
              process.env.NODE_ENV === 'development' && console.log('loadDataError', response)
            }
          })
          .catch((error) => {
            process.env.NODE_ENV === 'development' && console.log(error)
          })
      }
    },
    mounted() {
      this.initShave()
      this.loadData()
    },
    created() {
      this.updateComponents()
    },
    beforeUpdate() {
      this.updateComponents()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/newsPage';
</style>

<style>
  .is-link {
    font-weight: normal !important;
  }
</style>

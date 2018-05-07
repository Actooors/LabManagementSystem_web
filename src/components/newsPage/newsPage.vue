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

  export default {
    name: "newsPage",
    components: {
      Sidebar
    },
    data() {
      return {
        newsType: '',
        sideNewsList: [{
          iconClass: 'el-icon-document',
          title: '我们不一样，每个人都有不同的境遇',
          routePath: '/student/news/labnews/100001'
        }, {
          iconClass: 'el-icon-document',
          title: '金冬寒提出宝贵指导意见',
          routePath: '/'
        }, {
          iconClass: 'el-icon-document',
          title: '实验室获国家科技进步二等奖hhhhhh',
          routePath: '/'
        }],
        activeSidebarMenuItem: ''
      }
    },
    mounted() {
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
    beforeCreate() {
      let newsTypes = ['labnews', 'academic', 'others'];
      let newsNames = ['实验室动态', '学界重要新闻', '其他新闻'];
      let index;
      if ((index = newsTypes.indexOf(this.$route.params.newstype)) === -1) {
        this.$router.replace('/404')
      }
      this.$nextTick(() => {
        this.newsType = newsNames[index]
      })
    },
    methods: {
      shaveIt() {
        let maxheight = 160
        shave('.content-para', maxheight);
      },
      handleMouseOverMenu(out) {
        let hasMoveRight = this.$refs.content.classList.contains('moveRight')
        if (!(out ^ hasMoveRight)) {
          if (!out) {
            this.$refs.content.classList.add('moveRight')
          } else {
            this.$refs.content.classList.remove('moveRight')
          }
        }
      }
    },
    beforeUpdate() {
      this.activeSidebarMenuItem = this.$route.fullPath
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

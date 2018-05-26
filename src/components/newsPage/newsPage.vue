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
          <el-breadcrumb-item :to="{path: '/news/'+$route.params.newstype}">{{newsType}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.params.hasOwnProperty('newsid')">新闻详情</el-breadcrumb-item>
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
  import store from 'store/store'
  import {mapState} from 'vuex'

  export default {
    store,
    name: "newsPage",
    components: {
      Sidebar
    },
    data() {
      return {
        newsType: "",
        sideNewsList: [],
        activeSidebarMenuItem: ''
      }
    },
    computed: mapState(['newsMap']),
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
        if (!this.newsMap.hasOwnProperty(this.$route.params.newstype)) {
          this.$router.replace('/404')
        }
        this.$nextTick(() => {
          this.newsType = this.newsMap[this.$route.params.newstype]
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
              // console.log(response.data.data)
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

<template>
  <div class="root-wrapper">
    <sidebar class="sidebar"
             @mouseover="handleMouseOverMenu"
             :itemList="sideNewsList"></sidebar>
    <div class="content" ref="content">

      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>新闻</el-breadcrumb-item>
          <el-breadcrumb-item>{{newsType}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card shadow="hover" class="newscard" v-for="(item,index) of newsList" :key="item.value">
        <div class="card-head-container">
          <a :href="item.url" class="card-title-link"><h1 v-text="item.title" class="card-title"></h1></a>
          <div class="card-article-props">
            <p><span class="el-icon-date"></span>>
              <time :datetime="item.time">发表于{{item.time.split('T')[0]}}</time>
            </p>
            <p>By {{item.author}}</p>
          </div>
        </div>
        <div class="card-inner-container">
          <div class="card-content">
            <p class="content-para" v-text="item.overview" v-once></p>
          </div>
          <div class="card-image" v-if="item.imgurl">
            <img v-lazy="item.imgurl">
          </div>
        </div>
      </el-card>
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
        newsList: [{
          title: '热烈庆祝实验室网站顺利开发热烈庆祝实验室网站顺利开热烈庆祝实验室网站顺利开发热烈庆祝实验室网站顺利开发发',
          url: 'https://www.baidu.com',
          time: '2018-04-17T05:18:00.000Z',
          author: '莫之章',
          imgurl: 'http://dmis.shu.edu.cn/assets/images/595x240/03.jpg',
          overview: '这是很简单的概述',
        }, {
          title: '恭喜恭喜恭喜你',
          url: 'https://www.baidu.com',
          time: '2018-04-17T05:18:00.000Z',
          author: '李瑞轩',
          imgurl: 'http://dmis.shu.edu.cn/assets/images/595x240/03.jpg',
          overview: '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述' +
          '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述'
        }, {
          title: '凉凉',
          url: 'https://www.baidu.com',
          time: '2018-04-17T05:18:00.000Z',
          author: '李瑞轩',
          imgurl: 'http://dmis.shu.edu.cn/assets/images/640x480/02.jpg',
          overview: '完了，凉凉了'
        }],
        sideNewsList: [{
          iconClass: 'el-icon-document',
          title: '习近平主席参观实验室',
          routePath: '/'
        }, {
          iconClass: 'el-icon-document',
          title: '金冬寒提出宝贵指导意见',
          routePath: '/'
        }, {
          iconClass: 'el-icon-document',
          title: '实验室获国家科技进步二等奖',
          routePath: '/'
        }]
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
      var index;
      if ((index = newsTypes.indexOf(this.$route.params.subpath)) === -1) {
        this.$router.replace('/404')
      }
      this.newsType = newsNames[index]

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

  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/newsPage';
</style>


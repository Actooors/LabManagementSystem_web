<template>
  <div class="root-wrapper">
    <sidebar class="sidebar" @mouseover="handleMouseOverMenu"></sidebar>
    <div class="content" ref="content">
      <el-card shadow="hover" class="newscard" v-for="(item,index) of items" :key="item.value">
        <div class="card-head-container">
          <a :href="item.url" class="card-title-link"><h1 v-text="item.title" class="card-title"></h1></a>
          <div class="card-article-props">
            <p><span class="el-icon-date"/>
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
        items: [{
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


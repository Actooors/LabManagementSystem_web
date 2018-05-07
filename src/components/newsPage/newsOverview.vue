<template>
  <div>
    <el-card shadow="hover" class="newscard" v-for="(item,index) of newsList" :key="item.value">
      <div class="card-head-container">
        <a :href="item.url" class="card-title-link"><h1 v-text="item.title" class="card-title"></h1></a>
        <div class="card-article-props">
          <p><span class="el-icon-date"></span>
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
</template>

<script>
  export default {
    name: "newsOverview",
    data() {
      return {
        newsList: [{
          title: '我们不一样，每个人都有不同的境遇',
          url: 'labnews/100001',
          time: '2018-04-17T05:18:00.000Z',
          author: '莫之章',
          imgurl: 'http://dmis.shu.edu.cn/assets/images/595x240/03.jpg',
          overview: '引言： 数据结构学到最短路径了，总结一下几个算法。',
        }, {
          title: '恭喜恭喜恭喜你',
          url: 'labnews/100002',
          time: '2018-04-17T05:18:00.000Z',
          author: '李瑞轩',
          imgurl: 'http://dmis.shu.edu.cn/assets/images/595x240/03.jpg',
          overview: '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述' +
          '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述'
        }, {
          title: '凉凉',
          url: 'labnews/100003',
          time: '2018-04-17T05:18:00.000Z',
          author: '李瑞轩',
          imgurl: 'http://dmis.shu.edu.cn/assets/images/640x480/02.jpg',
          overview: '完了，凉凉了'
        }],
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/newsOverview';
</style>

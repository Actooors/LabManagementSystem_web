<template>
  <div class="root-wrapper">
    <div class="content">
      <el-card shadow="hover" class="card" v-for="(item,index) of items" :key="item.value">
        <div class="card-head-container">
          <a :href="item.url" class="card-title-link"><h1 v-text="item.title" class="card-title"></h1></a>
          <div class="card-article-props">
            <p><span class="el-icon-date" /><time :datetime="item.time">发表于{{item.time.split('T')[0]}}</time></p>
            <p>By {{item.author}}</p>
          </div>
        </div>
        <div class="card-inner-container">
          <div class="card-image" v-if="item.imgurl">
            <img v-lazy="item.imgurl">
          </div>
          <div class="card-content" v-text="item.overview"></div>
        </div>
      </el-card>
    </div>
  </div>


</template>

<script>
  export default {
    name: "newsPage",
    data() {
      return {
        items: [{
          title: '热烈庆祝实验室网站顺利开发热烈庆祝实验室网站顺利开热烈庆祝实验室网站顺利开发热烈庆祝实验室网站顺利开发发',
          url: 'https://www.baidu.com',
          time: '2018-04-17T05:18:00.000Z',
          author: '莫之章',
          imgurl: 'http://p6g1c83vx.bkt.clouddn.com//18-4-17/49376331.jpg',
          overview: '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述' +
          '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述',

        }, {
          title: '恭喜恭喜恭喜你',
          url: 'https://www.baidu.com',
          time: '2018-04-17T05:18:00.000Z',
          author: '李瑞轩',
          overview: '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述' +
          '这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是' +
          '概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述这是概述'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/newsPage';
</style>

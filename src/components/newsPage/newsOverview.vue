<template>
  <div>
    <el-card shadow="hover" class="newscard" v-for="(item,index) of newsList" :key="item.value">
      <div class="card-head-container">
        <a :href="`/student/news/${item.type}/${item.newsId}`" class="card-title-link"><h1 v-text="item.title" class="card-title"></h1></a>
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
  import axios from 'axios'

  export default {
    name: "newsOverview",
    data() {
      return {
        newsList: [],
      }
    },
    methods: {
      loadData() {
        let cfg = {
          url: '/api/news',
          method: 'post',
          data: {
            type: this.newstype
          }
        }
        axios(cfg)
          .then((response) => {
            if (response.data.code === 'SUCCESS' && response.data.data !== null) {
              this.newsList = response.data.data
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
      this.loadData()
    },
    computed: {
      newstype() {
        return this.$route.params.newstype
      }
    },
    watch: {
      newstype() {
        this.loadData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/newsOverview';
</style>

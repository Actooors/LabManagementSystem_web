<template>
  <div class="wrapper">
    <el-card shadow="hover" class="newscard" v-for="(item,index) of newsList" :key="item.value">
      <div class="card-head-container">
        <div class="card-title">
          <a :href="`/news/${item.type}/${item.newsId}`" class="card-title-link"><h1 v-text="item.title"
                                                                                     class="card-title"></h1>
          </a>
          <div class="card-article-management" v-if="identity===3 || item.author===username">
            <el-button size="mini" type="success"
                       @click="handleOnClickEditButton(`/news/${item.type}/${item.newsId}`)" plain>编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleOnClickDeleteButton(item.newsId)" plain>删除</el-button>
          </div>
        </div>

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
    <div class="floatButton" v-if="identity===3">
      <button @click="handleOnClickPlusButton" class="el-icon-plus"></button>
    </div>
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
    computed: {
      newstype() {
        return this.$route.params.newstype
      },
      identity() {
        let identity = localStorage.getItem('identity')
        return identity ? parseInt(identity) : 0
      },
      username() {
        return localStorage.getItem('username')
      }
    },
    methods: {
      loadData() {
        let cfg = {
          url: '//localhost:8989/api/news/assignationNews',
          method: 'get',
          params: {
            type: this.newstype
          }
        }
        axios(cfg)
          .then((response) => {
            if (response.data.code === 'SUCCESS' && response.data.data !== null) {
              this.newsList = response.data.data
              // console.log(response)
            } else {
              process.env.NODE_ENV === 'development' && console.log('loadDataError', response)
            }
          })
          .catch((error) => {
            process.env.NODE_ENV === 'development' && console.log(error)
          })
      },
      handleOnClickDeleteButton(newsId) {
        this.$confirm('此操作将删除这篇文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url: '//localhost:8989/api/news/deleteNews',
            method: 'post',
            data: {
              newsId: newsId
            }
          }).then((response) => {
            if (response.data.code === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$router.push({path: '/news'})
            } else {
              this.$message.warning(`删除失败，错误提示: ${response.data.message}`)
            }
          }).catch((error) => {
            this.$message.error('删除失败，请检查网络连接！')
            process.env.NODE_ENV === 'development' && console.log(error)
          })
        }).catch((err) => {
          process.env.NODE_ENV === 'development' && console.log(err)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleOnClickEditButton(path) {
        this.$router.push({path: path, query: {mode: '1'}})
      },
      handleOnClickPlusButton() {
        this.$router.push({name: 'newNews'})
      }
    },
    mounted() {
      this.loadData()
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

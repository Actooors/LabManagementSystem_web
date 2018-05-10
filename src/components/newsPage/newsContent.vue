<template>
  <div class="wrapper">
    <article class="article">
      <header class="article-info clearfix">
        <h1 class="title">{{newsInfo.title}}</h1>
        <p class="article-author" data-hc-id="408158643ed564c72fa092180000">By
          <a href="#" :title="newsInfo.author" target="_self" itemprop="author">{{newsInfo.author}}</a>
        </p>
        <p class="article-time">
          <time :datetime="newsInfo.datetime" itemprop="datePublished" class="el-icon-date"> 发表于 {{newsInfo.datetime}}
          </time>
        </p>
      </header>
      <div class="article-content" v-html="newsInfo.content" ref="content"></div>
    </article>
  </div>
</template>

<script>
  // import 'common/katex/katex.min'
  import axios from 'axios'
  import store from 'store/store'

  export default {
    name: "newsContent",
    data() {
      return {
        newsType: '',
        newsInfo: {
          title: '',
          author: '',
          datetime: '',
          content: ''
        }
      }
    },
    methods: {
      loadData() {
        let cfg = {
          url: '/api/article',
          method: 'get',
          params: {
            type: this.$route.params.newstype,
            newsid: this.$route.params.newsid
          }
        }
        axios(cfg)
          .then((response) => {
            if (response.data.code === "SUCCESS" && response.data.data !== null) {
              this.newsInfo = response.data.data
              document.title = `${response.data.data.title} - ${store.state.defaultTitle}`
            } else {
              process.env.NODE_ENV === "development" && console.log(response.data)
              // this.$router.replace({name: 'error404'})
            }

          })
          .catch((error) => {
            process.env.NODE_ENV === "development" && console.log(error)
            // this.$router.replace({name: 'error404'})
          })
      }
    },
    mounted() {
      // katex.render("L_{0m}^{k+1}=\\min\\{L_{01}^k+l_{1m},L_{02}^k+l_{2m},L_{03}^k+l_{3m},...,L_{0(n-1)}^k+l_{(n-1)m}\\}", this.$refs.content);
      this.loadData()
    },
    computed: {
      watchNeeds() {
        return this.$route.params.newstype + this.$route.params.newsid
      }
    },
    watch: {
      watchNeeds() {
        this.loadData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/newsContent';
</style>
<style lang="stylus">
  @import '../../common/css/article/style.styl';
</style>
<style>
  @import '../../common/katex/katex.min.css';
</style>

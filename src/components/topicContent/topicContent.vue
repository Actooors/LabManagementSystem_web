<template>
  <div class="page-wrapper">
    <div class="content">
      <div class="wrapper">
        <div id="nornal-window" v-show="editMode===false">
          <article class="article">
            <header class="article-info clearfix">
              <div class="author-info-block">
                <router-link class="avatar" :to="{name:'/profile',query:{uid:newsInfo.author.uid}}">
                  <img :src="newsInfo.authorAvatar">
                </router-link>
                <div class="author-info-box">
                  <div>
                    <router-link :to="{path:'/profile',query:{uid:newsInfo.author.uid}}" class="name">
                      {{newsInfo.author.name}}
                    </router-link>
                  </div>
                  <time :datetime="newsInfo.datetime" itemprop="datePublished" class="publish-time">
                    {{rTime(newsInfo.datetime)}}
                  </time>
                </div>
              </div>
              <h1 class="title">{{newsInfo.title}}</h1>
            </header>
            <div class="article-content" v-html="newsInfo.content" ref="content"></div>
          </article>
        </div>
        <div id="edit-window" v-if="editMode">
          <quillEditor
            v-model="editContent" style="height: 90%">
          </quillEditor>
        </div>
        <CollapsePanel class="sidebar-right"
                       @click.native="handleOnMouseClick(false,'title');handleOnMouseClick(false,'type')"
                       :show-close=true @onclose="handleOnClickClosePanel">
          <div class="panelContent">
            <div class="panel-row" @click="handleOnMouseClick(true,'title')">
              <p class="panel-para" v-if="panelEditable.title===false">
                <label class="labelfont">标题</label>{{panelInfo.title}}
              </p>
              <el-input class="panel-para"
                        size="mini"
                        v-model="panelInfo.title"
                        v-else>
                <label slot="prefix" class="panel-label">标题</label>
              </el-input>
            </div>
            <div class="panel-row" @click="handleOnMouseClick(true,'type')">
              <p class="panel-para" v-if="panelEditable.type===false">
                <label class="labelfont">分类</label>{{panelInfo.type}}
              </p>
              <el-input class="panel-para"
                        size="mini"
                        v-model="panelInfo.type"
                        v-else>
                <label slot="prefix" class="panel-label">分类</label>
              </el-input>
            </div>
            <div class="bottom-operaton">
              <el-button size="mini" @click="handleClickSaveBtn">保存修改</el-button>
              <el-button size="mini" :type="editMode?'danger':''" @click="handleClickEditBtn">{{editMode?'退出编辑':'编辑文章'}}
              </el-button>
            </div>
          </div>
        </CollapsePanel>
      </div>
    </div>
    <div class="content" id="comment">
      <div class="wrapper">
        <div class="comment-form author-info-block">
          <div class="avatar">
            <img :src="personalInfo.avatar">
          </div>
          <div class="comment-box">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2}"
              resize="none"
              placeholder="说说你的看法"
              v-model="commentContent"
              @focus="handleOnCommentInputFocus">
            </el-input>
            <div class="commit-submit" v-show="commentExtend">
              <el-button size="medium" type="primary" class="comment-submit-btn">评论</el-button>
            </div>
          </div>
        </div>

        <ul class="comment-list">
          <li class="comment-list-item" v-for="(item, index) in commentList">
            <router-link class="avatar-small" :to="{name:'profile'}">
              <img :src="item.avatar">
            </router-link>
            <div class="content-box">
              <router-link :to="{path:'/profile'}" class="comment-name">{{item.username}}</router-link>
              <div class="comment-content">
                <span class="comment-content-span">{{item.content}}</span>
              </div>
              <div class="comment-action">
                <button :class="{'comment-action-item btn-like':true,'icon-liked':item.liked}"
                        @click="handleOnClickLikeButton(index)">
                  <i class="el-icon-caret-top"></i>
                  <span>{{item.like}}</span>
                </button>
                <div class="comment-action-item">
                  {{rTime(item.time)}}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // import 'common/katex/katex.min'
  import axios from 'axios'
  import store from 'store/store'
  import {mapState} from 'vuex'
  import CollapsePanel from 'base/collapsePanel/collapsePanel'
  import {Option, Select} from 'iview'

  // require styles
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  import relativeTime from '../../common/js/relativeTime'

  // import ElInputCus from 'base/inputCus/inputCus'
  export default {
    store,
    name: "topicContent",
    components: {
      CollapsePanel,
      Select,
      Option,
      quillEditor
    },
    data() {
      return {
        // 利用vue-router传参
        newsType: '',
        newsInfo: {
          title: '',
          author: {
            name: '',
            uid: 1,
          },
          authorAvatar: '',
          datetime: '',
          content: ''
        },
        personalInfo: {
          avatar: 'http://avatars2.githubusercontent.com/u/30586220?s=400&u=f64b162702f2020f7be850ec132aec407ee502ff&v=4'
        },
        panelEditable: {
          title: false,
          type: false
        },
        panelInfo: {
          title: '',
          type: ''
        },
        clickTimer: {
          title: null,
          type: null
        },
        editMode: false,
        editContent: null,
        commentExtend: false,
        commentContent: '',
        commentList: [{
          commentId: 0,
          avatar: 'https://user-gold-cdn.xitu.io/2018/5/24/163904f56a0d5667?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
          username: '徐文',
          content: '看完了, 我说没鸽吧. 嗯……我觉得这个话题还是阔以',
          time: '2018-05-24 19:18:00',
          like: 18,
          liked: false
        }, {
          commentId: 1,
          avatar: 'https://user-gold-cdn.xitu.io/2018/5/24/163904f56a0d5667?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
          username: '徐文',
          content: '等我好好看看这个话题哈, 别着急, 我读得比较慢, 你先等我一下, 我一定不鸽你, 我看完就回复, 真的. 从前有座山山上有座庙庙里有个老和尚和小和尚在讲故事.',
          time: '2018-04-17 13:18:00',
          like: 37,
          liked: false
        }, {
          commentId: 2,
          avatar: 'https://user-gold-cdn.xitu.io/2018/5/24/163904f56a0d5667?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
          username: '徐文',
          content: '等我好好看看这个话题哈, 别着急, 我读得比较慢, 你先等我一下, 我一定不鸽你, 我看完就回复, 真的. 从前有座山山上有座庙庙里有个老和尚和小和尚在讲故事.',
          time: '2018-04-17 13:18:00',
          like: 37,
          liked: false
        }, {
          commentId: 3,
          avatar: 'https://user-gold-cdn.xitu.io/2018/5/24/163904f56a0d5667?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
          username: '徐文',
          content: '等我好好看看这个话题哈, 别着急, 我读得比较慢, 你先等我一下, 我一定不鸽你, 我看完就回复, 真的. 从前有座山山上有座庙庙里有个老和尚和小和尚在讲故事.',
          time: '2018-04-17 13:18:00',
          like: 37,
          liked: false
        }, {
          commentId: 4,
          avatar: 'https://user-gold-cdn.xitu.io/2018/5/24/163904f56a0d5667?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
          username: '徐文',
          content: '等我好好看看这个话题哈, 别着急, 我读得比较慢, 你先等我一下, 我一定不鸽你, 我看完就回复, 真的. 从前有座山山上有座庙庙里有个老和尚和小和尚在讲故事.',
          time: '2018-04-17 13:18:00',
          like: 37,
          liked: false
        }, {
          commentId: 5,
          avatar: 'https://user-gold-cdn.xitu.io/2018/5/24/163904f56a0d5667?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
          username: '徐文',
          content: '等我好好看看这个话题哈, 别着急, 我读得比较慢, 你先等我一下, 我一定不鸽你, 我看完就回复, 真的. 从前有座山山上有座庙庙里有个老和尚和小和尚在讲故事.',
          time: '2018-04-17 13:18:00',
          like: 37,
          liked: false
        }, {
          commentId: 6,
          avatar: 'https://user-gold-cdn.xitu.io/2018/5/24/163904f56a0d5667?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
          username: '徐文',
          content: '等我好好看看这个话题哈, 别着急, 我读得比较慢, 你先等我一下, 我一定不鸽你, 我看完就回复, 真的. 从前有座山山上有座庙庙里有个老和尚和小和尚在讲故事.',
          time: '2018-04-17 13:18:00',
          like: 37,
          liked: false
        }]
      }
    },
    methods: {
      loadData() {
        axios({
          url: '//localhost:8081/api/topic',
          method: 'get',
          params: {
            topicId: this.$route.params.topicid
          }
        }).then((response) => {
          if (response.data.code === "SUCCESS" && response.data.data !== null) {
            // console.log(response.data.data)
            this.newsInfo = response.data.data
            this.panelInfo.type = response.data.data.type
            this.panelInfo.title = response.data.data.title
            this.editMode = this.$route.query.hasOwnProperty('mode') && this.$route.query.mode === '1'
            document.title = `${response.data.data.title} - ${this.defaultTitle}`
            if (this.editMode) {
              this.editContent = this.newsInfo.content
              this.setEditorHeight()
            }
            else {
              this.editContent = null
            }
          } else {
            process.env.NODE_ENV === "development" && console.log(response.data)
            // this.$router.replace({name: 'error404'})
          }
          //获取到之后重新定位过来(#comment)
          if (location.hash.charAt(0) === '#')
            setTimeout(() => {
              document.getElementById(location.hash.substring(1)).scrollIntoView()
            }, 200)
        }).catch((error) => {
          if (location.hash.charAt(0) === '#')
            setTimeout(() => {
              document.getElementById(location.hash.substring(1)).scrollIntoView()
            }, 200)
          process.env.NODE_ENV === "development" && console.log(error)
          // this.$router.replace({name: 'error404'})
        })

        // this.editMode = false
        // this.editContent = null

      },
      handleOnMouseEnterPanel(enter, component) {
        this.panelEditable[component] = enter
      },
      handleOnMouseClick(state, component) {
        if (this.clickTimer[component] && state === false) {
          return
        }
        // console.log(state, component[component])
        clearTimeout(this.clickTimer[component])
        this.clickTimer[component] = setTimeout(() => {
          this.panelEditable[component] = state
          this.clickTimer[component] = null
        }, 10)
      },
      handleClickSaveBtn() {
        this.$notify({
          title: '提示',
          message: "文章已成功保存！"
        })
        // if (this.editMode)
        //   console.log("编辑模式下点击了保存")
        // else
        //   console.log("普通模式下点击了保存")
      },
      handleClickEditBtn() {
        this.editMode = !this.editMode
        this.$router.push({path: this.$route.fullPath, query: {mode: this.editMode ? '1' : '0'}})
      },
      handleOnClickClosePanel() {
        this.$confirm('此操作将删除这篇文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      setEditorHeight() {
        // document.getElementById()
        this.$nextTick(() => {
          let e = document.getElementById('edit-window')
          if (e)
            e.style.height = `${window.innerHeight - 200}px`;
        })
      },
      handleOnCommentInputFocus() {
        this.commentExtend = true
      },
      handleOnClickLikeButton(index) {
        if (this.commentList[index].liked) {
          this.commentList[index].like--;
        } else {
          this.commentList[index].like++;
        }
        this.commentList[index].liked = !this.commentList[index].liked
      },
      rTime(t) {
        return relativeTime(t)
      }
    },
    created() {
      this.loadData()
    },
    mounted() {
      // console.log('editmode:', this.editMode, this.$route)
      // katex.render("L_{0m}^{k+1}=\\min\\{L_{01}^k+l_{1m},L_{02}^k+l_{2m},L_{03}^k+l_{3m},...,L_{0(n-1)}^k+l_{(n-1)m}\\}", this.$refs.content);
      var timer = null

      window.onresize = () => {
        if (!this.editMode)
          return
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.setEditorHeight()
        }, 100)
      }
    },
    computed: {
      watchNeeds() {
        return this.$route.params.newstype + this.$route.params.newsid
      },
      ...mapState(['defaultTitle']),
      query() {
        return this.$route.query
      }
    },
    watch: {
      watchNeeds() {
        this.loadData()
      },
      query(val) {
        this.editMode = this.$route.query.hasOwnProperty('mode') && this.$route.query.mode === '1'
        this.editContent = this.editContent !== null ? this.editContent : this.newsInfo.content
        this.setEditorHeight()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/topicContent.scss';
</style>
<style lang="stylus">
  @import '../../common/css/article/style.styl';
</style>
<style lang="scss">
  //UI框架自定义修正
  @import '../../common/katex/katex.min.css';

  .el-input__inner {
    padding-left: 42px !important;
  }

  .ivu-select-single {
    height: 35px !important;
    display: flex;
    align-items: center;
  }

  .ivu-select-selected-value, .ivu-select-selected-value {
    height: 28px !important;
  }

  .ivu-select-selection {
    height: 28px !important;
    width: 125px;
  }

  .comment-form {
    .el-textarea__inner {
      overflow: hidden !important;
    }
    .comment-submit-btn {
      background-color: #007fff !important;
      border-radius: 2px !important;
      &:hover {
        background-color: #0371df !important;
      }
    }
  }
</style>


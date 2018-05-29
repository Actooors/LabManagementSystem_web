<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="nav">
        <img v-lazy="profile.avatar">
        <div class="nav-item">
          <i class="el-icon-edit-outline"></i>
          <router-link :to="{name:'newTopic'}" class="share-item">写话题</router-link>
        </div>
        <div class="nav-item">
          <i class="el-icon-share"></i>
          <span class="share-item" :data-clipboard-text="href">分享链接</span>
        </div>
      </div>

      <ul class="topic-list">
        <router-link :to="{path: `/topic/${item.topicId}`}"
                     v-for="(item,index) in topicList" :key="item.value"
                     @mouseenter.native="hoverTopic=index"
                     @mouseleave.native="hoverTopic=-1">
          <li class="topic-list-item">
            <ul class="meta-list">
              <li class="meta-list-item">
                <router-link :to="{path:'/profile',query:{uid:item.author.uid}}">{{item.author.name}}
                </router-link>
              </li>
              <li class="meta-list-item">{{rTime(item.time)}}</li>
              <li class="meta-list-item">{{item.theme}}</li>
            </ul>
            <div class="topic-title">
              <router-link :to="{path:`/topic/${item.topicId}`}">{{item.title}}</router-link>
            </div>
            <ul class="topic-action-list">
              <router-link to="" tag="li" class="topic-action-list-item" @click.native="handleOnClickLikeButton(index)">
                <i :class="{'icon-xin iconfont icon':true,liked:item.liked}"></i>
                <span>{{item.like}}</span>
              </router-link>
              <router-link :to="{path:`/topic/${item.topicId}#comment`}" tag="li" class="topic-action-list-item"
                           @click.native="handleOnClickCommentButton(index)">
                <i :class="{'icon-pinglun2 iconfont icon':true,commented:item.commented}"></i>
                <span>{{item.comment}}</span>
              </router-link>
              <router-link to="" tag="li" class="share-item" v-show="hoverTopic===index"
                           :data-clipboard-text="`${href}/${item.topicId}`">
                <i class="icon-xiazai8 iconfont icon"></i>
              </router-link>
            </ul>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import ClipboardJS from 'clipboard'
  import axios from 'axios'
  import relativeTime from '../../common/js/relativeTime'

  export default {
    name: "topic",
    data() {
      return {
        profile: {
          avatar: ''
        },
        topicList: [],
        hoverTopic: -1
      }
    },
    computed: {
      href() {
        return location.href
      }
    },
    methods: {
      handleOnClickLikeButton(index) {
        if (this.topicList[index].liked) {
          this.topicList[index].like--;
        }
        else {
          this.topicList[index].like++;
        }
        this.topicList[index].liked = !this.topicList[index].liked;
        //没写then，看行不行
        axios({
          url: apiRootPath + 'topic/setTopicLiked',
          methods: 'post',
          data: {
            "topicId": this.topicList[index].topicId
          }
        })
      },
      handleOnClickCommentButton(index) {

      },
      rTime(t) {
        return relativeTime(t)
      },
      loadData() {
        //初始化话题列表
        axios({
          url: apiRootPath + 'topic/allTopicInfo',
          method: 'get'
        }).then((response) => {
          if (response.data.code === "SUCCESS")
            this.topicList = response.data.data
        }).catch((error) => {
          process.env.NODE_ENV === 'development' && console.error(error)
        })

        //初始化个人信息
        if (localStorage.getItem('token'))
          axios({
            url: apiRootPath + 'user/userMessage',
            method: 'get',
          }).then((response) => {
            if (response.data.code === 'SUCCESS')
              this.profile.avatar = response.data.data.avatar
          }).catch((error) => {
            process.env.NODE_ENV === 'development' && console.error(error)
          })
      }
    },
    created() {
      this.loadData()
    },
    mounted() {
      let clipboard = new ClipboardJS('.share-item');
      let that = this
      clipboard.on('success', function (e) {
        // console.info('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
        that.$message({
          message: '链接已复制到剪切板!',
          type: 'success'
        });
        e.clearSelection();
      });

      clipboard.on('error', function (e) {
        that.$message({
          message: '复制链接失败, 请尝试手动分享!',
          type: 'warning'
        });
        // console.error('Action:', e.action);
        // console.error('Trigger:', e.trigger);
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/css/topic";
</style>
<style>
</style>

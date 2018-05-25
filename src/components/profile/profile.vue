<template>
  <div class="page-wrapper">
    <div class="container-content" ref="containerContent">
      <div class="username">{{profile.username}}</div>
      <hr/>
      <div class="profile">
        <div class="avatar">
          <img :src="profile.avatar" class="avatar-img">
        </div>
        <div class="profile-text">
          <div class="profile-text-col">
            <div class="profile-text-row">
              <p class="text-label">姓名</p>
              <p class="text-value">{{profile.username}}</p>
            </div>
            <div class="profile-text-row">
              <p class="text-label">学院/部门</p>
              <p class="text-value">{{profile.department}}</p>
            </div>
            <div class="profile-text-row">
              <p class="text-label">手机号</p>
              <p class="text-value">{{profile.phoneNumber}}</p>
            </div>
            <div class="profile-text-row">
              <p class="text-label">注册时间</p>
              <p class="text-value">{{profile.registerDatetime}}</p>
            </div>
            <div class="profile-text-row">
              <p class="text-label">最后登录</p>
              <p class="text-value">{{profile.lastLoginDatetime}}</p>
            </div>
          </div>
          <div class="profile-text-col" id="big-col-right">
            <p class="text-label-big">个人简介</p>
            <p class="text-value-big">{{profile.introduction}}</p>
          </div>
        </div>
      </div>
      <div id="big-col-bottom">
        <p class="text-label-big">个人简介</p>
        <p class="text-value-big" :style="introStyle">{{profile.introduction}}</p>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: "profile",
    data() {
      return {
        profile: {
          username: '莫之章',
          avatar: 'https://avatars2.githubusercontent.com/u/30586220?s=400&u=f64b162702f2020f7be850ec132aec407ee502ff&v=4',
          department: '计算机学院',
          phoneNumber: '18916999181',
          registerDatetime: '2018.05.09　20:04:23',
          lastLoginDatetime: '2018.05.09　21:15:02',
          introduction: '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。' +
          '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。' + '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。' +
          '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。' + '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。' +
          '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。' + '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。' +
          '这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。这是简介。'
        },
        introStyle: 'height:100px'
      }
    },
    methods: {
      setHeight() {
        // console.log(`height:${this.$refs.containerContent.offsetHeight - 460}px`)
        this.introStyle = `height:${this.$refs.containerContent.offsetHeight - 470}px`
      }
    },
    created() {
      let query = this.$route.query
      let uid = null
      if (query.hasOwnProperty('uid')) {
        uid = query.uid
      }
      // axios({
      //   url: '',
      //   method: '',
      //   query: {uid: uid}
      // }).then((response) => {
      //
      // })
    },
    mounted() {
      let timer = null
      this.setHeight()
      window.onresize = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.setHeight()
        }, 100)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/profile';
</style>

<style>
  html, html > body, #app, #app > div {
    height: 100%;
  }
</style>

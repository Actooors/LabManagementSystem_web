<template>
  <div class="page-wrapper">
    <div class="container-content" ref="containerContent">
      <div class="username">{{profile.userName}}</div>
      <hr/>
      <div class="profile">
        <div class="avatar">
          <img v-lazy="profile.avatar" class="avatar-img">
        </div>
        <div class="profile-text">
          <div class="profile-text-col">
            <div class="profile-text-row">
              <p class="text-label">姓名</p>
              <p class="text-value">{{profile.userName}}</p>
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
          username: '',
          avatar: '',
          department: '',
          phoneNumber: '',
          registerDatetime: '',
          lastLoginDatetime: '',
          introduction: ''
        },
        introStyle: 'height:100px'
      }
    },
    methods: {
      setHeight() {
        // console.log(`height:${this.$refs.containerContent.offsetHeight - 460}px`)
        this.introStyle = `height:${this.$refs.containerContent.offsetHeight - 470}px`
      },
      initData() {
        let query = this.$route.query
        let uid = null
        if (query.hasOwnProperty('uid')) {
          uid = query.uid
        }
        axios({
          url: apiRootPath+'user/userMessage',
          method: 'get',
          query: {uid: uid}
        }).then((response) => {
          if (response.data.code === 'SUCCESS')
            this.profile = response.data.data
          else
            this.$router.replace({name: 'error404'})
        }).catch((error)=>{
          console.log(error)
          this.$router.replace({name: 'error404'})
        })
      }
    },
    created() {
      this.initData()
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

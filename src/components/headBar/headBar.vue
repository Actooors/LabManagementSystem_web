<template>
  <div id="headbar">
    <el-menu
      :default-active="activeIndex"
      class="HeadBar"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      :background-color="solid?'rgb(84, 92, 100)':'rgba(84, 92, 100, .5)'"
      style="transition: background-color .5s ease-in-out"
      id="headbar-ul"
    >
      <el-menu-item index="/index">首页</el-menu-item>
      <el-submenu index="1" :show-timeout=50 :hide-timeout=50>
        <template slot="title">新闻</template>
        <el-menu-item index="/news/labnews">实验室动态</el-menu-item>
        <el-menu-item index="/news/academic">学界重要新闻</el-menu-item>
        <el-menu-item index="/news/others">其他新闻</el-menu-item>
      </el-submenu>
      <el-menu-item index="/topic">话题</el-menu-item>
      <el-menu-item index="notifications">
        <router-link :to="{name: 'notifications'}">消息中心<span class="badge">5</span></router-link>
      </el-menu-item>
      <el-menu-item index="/contactus">联系我们</el-menu-item>
      <menu-item-cus item="5" class="align-right" :click-enable=false>
        <div class="HeaderRight" @click="handleOnClickUsername">{{miniProfile.username}}</div>
        <div slot="title" v-if="miniProfile.loginState">
          <p>欢迎，这是您第 {{miniProfile.loginTimes}} 次登录</p>
          <div class="link">
            <span @click="handleOnClickLogoutButton" class="link">注销</span>
            <a href="/profile" class="link">个人资料</a>
          </div>
        </div>
      </menu-item-cus>
    </el-menu>


    <el-dialog title="Login" :visible.sync="dialogLoginVisible" width="400px" center>
      <el-form v-model="loginForm">
        <el-form-item label="工号">
          <el-input v-model="loginForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btn-login" align="center">
          <el-button type="primary" @click="handleOnClickLoginButton" plain>登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>

</template>

<script>
  import MenuItemCus from 'base/menuItemCus/menuItemCus'
  import axios from 'axios'

  export default {
    name: "head-bar",
    components: {
      MenuItemCus
    },
    props: {
      keyHeight: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        activeIndex: '',
        solid: false,
        dialogLoginVisible: false,
        loginForm: {
          uid: '',
          password: ''
        },
        miniProfile: {
          loginState: false,//计算属性hasLogin不会实时渲染,
          username: '',
          loginTimes: 0
        }

      }
    },
    methods: {
      updateMiniProfile() {
        //买个教训，以后再也不胡乱用computed了，还是这么搞比较好。两个小时，呵呵哒
        this.miniProfile.loginState = !!localStorage.getItem('token')
        let times = window.localStorage.getItem('loginTimes')
        this.miniProfile.loginTimes = times ? times : 1
        let username = window.localStorage.getItem('username')
        this.miniProfile.username = username ? username : '未登录'
      },
      handleSelect(key, keyPath) {
        this.activeIndex = key
        this.$router.push({path: key})
      },
      adjustHeadBarOnScroll() {
        let scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        // console.log(document.body.scrollTop, document.documentElement.scrollTop)
        if (this.solid && scrollTop <= this.keyHeight) {
          this.solid = false
        } else if (!this.solid && scrollTop > this.keyHeight) {
          this.solid = true
        }
      },
      handleOnClickLogoutButton() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('uid')
        localStorage.removeItem('identity')
        localStorage.removeItem('loginTimes')
        this.$message({
          type: 'success',
          message: '注销成功!'
        });
        this.updateMiniProfile()
      },
      handleOnClickLoginButton() {
        axios({
          url: '//localhost:8989/api/login',
          method: 'post',
          data: {
            userId: this.loginForm.uid,
            passWord: this.loginForm.password
          }
        }).then((response) => {
          if (response.data.code === 'SUCCESS') {
            this.dialogLoginVisible = false
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('username', response.data.data.username)
            localStorage.setItem('uid', response.data.data.uid)
            localStorage.setItem('identity', response.data.data.identity)
            localStorage.setItem('loginTimes', response.data.data.loginTimes)
            this.updateMiniProfile()

            this.$message({
              type: 'success',
              message: '登录成功!'
            });
          } else {
            this.$message({
              type: 'warning',
              message: '登录失败，请检查工号和密码是否正确！'
            });
          }
        }).catch((error) => {
          this.$message({
            type: 'warning',
            message: '登录失败，请检查网络连接！'
          });
          console.log(error)
        })
      },
      handleOnClickUsername() {
        if (!this.miniProfile.loginState) {
          this.dialogLoginVisible = true
        }
      }
    },
    watch: {
      keyHeight() {
        this.adjustHeadBarOnScroll()
      },
    },
    created() {
      this.activeIndex = this.$route.fullPath;
    },
    mounted() {
      this.adjustHeadBarOnScroll()
      document.body.onscroll = () => {
        this.adjustHeadBarOnScroll()
      }

      this.updateMiniProfile()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/headBar.scss';
</style>

<style lang="scss">
  @import '../../common/css/headBar_global.scss';
</style>

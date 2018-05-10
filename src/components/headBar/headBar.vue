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
      <el-menu-item index="/student/index">首页</el-menu-item>
      <el-submenu index="1" :show-timeout=50 :hide-timeout=50>
        <template slot="title">新闻</template>
        <el-menu-item index="/student/news/labnews">实验室动态</el-menu-item>
        <el-menu-item index="/student/news/academic">学界重要新闻</el-menu-item>
        <el-menu-item index="/student/news/others">其他新闻</el-menu-item>
      </el-submenu>

      <el-submenu index="2" :show-timeout=50 :hide-timeout=50>
        <template slot="title">话题</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="notifications">
        <router-link :to="{name: 'notifications'}">消息中心<span class="badge">5</span></router-link>
      </el-menu-item>
      <el-menu-item index="/student/contactus">联系我们</el-menu-item>

      <menu-item-cus item="5" class="align-right" :click-enable=false>
        <div class="HeaderRight">{{username}}</div>
        <div slot="title">
          <p>这是title</p>
          <p>hello</p>
          <a href="https://www.baidu.com" style="color: #fff">个人设置</a>
        </div>
      </menu-item-cus>
    </el-menu>
  </div>

</template>

<script>
  import MenuItemCus from '../../base/menuItemCus/menuItemCus'

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
        username: '沐雨之风',
        activeIndex: '',
        solid: false
      }
    },
    methods: {
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
      }
    },
    watch: {
      keyHeight() {
        this.adjustHeadBarOnScroll()
      }
    },
    created() {
      this.activeIndex = this.$route.fullPath;
    },
    mounted() {
      this.adjustHeadBarOnScroll()
      document.body.onscroll = () => {
        this.adjustHeadBarOnScroll()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/headBar.scss';
</style>

<style lang="scss">
  @import '../../common/css/headBar_global.scss';
</style>

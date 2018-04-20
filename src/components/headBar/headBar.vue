<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="HeadBar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!--index与router的name相同-->
      <el-menu-item index="index">首页</el-menu-item>
      <el-menu-item index="newsPage">新闻</el-menu-item>
      <el-submenu index="2">
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
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>

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
    data() {
      return {
        username: '沐雨之风',
        activeIndex: '1',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({name: key})
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/css/headBar.scss';
</style>

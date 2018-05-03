<template>
<div>
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">新闻</el-menu-item>
        <el-menu-item index="2">通知</el-menu-item>
        <el-menu-item index="3">导航</el-menu-item>
        <el-submenu index="4">
          <template slot="title">话题</template>
          <el-menu-item index="4-1">查看话题</el-menu-item>
          <el-menu-item index="4-2">发布话题</el-menu-item>
        </el-submenu>
    </el-menu>
</div>
</template>

<script>

export default {
  name: "navigation",
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.container{
  height: max-content;
  background-color: beige;
  border: 1px solid #eee;
}
</style>

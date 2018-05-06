<template>
  <div>
    <el-menu default-active="1-4-1" class="sidebar-menu" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" @mouseover.native="handleMouseOverMenu(false)"
             @mouseout.native="handleMouseOverMenu(true)">
      <el-menu-item index="1">
        <i class="el-icon-setting"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    props: {
      mouseover: {
        type: Function,
        require: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleMouseOverMenu(out) {
        this.isCollapse = out
        this.$emit('mouseover', out)
      }

    }
  }
</script>

<style lang="scss">
  .sidebar-menu:not(.el-menu--collapse) {
    width: 200px;
    /*min-height: 400px;*/
  }

  .sidebar-menu {
    border: solid 1px #e6e6e6;
  }
</style>

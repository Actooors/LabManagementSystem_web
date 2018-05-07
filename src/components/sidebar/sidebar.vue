<template>
  <div>
    <el-menu default-active="1-4-1" class="sidebar-menu" @select="handleSelect"
             :collapse="isCollapse" @mouseover.native="handleMouseOverMenu(false)"
             @mouseout.native="handleMouseOverMenu(true)">
      <el-menu-item v-for="(item,index) in itemList" :index="index.toString()" :key="index.key">
        <i :class="item.iconClass" style="font-size: 14px"></i>
        <span slot="title" style="font-size: 12px">{{item.title}}</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
  export default {
    props: {
      mouseover: {
        type: Function,
        require: false
      },
      itemList: {
        type: Array,
        default() {
          return [{
            iconClass: 'el-icon-document',
            title: '侧边栏标题',
            routePath: '/'
          }, {
            iconClass: 'el-icon-document',
            title: '侧边栏标题',
            routePath: '/'
          }, {
            iconClass: 'el-icon-document',
            title: '侧边栏标题',
            routePath: '/'
          }]
        }
      }
    },
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleSelect(index) {
        this.$router.push({path: this.itemList[parseInt(index)].routePath})
      },
      handleMouseOverMenu(out) {
        this.isCollapse = out
        this.$emit('mouseover', out)
      }
    },

  }
</script>

<style lang="scss">
  .sidebar-menu:not(.el-menu--collapse) {
    width: 250px;
    /*min-height: 400px;*/
  }

  .sidebar-menu {
    border: solid 1px #e6e6e6;
  }
</style>

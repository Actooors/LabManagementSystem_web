<template>
  <div>
    <el-menu :default-active="activeMenuItem" class="sidebar-menu"
             :collapse="isCollapse" @mouseover.native="handleMouseOverMenu(false)"
             @mouseout.native="handleMouseOverMenu(true)" router>
      <el-menu-item v-for="(item,index) in itemList" :index="`/news/${item.type}/${item.newsId}`"
                    :key="index.key" class="menu-item">
        <i :class="item.iconClass" style="font-size: 14px;"></i>
        <span slot="title" style="font-size: 12px">{{item.title}}</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
      },
      mouseover: {
        type: Function,
        require: false
      },
      itemList: {
        type: Array,
        default() {
          return [{
            "iconClass": "el-icon-document",
            "title": "侧边栏标题",
            "type": "academic",
            "newsId": "100001"
          }, {
            "iconClass": "el-icon-document",
            "title": "侧边栏标题",
            "type": "labnews",
            "newsId": "100002"
          }, {
            "iconClass": "el-icon-document",
            "title": "侧边栏标题",
            "type": "labnews",
            "newsId": "100003"
          }]
        }
      }
    },
    watch: {
      // 第二个参数可以省略
      value(val) {
        if (val) {
          // process.env.NODE_ENV === "development" && console.log('sidebar - update:', val, `/news/${this.itemList[0].type}/${this.itemList[0].newsId}`)
          this.activeMenuItem = val
          // console.log("val")
          // console.log(val)
        }
      },
      activeMenuItem(val) {
        this.$emit('input', val)
      }
    },
    data() {
      return {
        isCollapse: true,
        activeMenuItem: ''
      };
    },
    methods: {
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
    .menu-item {
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
    }
  }

  .sidebar-menu {
    border: solid 1px #e6e6e6;
  }
</style>

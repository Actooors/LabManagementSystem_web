<template>
  <div :class="{'collapse-panel':true,'is-collapsed':isCollapse}"
       @mouseenter="isCollapse=false"
       @mouseleave="isCollapse=true">
    <span class="btn-close icon-guanbi iconfont icon" v-if="showClose && isCollapse===false"
          @click="$emit('onclose')"></span>
    <i :class="`${iconClass} collapse-icon`" v-show="isCollapse"></i>
    <div class="panel-content" v-show="isCollapse===false">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "collapsePanel",
    props: {
      iconClass: {
        type: String,
        default: "el-icon-edit-outline"
      },
      showClose: {
        type: Boolean,
        default: false
      },
      onclose: {
        type: Function
      }
    },
    data() {
      return {
        isCollapse: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/css/collapsePanel";
</style>

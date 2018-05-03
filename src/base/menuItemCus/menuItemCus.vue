<template>
  <li class="el-menu-item"
      role="menuitem"
      tabindex="-1"
      :style="[paddingStyle, itemStyle, { backgroundColor }]"
      :class="{
      'is-active': active,
      'is-disabled': disabled
    }"
      @click="handleClick"
      @mouseenter="onMouseEnter"
      @focus="onMouseEnter"
      @blur="onMouseLeave"
      @mouseleave="onMouseLeave"
  >
    <el-tooltip
      v-if="parentMenu.$options.componentName === 'ElMenu' && $slots.title"
      effect="dark"
      placement="bottom">
      <div slot="content">
        <slot name="title"></slot>
      </div>
      <div
        style="position: relative;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box">
        <slot></slot>
      </div>
    </el-tooltip>
    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>
<script>
  import Menu from 'element-ui/packages/menu/src/menu-mixin.js';
  // import ElTooltip from 'element-ui/packages/tooltip';
  import Emitter from 'element-ui/src/mixins/emitter.js';

  export default {
    name: 'MenuItemCus',

    componentName: 'MenuItemCus',

    mixins: [Menu, Emitter],

    // components: {ElTooltip},

    props: {
      index: {
        type: String,
        default: ""
      },
      route: [String, Object],
      disabled: Boolean,
      clickEnable:{
        type: Boolean,
        default: true
      }
    },
    computed: {
      active() {
        return this.index === this.rootMenu.activeIndex;
      },
      hoverBackground() {
        return this.rootMenu.hoverBackground;
      },
      backgroundColor() {
        return this.rootMenu.backgroundColor || '';
      },
      activeTextColor() {
        return this.rootMenu.activeTextColor || '';
      },
      textColor() {
        return this.rootMenu.textColor || '';
      },
      mode() {
        return this.rootMenu.mode;
      },
      itemStyle() {
        const style = {
          color: this.active ? this.activeTextColor : this.textColor
        };
        if (this.mode === 'horizontal' && !this.isNested) {
          style.borderBottomColor = this.active
            ? (this.rootMenu.activeTextColor ? this.activeTextColor : '')
            : 'transparent';
        }
        return style;
      },
      isNested() {
        return this.parentMenu !== this.rootMenu;
      }
    },
    methods: {
      onMouseEnter() {
        if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
        this.$el.style.backgroundColor = this.hoverBackground;
      },
      onMouseLeave() {
        if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
        this.$el.style.backgroundColor = this.backgroundColor;
      },
      handleClick() {
        if (this.clickEnable == false)
          return
        if (!this.disabled) {
          this.dispatch('ElMenu', 'item-click', this);
          this.$emit('click', this);
        }
      }
    },
    created() {
      this.parentMenu.addItem(this);
      this.rootMenu.addItem(this);
    },
    beforeDestroy() {
      this.parentMenu.removeItem(this);
      this.rootMenu.removeItem(this);
    }
  }
</script>

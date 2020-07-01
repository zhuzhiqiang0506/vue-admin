<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { ref, computed } from "@vue/composition-api";
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      // 定义接收的值类型
      type: String
    },
    className: {
      // 定义接收的值类型
      type: String
    }
  },
  setup(props) {
    const msg = ref("手把手撸码前端");

    /**
     * computed 监听属性变化，并计算属性
     * 计算属性 得出最终结果 并返回
     */
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>

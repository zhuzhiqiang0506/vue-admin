<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Compoents/Header";
import LayoutMain from "./Compoents/Main";
import LayoutNav from "./Compoents/Nav";

import { computed } from "@vue/composition-api";

export default {
  name: "layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  setup(props, context) {
    const menuStatus = computed(() => context.root.$store.state.app.isCollapse);
    return {
      menuStatus
    };
  }
};
</script>

<style lang="scss" scoped>
#layout {
  background-color: #f7f7f7;
}
</style>

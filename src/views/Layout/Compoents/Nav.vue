<template>
  <div id="nav-wrap">
    <h1 class="logo">
      <img src="../../../assets/logo.png" />
    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!--            <i :class="item.meta.icon" />-->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <template v-for="subItem in item.children">
            <el-menu-item
              v-if="!subItem.hidden"
              :key="subItem.id"
              :index="subItem.path"
              >{{ subItem.meta.name }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";
import "../../../styles/config.scss";

export default {
  name: "navMenu",
  setup(props, context) {
    /**
     * 数据
     */
    const routers = reactive(context.root.$router.options.routes);

    /**
     * 函数
     */

    /**
     * computed 监听
     */
    const isCollapse = computed(() => context.root.$store.state.app.isCollapse);
    // const isCollapse = computed(() => {
    //   return context.root.$store.state.isCollapse;
    // });

    return {
      isCollapse,
      routers
    };
  }
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  img {
    margin: 30px auto 25px;
    width: 90px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}

.open {
  #nav-wrap {
    width: $navMenu;
  }
}

.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 70%;
  }
  .el-submenu {
    &.is-opened {
      > .el-submenu__title {
        background-color: red;
      }
    }
  }
}
</style>

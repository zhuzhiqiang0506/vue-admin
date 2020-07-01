<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-rigth header-icon">
      <div class="face-info pull-left">
        <img
          class="mouse"
          src="../../../assets/mouse.png"
          width="50"
          height="50"
        />
      </div>
      <div class="user-info pull-left">
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="close" className="close" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";

export default {
  name: "Header",
  setup(props, context) {
    const navMenuState = () => {
      context.root.$store.commit("app/SET_COLLAPSE");
    };

    const username = computed(() => context.root.$store.state.app.username);

    const exit = () => {
      context.root.$store.dispatch("app/exit").then(() => {
        context.root.$router.push({
          name: "Login"
        });
      });
    };
    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config";

#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #ffffff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: 75px;
}

.header-icon {
  padding: 0 30px;

  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}

.pull-left {
  float: left;
}

.pull-rigth {
  float: right;
}

.user-info {
  padding: 0 30px;
  height: 100%;
  border-right: 1px solid #ededed;

  + .header-icon {
    padding: 0 30px;
  }
}

.face-info {
  padding-top: 12px;
  margin: auto;
}

.open {
  #header-wrap {
    left: $navMenu;
  }
}

.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
</style>

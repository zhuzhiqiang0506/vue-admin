<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  setup() {}
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config";

#main-wrap {
  height: 100vh;
  /*position: fixed;
              left: $navMenu;
              top: 75px;
              right: 0;
              bottom: 0;
              border: 30px solid #f7f7f7;
              border-bottom: none;
              -webkit-box-sizing: border-box;*/
}

.main-content {
  width: 100%;
  height: 100%;
  padding: $layoutHeader + 30 30px 0 $navMenu + 30;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}

.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #fff;
  @include webkit(box-sizing, border-box);
}

.open {
  .main-content {
    padding: $layoutHeader + 30 30px 0 $navMenu + 30;
  }
}

.close {
  .main-content {
    padding: $layoutHeader + 30 30px 0 $navMenuMin + 30;
  }
}
</style>

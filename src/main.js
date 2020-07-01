import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 路由守卫
import "./router/premit";
// 自定义全局方法
// import global from "./utils/global";
// 自定义全局组件
import "./icons/index";

// 富文本编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor);
// Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

// runtime
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

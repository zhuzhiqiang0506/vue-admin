import Vue from "vue";
import Vuex from "vuex";
// import Cookie from "cookie_js";
import { login } from "../api/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // || 左边为false的话 取右边的值
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
  },
  // computed
  getters: {
    // count: state => state.count + 10
    // count: function(state) {
    //   return state.count + 10;
    // }
  },
  // 必须的 同步 没有回调处理事情
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      // h5本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    }
  },
  // 可以回调 处理事情
  actions: {
    login(content, requestData) {
      return new Promise((resolve, reject) => {
        // 接口
        login(requestData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});

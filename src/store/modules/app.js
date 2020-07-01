import { login } from "../../api/login";
import {
  setToken,
  setUsername,
  getUsername,
  removeToken,
  removeUsername
} from "../../utils/app";

const state = {
  // || 左边为false的话 取右边的值
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  token: "",
  username: getUsername() || ""
};

// computed
const getters = {
  // count: state => state.count + 10
  // count: function(state) {
  //   return state.count + 10;
  // }
  // || 左边为false的话 取右边的值
  isCollapse: state => state.isCollapse
};

// 必须的 同步 没有回调处理事情
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    // h5本地存储
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
};

// 可以回调 处理事情
const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      // 接口
      login(requestData)
        .then(response => {
          let data = response.data.data;
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exit(content) {
    removeToken();
    removeUsername();
    content.commit("SET_TOKEN", "");
    content.commit("SET_USERNAME", "data.username");
    return new Promise(resolve => {
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

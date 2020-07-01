// 路由守卫
import router from "./index";
import { getToken, removeToken, removeUsername } from "../utils/app";
import store from "../store/index";

// 白名单
// indexOf 判断数组中是否存在某个指定对象
// 不存在 返回-1
const whiteRouter = ["/login"];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      removeToken();
      removeUsername();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      // 获取用户角色
      // 动态分配路由权限
      next();
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("login");
    }
    /**
     * 1.直接进入 index 的时候, 参数 to 改变成了 "/index", 触发路由指令, 会跑 beforeEach
     * 2.再一次 next 指向了 login 再次发生路由指令 再跑 beforeEach 参数 to 改变成了 "/login"
     * 3.进入白名单判断存在 执行 next() 因为没有参数 所以不会再次 beforeEach
     */
  }
});

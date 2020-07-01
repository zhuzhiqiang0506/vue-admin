import service from "../utils/request";
/**
 * 获取验证码
 */

export function getSMS(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
    // data: data , 左边的data是变量名(key)后台接收的 右边的data是接收的参数 如果两者同名 可以写成单一个即可（ES6写法）
  });
}

/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  });
}

/**
 * 注册
 */
export function register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  });
}

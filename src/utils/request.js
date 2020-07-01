import axios from "axios";
import { Message } from "element-ui";
import { getToken, getUsername } from "./app";

// 创建axios
// http://www.web-jshtml.cn/productapi

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";

const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000 // 超时
  // 网络请求接口，假设 5000
});

//添加请求拦截器
/**
 * 请求接口前，做一些数据处理
 */
service.interceptors.request.use(
  function(config) {
    //在发送请求之前做一些事情
    config.headers["Tokey"] = getToken();
    config.headers["UserName"] = getUsername();
    return config;
  },
  function(error) {
    //做一些有请求错误的事情
    return Promise.reject(error);
  }
);

//添加响应拦截器
service.interceptors.response.use(
  function(response) {
    let data = response.data;
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
    //使用响应数据返回响应；
  },
  function(error) {
    // 使用响应错误返回
    return Promise.reject(error);
  }
);

export default service;

/**
 * 使用 default
 * 文件 improt 不需要花括号
 */

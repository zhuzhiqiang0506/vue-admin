// 可以回调 处理事情
import { getCategoryAll } from "../../api/news";

const actions = {
  getInfoGategory(content, requestData) {
    return new Promise((resolve, reject) => {
      // 接口
      getCategoryAll(requestData)
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  actions
};

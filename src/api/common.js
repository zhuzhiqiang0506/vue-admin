import { getCategory, getCategoryAll } from "./news";
import { reactive } from "@vue/composition-api";
import service from "../utils/request";

export function common() {
  const categoryItem = reactive({
    item: []
  });
  /**
   * 获取分类
   */
  const getInfoCategory = () => {
    getCategory({})
      .then(response => {
        categoryItem.item = response.data.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * 获取全部分类
   */
  const getInfoCategoryAll = () => {
    getCategoryAll({})
      .then(response => {
        categoryItem.item = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  return {
    categoryItem,
    getInfoCategory,
    getInfoCategoryAll
  };
}

export function loadTableData(data) {
  return service.request({
    method: data.method || "post",
    url: data.url,
    data: data.data
  });
}

/**
 * 省市区
 */
export function getCityPicker(data) {
  return service.request({
    method: "post",
    url: "/cityPicker",
    data
  });
}

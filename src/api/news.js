import service from "../utils/request";

/**
 * 获取列表
 */
export function getList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}

/**
 * 删除信息
 */
export function deleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  });
}

/**
 * 修改信息
 */
export function editInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  });
}

/**
 * 新增
 */
export function add(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  });
}

/**
 * 新增子级
 */
export function addChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data
  });
}

/**
 * 编辑一级分类
 */
export function editCategoryApi(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}

/**
 * 删除分类
 */
export function deleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  });
}

/**
 * 添加一级分类
 */
export function addFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}

/**
 * 获取分类
 */
export function getCategory() {
  return service.request({
    method: "post",
    url: "/news/getCategory/"
  });
}

/**
 * 获取全部
 */
export function getCategoryAll() {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/"
  });
}

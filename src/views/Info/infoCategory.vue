<template>
  <div id="categoty">
    <el-button type="danger" @click="addFirst({ type: 'category_add' })"
      >添加一级分类</el-button
    >
    <hr
      style="margin-left: -30px;margin-right: -30px; color: #e9e9e9;margin-bottom: 30px; margin-top: 30px"
    />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categoty-wrap">
            <div class="categoty" v-for="item in category.item" :key="item.id">
              <!-- 一级分类 -->
              <h4>
                <svg-icon icon-class="minus"></svg-icon>
                {{ item.category_name }}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="
                      editCategory({
                        category: item,
                        type: 'category_edit_one'
                      })
                    "
                    round
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="success"
                    round
                    @click="
                      addChildren({
                        category: item,
                        type: 'category_edit_two'
                      })
                    "
                    >添加子级
                  </el-button>
                  <el-button
                    size="mini"
                    round
                    @click="deleteCateConfirm(item.id)"
                    >删除</el-button
                  >
                </div>
              </h4>
              <!-- 二级分类 -->
              <ul v-if="item.children">
                <li v-for="children in item.children" :key="children.id">
                  {{ children.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">
            一级分类编辑
          </h4>
          <el-form
            :label-position="labelPosition"
            label-width="140px"
            :model="form"
            class="from-wrap"
            ref="categoryForm"
          >
            <el-form-item label="一级分类名称:" v-if="category_level_one">
              <el-input
                v-model="form.categoryNameOne"
                :disabled="categoryNameOne_disable"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" v-if="category_level_two">
              <el-input
                v-model="form.categoryNameTwo"
                :disabled="categoryNameTwo_disable"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submit_button_loading"
                :disabled="submit_button_disable"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  addFirstCategory,
  deleteCategory,
  editCategoryApi,
  addChildrenCategory
} from "../../api/news";
import { ref, reactive, watch, onMounted } from "@vue/composition-api";
import { global } from "../../utils/global3.0";
import { common } from "../../api/common";

export default {
  name: "infoCategory",
  setup(props, content) {
    const { categoryItem, getInfoCategoryAll } = common();

    const { confirm } = global();

    const labelPosition = ref("right");

    const submit_button_type = ref("");
    const category_level_one = ref(true);
    const category_level_two = ref(true);
    const categoryNameOne_disable = ref(true);
    const categoryNameTwo_disable = ref(true);
    const submit_button_disable = ref(true);
    const deleteId = ref("");

    const submit_button_loading = ref(false);

    const form = reactive({
      categoryNameOne: "",
      categoryNameTwo: ""
    });

    const category = reactive({
      item: [],
      current: []
    });

    /**
     * 方法
     */
    const submit = () => {
      if (submit_button_type.value === "category_add") {
        // 添加一级分类
        addOneCategory();
      } else if (submit_button_type.value === "category_edit_one") {
        // 编辑一级分类
        editOneCategory();
      } else if (submit_button_type.value === "category_edit_two") {
        // 添加二级分类
        addTwoCategory();
      }
    };

    const addOneCategory = () => {
      if (!form.categoryNameOne) {
        content.root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return;
      }
      // 按钮加载状态
      submit_button_loading.value = true;
      addFirstCategory({
        categoryName: form.categoryNameOne
      })
        .then(response => {
          console.log(response);
          let data = response.data;
          if (data.resCode === 0) {
            content.root.$message({
              message: data.message,
              type: "success"
            });
            // 1.添加完后请求获取分类接口 2.直接push
            // 加到数据的末尾
            category.item.push(response.data.data);
            form.categoryNameOne = "";
          }
          submit_button_loading.value = false;
          form.categoryNameOne = "";
        })
        .catch(error => {
          console.log(error);
          submit_button_loading.value = false;
        });
    };

    const addTwoCategory = () => {
      if (!form.categoryNameTwo) {
        content.root.$message({
          message: "子级名称不能为空",
          type: "error"
        });
        return;
      }
      addChildrenCategory({
        categoryName: form.categoryNameTwo,
        parentId: category.current.id
      })
        .then(response => {
          let data = response.data;
          content.root.$message({
            message: data.message,
            type: "success"
          });
          form.categoryNameTwo = "";
          getInfoCategoryAll();
        })
        .catch(error => {
          console.log(error);
        });
    };

    const addFirst = params => {
      submit_button_type.value = params.type;
      category_level_one.value = true;
      category_level_two.value = false;
      categoryNameOne_disable.value = false;
      submit_button_disable.value = false;
    };

    const deleteCate = () => {
      deleteCategory({
        categoryId: deleteId.value
      })
        .then(() => {
          /**
           * splice('指定起始位置','删除多少个','替换的数据')
           * 操作数据
           * 两个参数时删除 三个参数时替换/插入
           */
          /**
           * es6 findIndex
           */
          let index = category.item.findIndex(
            item => item.id === deleteId.value
          );
          category.item.splice(index, 1);
          // let newData = category.item.filter(
          //   item => item.id !== deleteId.value
          // );
          // category.item = newData;
        })
        .catch(error => {
          console.log(error);
        });
    };

    const deleteCateConfirm = categoryID => {
      deleteId.value = categoryID;
      confirm({
        content: "确认删除信息，是否继续?",
        fn: deleteCate,
        catchFn: () => {
          deleteId.value = "";
        }
      });
    };

    // 编辑 改变界面 type
    const editCategory = params => {
      submit_button_type.value = params.type;
      categoryNameOne_disable.value = false;
      category_level_two.value = false;
      submit_button_disable.value = false;
      form.categoryNameOne = params.category.category_name;
      // 存储当前的数据对象
      category.current = params.category;
    };

    const addChildren = params => {
      submit_button_type.value = params.type;
      category_level_one.value = true;
      category_level_two.value = true;
      categoryNameOne_disable.value = true;
      categoryNameTwo_disable.value = false;
      submit_button_disable.value = false;
      form.categoryNameOne = params.category.category_name;
      category.current = params.category;
    };

    // 编辑一级分类
    const editOneCategory = () => {
      if (category.current.length === 0) {
        content.root.$message({
          message: "名称不能为空",
          type: "error"
        });
        return;
      }
      let requestData = {
        id: category.current.id,
        categoryName: form.categoryNameOne
      };
      editCategoryApi(requestData)
        .then(response => {
          content.root.$message({
            message: response.data.message,
            type: "success"
          });
          category.current.category_name = response.data.data.data.categoryName;
          // let data = category.item.filter(
          //   item => item.id === category.current.id
          // );
          // data[0].category_name = response.data.data.data.categoryName;
          // 清空输入框名称
          form.categoryNameOne = "";
          category.current = [];
        })
        .catch(error => {
          console.log(error);
        });
    };

    /**
     * 生命周期
     */
    // 挂载完成时执行
    onMounted(() => {
      getInfoCategoryAll();
    });

    watch(
      () => categoryItem.item,
      value => {
        category.item = value;
      }
    );

    return {
      labelPosition,
      category_level_one,
      category_level_two,
      form,
      category,
      submit_button_loading,
      categoryNameOne_disable,
      categoryNameTwo_disable,
      submit_button_disable,
      submit,
      addFirst,
      deleteCate,
      deleteCateConfirm,
      editCategory,
      addChildren
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/config";

.categoty-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }

  div:last-child {
    &:before {
      bottom: 22px;
    }
  }
}

.menu-title {
  line-height: 45px;
  padding-left: 22px;
  background-color: #f3f3f3;
}

.categoty {
  position: relative;
  line-height: 45px;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }

  h4 {
    position: relative;
    padding-left: 40px;
  }

  svg {
    position: absolute;
    left: 14px;
    top: 14px;
    background-color: #fff;
    font-size: 17px;
  }

  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }

  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;

      .button-group {
        display: block;
      }
    }
  }
}

.button-group {
  display: none;
  position: absolute;
  right: 11px;
  z-index: 2;
  top: -1px;

  button {
    font-size: 12px;
  }
}

.from-wrap {
  padding-top: 25px;
  width: 410px;
}
</style>

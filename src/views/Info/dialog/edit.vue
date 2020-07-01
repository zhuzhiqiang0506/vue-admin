<template>
  <el-dialog
    title="修改"
    :visible.sync="data.dialogInfoFlag"
    @close="close"
    width="580px"
    @open="openDialog"
  >
    <el-form :model="data.form" ref="addInfoForm">
      <el-form-item
        label="类别:"
        :label-width="data.formLabelWidth"
        prop="category"
      >
        <el-select v-model="data.form.category" placeholder="请选择">
          <el-option
            v-for="item in data.categoryOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="标题:"
        :label-width="data.formLabelWidth"
        prop="title"
      >
        <el-input v-model="data.form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item
        label="概况:"
        :label-width="data.formLabelWidth"
        prop="content"
      >
        <el-input
          type="textarea"
          v-model="data.form.content"
          placeholder="请输入概况"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取消</el-button>
      <el-button type="danger" :loading="data.submitLoading" @click="submit()"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { reactive, watchEffect } from "@vue/composition-api";
import { getList, editInfo } from "../../../api/news";
export default {
  name: "info",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: () => ""
    }
  },
  setup(props, { emit, root, refs }) {
    const data = reactive({
      dialogInfoFlag: false,
      formLabelWidth: "70px",
      form: {
        category: "",
        title: "",
        content: ""
      },
      categoryOption: [],
      submitLoading: false
    });
    const close = () => {
      resetForm();
      data.dialogInfoFlag = false;
      // 修饰器
      emit("update:flag", false);
      // 回调
      // this.$emit("close", false);
      // 回调时需要做逻辑处理的时候，就不能用修饰器
      // 反之 可以用修饰器
    };

    const openDialog = () => {
      data.categoryOption = props.category;
      getInfo();
    };

    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: props.id
      };
      getList(requestData)
        .then(response => {
          let responseData = response.data.data.data[0];
          data.form = {
            category: responseData.categoryId,
            title: responseData.title,
            content: responseData.content
          };
        })
        .catch(error => {
          console.log(error);
        });
    };

    const resetForm = () => {
      refs.addInfoForm.resetFields();
    };

    const submit = () => {
      let requestData = {
        id: props.id,
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content
      };
      data.submitLoading = true;
      editInfo(requestData)
        .then(response => {
          root.$message({
            message: response.data.message,
            type: "success"
          });
          data.submitLoading = false;
          // 重置
          resetForm();
          data.dialogInfoFlag = false;
          emit("getInfoListRe");
          emit("callbackComponent", { function: "getInfoListRe", data: 111 });
        })
        .catch(error => {
          console.log(error);
          data.submitLoading = false;
        });
    };

    // watch
    // 单项数据流，父级->子级 不能反向修改
    watchEffect(() => (data.dialogInfoFlag = props.flag));

    return {
      data,
      close,
      openDialog,
      submit
    };
  }
};
</script>

<style scoped></style>

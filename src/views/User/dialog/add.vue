<template>
  <el-dialog
    title="新增"
    :visible.sync="data.dialogInfoFlag"
    @close="close"
    width="630px"
    @open="openDialog"
  >
    <el-form :model="data.form" ref="addInfoForm">
      <el-form-item
        label="用户名:"
        :label-width="data.formLabelWidth"
        prop="category"
      >
        <el-input placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item
        label="姓名:"
        :label-width="data.formLabelWidth"
        prop="title"
      >
        <el-input v-model="data.form.title" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item
        label="手机号:"
        :label-width="data.formLabelWidth"
        prop="content"
      >
        <el-input v-model="data.form.content" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item
        label="地区:"
        :label-width="data.formLabelWidth"
        prop="content"
      >
        <CityPicker />
      </el-form-item>
      <el-form-item
        label="是否启用:"
        :label-width="data.formLabelWidth"
        prop="content"
      >
        <el-input v-model="data.form.content" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item
        label="角色:"
        :label-width="data.formLabelWidth"
        prop="content"
      >
        <el-input v-model="data.form.content" placeholder="请输入手机号" />
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
import { add } from "../../../api/news";
import CityPicker from "../../../components/CityPicker/index";
export default {
  name: "info",
  components: {
    CityPicker
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit, root }) {
    const data = reactive({
      dialogInfoFlag: false,
      formLabelWidth: "90px",
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
    };

    const resetForm = () => {
      data.form.category = "";
      data.form.title = "";
      data.form.content = "";
    };

    const submit = () => {
      let requestData = {
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content,
        imgUrl: "http://********",
        createDate: "2020-02-02 12:00:00"
      };
      data.submitLoading = true;
      add(requestData)
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

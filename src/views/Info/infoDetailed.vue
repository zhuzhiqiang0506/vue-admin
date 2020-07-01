<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="信息分类:">
        <el-select v-model="form.categoryId">
          <el-option
            v-for="item in data.category"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻标题:">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="缩略图:">
        缩略图
      </el-form-item>

      <el-form-item label="发布日期:">
        <el-date-picker
          v-model="form.createDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容:">
        <quillEditor
          v-model="form.content"
          ref="myQuillEditor"
          :options="data.editorOption"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="data.submitLoading" @click="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
import { getList, editInfo } from "../../api/news";
import { timestampToTime } from "../../utils/common";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "infoDetailed",
  components: { quillEditor },
  setup(props, content) {
    const data = reactive({
      category: [],
      dataTime: "",
      id:
        content.root.$route.params.id ||
        content.root.$store.getters["infoDetailed/infoId"],
      editorOption: {},
      submitLoading: false
    });

    const form = reactive({
      categoryId: "",
      title: "",
      createDate: "",
      content: ""
    });

    const getInfoGategory = () => {
      content.root.$store.dispatch("common/getInfoGategory").then(response => {
        data.category = response;
      });
    };

    /**
     * 获取信息
     */
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.id
      };
      getList(requestData)
        .then(response => {
          let responseData = response.data.data.data[0];
          form.categoryId = responseData.categoryId;
          form.title = responseData.title;
          form.createDate = timestampToTime(responseData.createDate);
          form.content = responseData.content;
        })
        .catch(error => {
          console.log(error);
        });
    };

    // 保存
    const submit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        imgUrl: ""
      };
      data.submitLoading = true;
      editInfo(requestData)
        .then(response => {
          content.root.$message({
            message: response.data.message,
            type: "success"
          });
          data.submitLoading = false;
        })
        .catch(error => {
          console.log(error);
          data.submitLoading = false;
        });
    };

    onMounted(() => {
      getInfoGategory();
      getInfo();
    });

    return {
      form,
      data,
      submit
    };
  }
};
</script>

<style scoped></style>

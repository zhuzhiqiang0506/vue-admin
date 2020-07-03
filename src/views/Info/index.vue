<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="分类:">
            <el-select v-model="categoryValue" placeholder="请选择">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="margin-left: -10px">
          <el-form-item style="text-align: right" label="日期:">
            <el-date-picker
              v-model="dateValue"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left"
              style="margin-left: 10px;width: 340px"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="margin-left: -70px">
          <el-form-item label="关键字:">
            <SelectVue :config="data.configOption" style="width: 100px" />
          </el-form-item>
          <el-input
            v-model="searchKeyWork"
            placeholder="请输入内容"
            style="width: 200px;padding-right: 10px"
          />
          <el-button type="danger" style="width: 25%" @click="getInfoList"
            >搜索
          </el-button>
        </el-col>
        <el-col :span="3" style="margin-left: 80px">
          <el-button
            style="width: 70%;margin-left: 60px"
            type="danger"
            class="pull-right"
            @click="dialogInfo = true"
            >新增
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格数据 -->
    <el-table
      :data="tableData.item"
      border
      style="width: 100%"
      v-loading="loadingData"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" width="530" />
      <el-table-column
        prop="categoryId"
        label="类型"
        width="130"
        :formatter="toCategory"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="237"
        :formatter="toData"
      >
      </el-table-column>
      <el-table-column prop="user" label="管理员" width="115">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteItem(scope.row.id)"
            >删除
          </el-button>
          <el-button type="success" @click="editInfo(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="success" @click="datailed(scope.row)"
            >编辑详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>

    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[9, 20, 30]"
          layout="total ,sizes ,prev, pager, next ,jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo
      :flag.sync="dialogInfo"
      @close="closeDialog"
      :category="options.category"
      @getInfoListRe="getInfoList"
    />
    <!-- 修改弹窗 -->
    <DialogEditInfo
      :flag.sync="dialogInfo_edit"
      :category="options.category"
      :id="infoId"
      @getInfoListRe="getInfoList"
    />
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from "@vue/composition-api";
import { global } from "../../utils/global3.0";
import { common } from "../../api/common";
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { getList, deleteInfo } from "../../api/news";
import { timestampToTime } from "../../utils/common";
import SelectVue from "../../components/Select";

export default {
  name: "index",
  components: {
    DialogInfo,
    DialogEditInfo,
    SelectVue
  },
  setup(props, content) {
    const { categoryItem } = common();

    const { confirm } = global();

    const data = reactive({
      configOption: {
        init: ["id", "title"]
      }
    });

    const options = reactive({
      category: []
    });

    const searchOption = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);

    const tableData = reactive({
      item: []
    });

    const page = reactive({
      pageNumber: 1,
      pageSize: 9
    });

    const categoryValue = ref("");
    const dateValue = ref("");
    const searchKey = ref("id");
    const searchKeyWork = ref("");
    const dialogInfo = ref(false);
    const dialogInfo_edit = ref(false);
    const total = ref(0);
    const loadingData = ref(false);
    const deleteInfoId = ref("");
    const infoId = ref("");

    // 方法
    const handleSizeChange = size => {
      page.pageSize = size;
      getInfoList();
    };
    const handleCurrentChange = current => {
      page.pageNumber = current;
      getInfoList();
    };
    const closeDialog = () => {
      dialogInfo.value = false;
    };
    const deleteItem = id => {
      deleteInfoId.value = [id];
      confirm({
        content: "确认删除当前信息，是否继续?",
        fn: confirmDelete
      });
    };
    const deleteAll = () => {
      if (!deleteInfoId.value || deleteInfoId.value === 0) {
        content.root.$message({
          message: "请选择要删除的数据",
          type: "error"
        });
        return false;
      }
      confirm({
        content: "确认删除全部信息，是否继续?",
        fn: confirmDelete
      });
    };
    // 删除
    const confirmDelete = () => {
      deleteInfo({
        id: deleteInfoId.value
      })
        .then(response => {
          deleteInfoId.value = "";
          getInfoList();
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    };

    /**
     * 搜索条件处理
     */
    const formatData = () => {
      let requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      // 分类id
      if (categoryValue.value) {
        requestData.categoryId = categoryValue.value;
      }
      // 日期
      if (dateValue.value.length > 0) {
        requestData.startTime = dateValue.value[0];
        requestData.endTime = dateValue.value[1];
      }
      // 关键字
      if (searchKeyWork.value) {
        requestData[searchKey.value] = searchKeyWork.value;
      }
      return requestData;
    };

    const getInfoList = () => {
      // 单独处理数据

      let requestData = formatData();
      loadingData.value = true;
      getList(requestData)
        .then(response => {
          let data = response.data.data;
          tableData.item = data.data;
          total.value = data.total;
          loadingData.value = false;
        })
        .catch(error => {
          loadingData.value = false;
          console.log(error);
        });
    };

    // const getCate = () => {
    //   getCategory()
    //     .then(response => {
    //       options.category = response.data.data.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // };

    const toData = row => {
      return timestampToTime(row.createDate);
    };

    const toCategory = row => {
      // 调用一个函数 返回一个新的值 替换原始值
      let categoryData = options.category.filter(
        item => item.id === row.categoryId
      )[0];
      return categoryData.category_name;
    };

    const handleSelectionChange = val => {
      let id = val.map(item => item.id);
      deleteInfoId.value = id;
    };

    const editInfo = id => {
      infoId.value = id;
      dialogInfo_edit.value = true;
    };

    const callbackComponent = params => {
      console.log(params);
    };

    const datailed = data => {
      // 存值
      // content.root.$store.commit("infoDetailed/SET_ID", data.id);
      // content.root.$store.commit("infoDetailed/SET_TITLE", data.title);
      content.root.$store.commit("infoDetailed/UPDATE_STATE_VALUE", {
        id: {
          value: data.id,
          sessionKey: "infoId",
          session: true
        },
        title: {
          value: data.title,
          sessionKey: "infoTitle",
          session: true
        }
      });
      // 跳转
      content.root.$router.push({
        name: "InfoDetailed",
        params: {
          id: data.id,
          title: data.title
        }
      });
    };

    /**
     * 生命周期
     */
    // 挂载完成时执行
    onMounted(() => {
      // vue3.0
      // getInfoCategory();
      // vuex
      content.root.$store.dispatch("common/getInfoGategory").then(response => {
        options.category = response;
      });
    });

    watch(
      () => categoryItem.item,
      value => {
        options.category = value;
      }
    );

    onMounted(() => {
      getInfoList();
    });

    return {
      data,
      total,
      options,
      searchOption,
      tableData,
      categoryValue,
      dateValue,
      searchKey,
      searchKeyWork,
      dialogInfo,
      dialogInfo_edit,
      loadingData,
      infoId,
      handleSizeChange,
      handleCurrentChange,
      closeDialog,
      deleteItem,
      deleteAll,
      confirmDelete,
      toData,
      toCategory,
      handleSelectionChange,
      getInfoList,
      editInfo,
      callbackComponent,
      datailed
    };
  }
};
</script>

<style scoped lang="scss"></style>

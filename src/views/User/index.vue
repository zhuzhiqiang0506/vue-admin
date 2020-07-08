<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div class="label-wrap">
          <label>关键字:</label>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="warp-content">
          <el-row :gutter="20">
            <el-col :span="4">
              <SelectVue :config="data.configOption" />
            </el-col>
            <el-col :span="4">
              <el-input placeholder="请输入内容" />
            </el-col>
            <el-col :span="16">
              <el-button type="danger">搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button class="pull-right" type="danger">添加用户</el-button>
      </el-col>
    </el-row>
    <TableVue style="margin-top: 30px" :config="data.configTable" />
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SelectVue from "../../components/Select/index";
import TableVue from "../../components/Table/index";
export default {
  name: "userIndex",
  components: { SelectVue, TableVue },
  setup() {
    const data = reactive({
      configOption: {
        init: ["name", "phone", "email"]
      },
      configTable: {
        selection: true,
        recordCheckBox: true,
        tHead: [
          {
            label: "邮箱/用户名",
            field: "email",
            width: 200
          },
          {
            label: "真实姓名",
            field: "name",
            width: 120
          },
          {
            label: "手机号",
            field: "phone"
          },
          {
            label: "地址",
            field: "address"
          },
          {
            label: "角色",
            field: "role"
          }
        ]
      }
    });

    return {
      data
    };
  }
};
</script>

<style scoped>
.label-wrap {
  float: left;
  width: 60px;
  text-align: left;
  line-height: 40px;
}
</style>

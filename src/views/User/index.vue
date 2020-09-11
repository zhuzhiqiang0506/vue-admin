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
        <el-button
          class="pull-right"
          type="danger"
          @click="data.dialog_add = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <TableVue style="margin-top: 30px" :config="data.configTable">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.name"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </template>
      <template v-slot:operation="slotData">
        <el-button size="small" type="danger" @click="operation(slotData.data)"
          >删除</el-button
        >
        <el-button size="small" type="success" @click="operation(slotData.data)"
          >编辑</el-button
        >
      </template>
    </TableVue>
    <DialogAdd :flag.sync="data.dialog_add" />
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SelectVue from "../../components/Select/index";
import TableVue from "../../components/Table/index";
import DialogAdd from "./dialog/add";
export default {
  name: "userIndex",
  components: { SelectVue, TableVue, DialogAdd },
  setup() {
    const data = reactive({
      dialog_add: false,
      configOption: {
        init: ["name", "phone", "email"]
      },
      configTable: {
        selection: true,
        recordCheckBox: true,
        tHead: [
          {
            label: "邮箱/用户名",
            field: "title",
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
          },
          {
            label: "禁启用状态",
            field: "status",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation"
          }
        ],
        requestData: {
          url: "getUserList",
          method: "post",
          data: {
            pageNumber: 1,
            pageSize: 10
          }
        },
        pagination: {
          class: "pull-right",
          show: true,
          layout: "total, sizes, prev, pager, next, jumper"
        }
      }
    });

    let operation = params => {
      console.log(params);
    };

    return {
      data,
      operation
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

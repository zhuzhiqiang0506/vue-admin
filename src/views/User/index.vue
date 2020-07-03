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
              <SelectVue :config="data.configOption"></SelectVue>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="请输入内容"></el-input>
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
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SelectVue from "../../components/Select";
export default {
  name: "userIndex",
  components: { SelectVue },
  setup() {
    const data = reactive({
      configOption: {
        init: ["name", "phone", "email"]
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

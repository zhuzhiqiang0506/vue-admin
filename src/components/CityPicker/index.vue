<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select></el-select>
      </el-col>
      <el-col :span="6">
        <el-select></el-select>
      </el-col>
      <el-col :span="6">
        <el-select></el-select>
      </el-col>
      <el-col :span="6">
        <el-select></el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCityPicker } from "../../api/common";
export default {
  name: "cityPicker",
  setup() {
    return {
      getCityPicker
    };
  }
};
</script>

<style scoped></style>

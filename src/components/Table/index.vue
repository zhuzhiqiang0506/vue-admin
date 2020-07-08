<template>
  <div>
    <el-table :data="data.tableData" border style="width: 100%">
      <!--多选框-->
      <el-table-column
        v-if="data.tableConfig.selection"
        type="selection"
        width="55"
      >
      </el-table-column>
      <!--数据-->
      <el-table-column
        v-for="item in data.tableConfig.tHead"
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
      />
    </el-table>
  </div>
</template>

<script>
import {
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated
} from "@vue/composition-api";

export default {
  name: "tableVue",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      tableConfig: {
        selection: true,
        recordCheckBox: false,
        tHead: []
      },
      tableData: [
        {
          email: "AAA@qq.com",
          name: "王小虎",
          phone: "15011112222",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "大哥"
        },
        {
          email: "BBB@qq.com",
          name: "王小虎",
          phone: "15011112222",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "二哥"
        }
      ]
    });

    /**
     * 方法 methods
     */
    // 初始化配置项
    const initTableConfig = () => {
      let configData = props.config;
      for (let key in configData) {
        if (data.tableConfig[key]) {
          data.tableConfig[key] = configData[key];
        }
      }
    };

    onBeforeMount(() => {
      initTableConfig();
    });
    onMounted(() => {});
    onBeforeUpdate(() => {});
    onUpdated(() => {});

    return {
      data
    };
  }
};
</script>

<style lang="scss"></style>

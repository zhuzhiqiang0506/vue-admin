<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <!--多选框-->
      <el-table-column v-if="tableConfig.selection" type="selection" width="55">
      </el-table-column>
      <!--数据-->
      <template v-for="item in tableConfig.tHead">
        <!-- v-solt -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-if="item.columnType === 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"> </slot>
          </template>
        </el-table-column>
        <!--文本渲染-->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else
        />
      </template>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      v-if="tableConfig.pagination.show"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="tableConfig.pagination.layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import tableLoadData from "../../mixins/tableLoadData";
import pagination from "../../mixins/pagination";
export default {
  name: "tableVue",
  mixins: [tableLoadData, pagination],
  data() {
    return {
      tableConfig: {
        selection: true,
        recordCheckBox: false,
        requestData: {},
        tHead: [],
        pagination: {
          show: true,
          layout: "total, sizes, prev, pager, next, jumper"
        },
        class: ""
      },
      tableLoadDatatableData: []
    };
  },
  beforeMount() {
    this.initTableConfig();
  },
  methods: {
    initTableConfig() {
      let configData = this.config;
      let keys = Object.keys(this.tableConfig);
      for (let key in configData) {
        // includes[]
        if (keys.includes(key)) {
          this.tableConfig[key] = configData[key];
        }
      }
    }
  },
  mounted() {
    this.initTableConfig();
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss"></style>

<!--
初始化的数据,不需要监听,
可以在挂载之前预先处理
-->

<!--

v-slot插槽
父组件传内容到子组件显示

1、匿名插槽:没有指定某一个，全部都显示
2、具名插槽:指定插槽显示内容
3、作用域插槽:可以进行数据绑定,父子组件通信

-->

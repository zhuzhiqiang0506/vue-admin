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
      <template v-for="item in data.tableConfig.tHead">
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
      :class="data.tableConfig.pagination.class"
      v-if="data.tableConfig.pagination.show"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="100"
      :layout="data.tableConfig.pagination.layout"
      :total="pageData.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  reactive,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated
} from "@vue/composition-api";
import { tableLoadData } from "./tableLoadData";
import { paginationHook } from "./paginationHook";

export default {
  name: "tableVue",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    // 加载数据
    const { tableData, tableLoadDataFun } = tableLoadData({ root });
    // 页码
    const {
      pageData,
      handleSizeChange,
      handleCurrentChange,
      totalCount
    } = paginationHook({
      root
    });
    // 组件变量
    const data = reactive({
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
      tableData: []
    });

    /**
     * vue3.0 业务逻辑的拆分及组合 复用性
     */

    /**
     * 方法 methods
     */
    /*watch(
      () => tableData.item,
      newValue => {
        data.tableData = newValue;
      }
    );*/

    /**
     * 数据渲染
     */
    watch(
      [() => tableData.item, () => tableData.total],
      ([tableData, tableCount]) => {
        data.tableData = tableData;
        totalCount(tableCount);
      }
    );

    watch(
      [() => pageData.currentPage, () => pageData.pageSize],
      ([currentPage, pageSize]) => {
        let requestData = data.tableConfig.requestData;
        if (requestData.data) {
          requestData.data.pageNumber = currentPage;
          requestData.data.pageSize = pageSize;
          tableLoadDataFun(requestData);
        }
      }
    );

    // 初始化配置项
    // const 声明对象或数组
    // 匹配相同的key 存在则替换
    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);
      for (let key in configData) {
        // includes[]
        if (keys.includes(key)) {
          data.tableConfig[key] = configData[key];
        }
      }
    };

    onBeforeMount(() => {
      initTableConfig();
      tableLoadDataFun(data.tableConfig.requestData);
    });
    onMounted(() => {});
    onBeforeUpdate(() => {});
    onUpdated(() => {});

    return {
      data,
      pageData,
      handleSizeChange,
      handleCurrentChange
    };
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

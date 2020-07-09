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
import { requestUrl } from "../../api/requestUrl";
import { loadTableData } from "../../api/common";

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
        requestData: {},
        tHead: []
      },
      tableData: [
        {
          email: "AAA@qq.com",
          name: "王大虎",
          phone: "15011112222",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "大哥"
        },
        {
          email: "BBB@qq.com",
          name: "王二虎",
          phone: "15011112222",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "二哥"
        }
      ]
    });

    /**
     * 方法 methods
     */
    let loadData = () => {
      let requestJson = data.tableConfig.requestData;
      let requestData = {
        url: requestUrl[requestJson.url],
        method: requestJson.method,
        data: requestJson.data
      };
      loadTableData(requestData)
        .then(response => {
          let responseData = response.data.data.data;
          if (responseData && responseData.length > 0) {
            data.tableData = responseData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

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
      loadData();
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

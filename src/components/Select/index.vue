<template>
  <div>
    <el-select v-model="data.selectValue">
      <el-option
        v-for="item in data.initOption"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "index",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      selectValue: "",
      initOption: [],
      option: [
        {
          value: "name",
          label: "姓名"
        },
        {
          value: "phone",
          label: "手机号"
        },
        {
          value: "email",
          label: "邮箱"
        },
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ]
    });

    let initOption = () => {
      let initData = props.config.init;
      let optionArr = [];

      if (initData.length === 0) {
        return 0;
      }
      initData.forEach(item => {
        let arr = data.option.filter(elem => elem.value === item);
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      // 初始化值
      if (optionArr.length === 0) {
        return 0;
      }
      data.initOption = optionArr;
      data.selectValue = optionArr[0].value;
    };

    onMounted(() => {
      initOption();
    });

    return {
      data
    };
  }
};
</script>

<style scoped></style>

<!--

组件目录位置: src -> components -> Select -> index2.0.vue
组件引用方式：import SelectVue from "../../components/Select";
template: <SelectVue :config="data.configOption"/>

-->

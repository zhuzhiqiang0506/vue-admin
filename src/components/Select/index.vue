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
      type: Array,
      default: () => []
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
      let optionArr = [];
      props.config.forEach(item => {
        let arr = data.option.filter(elem => elem.value === item)[0];
        optionArr.push(arr);
      });
      // 初始化值
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

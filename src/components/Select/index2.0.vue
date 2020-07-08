<template>
  <div>
    <el-select v-model="selectValue">
      <el-option
        v-for="item in initOptionData"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      selectValue: "",
      initOptionData: [],
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
    };
  },
  mounted() {
    this.initOption();
  },
  methods: {
    initOption() {
      let initData = this.config.init;
      let optionArr = [];

      if (initData.length === 0) {
        return 0;
      }
      initData.forEach(item => {
        let arr = this.option.filter(elem => elem.value === item);
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      // 初始化值
      if (optionArr.length === 0) {
        return 0;
      }
      this.initOptionData = optionArr;
      this.selectValue = optionArr[0].value;
    }
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    config: {
      handler() {
        this.initOption();
      },
      // 组件初始化时， 马上对config监听
      // 为false 不会监听
      immediate: true
    }
  }
};
</script>

<style scoped></style>

<!--

组件目录位置: src -> components -> Select -> index2.0.vue
组件引用方式：import SelectVue from "../../components/Select";
template: <SelectVue :config="data.configOption"/>

-->

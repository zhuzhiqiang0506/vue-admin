let pagination = {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 100,
      pageSizes: [10, 20, 50, 100]
    };
  },
  create() {},
  mounted() {},
  methods: {
    totalCount(count) {
      this.total = count;
    },
    handleSizeChange(val) {
      this.tableConfig.requestData.data.pageSize = val;
      this.tableLoadDataFun();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tableConfig.requestData.data.pageNumber = val;
      this.tableLoadDataFun();
      console.log(`当前页: ${val}`);
    }
  }
};

export default pagination;

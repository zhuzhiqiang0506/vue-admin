import { requestUrl } from "../api/requestUrl";
import { loadTableData } from "../api/common";

let tableLoadData = {
  data() {},
  create() {},
  mounted() {
    this.tableLoadDataFun();
  },
  methods: {
    tableLoadDataFun() {
      let requestJson = this.tableConfig.requestData;
      let requestData = {
        url: requestUrl[requestJson.url],
        method: requestJson.method,
        data: requestJson.data
      };
      loadTableData(requestData)
        .then(response => {
          let responseData = response.data.data.data;
          if (responseData && responseData.length > 0) {
            this.tableData = responseData;
            this.total = response.data.data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default tableLoadData;

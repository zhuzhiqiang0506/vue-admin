import { reactive } from "@vue/composition-api";
import { requestUrl } from "../../api/requestUrl";
import { loadTableData } from "../../api/common";

export function tableLoadData() {
  const tableData = reactive({
    item: []
  });

  const tableLoadDataFun = params => {
    let requestJson = params;
    let requestData = {
      url: requestUrl[requestJson.url],
      method: requestJson.method,
      data: requestJson.data
    };
    loadTableData(requestData)
      .then(response => {
        let responseData = response.data.data.data;
        if (responseData && responseData.length > 0) {
          tableData.item = responseData;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return {
    tableData,
    tableLoadDataFun
  };
}

/**
 * 说明业务逻辑是什么
 */

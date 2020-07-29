import { reactive } from "@vue/composition-api";

export function paginationHook() {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 100,
    pageSizes: [10, 20, 50, 100]
  });

  const totalCount = count => {
    pageData.total = count;
  };

  const handleSizeChange = val => {
    pageData.pageSize = val;
    console.log(`每页 ${val} 条`);
  };
  const handleCurrentChange = val => {
    pageData.currentPage = val;
    console.log(`当前页: ${val}`);
  };
  return { pageData, handleSizeChange, handleCurrentChange, totalCount };
}

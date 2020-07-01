// import { MessageBox, Message } from "element-ui";
import { ref } from "@vue/composition-api";
import { Message, MessageBox } from "element-ui";

export function global() {
  const str = ref("");

  const confirm = params => {
    MessageBox.confirm(params.content, params.tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      .then(() => {
        str.value = "删除";
        params.fn && params.fn();
        // if (params.fn) {
        //   params.fn();
        // }
        Message({
          type: "success",
          message: "删除成功!"
        });
      })
      .catch(() => {
        params.catchFn && params.catchFn();
        Message({
          type: "info",
          message: "已取消删除"
        });
      });
  };

  return {
    str,
    confirm
  };
}

// vue插件

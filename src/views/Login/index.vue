<template>
  <div id="login">
    <!--内容区-->
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!--表单 start-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            maxlength="20"
            minlength="6"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="password"
            maxlength="20"
            minlength="6"
            v-model="ruleForm.passwords"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                maxlength="6"
                minlength="6"
                v-model="ruleForm.code"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                @click="getSms()"
                class="block"
                type="success"
                :disabled="code.status"
                >{{ code.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginButtonStates"
            >{{ model === "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { getSMS, register } from "../../api/login";
import {
  stripscript,
  validataEmail,
  validataPass,
  validataCode
} from "../../utils/validate";
import { reactive, ref, onMounted } from "@vue/composition-api";

export default {
  name: "login",
  setup(props, context) {
    /**
     * 函数
     */

    // 验证用户名邮箱
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validataEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePass = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validataPass(value)) {
        callback(new Error("密码为6-20位的数字加字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validateRePass = (rule, value, callback) => {
      // 如果是login 不判断重复密码 直接通过
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (!validataCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };

    /**
     * 获取验证码
     */

    const getSms = () => {
      // 进行提示
      if (ruleForm.username === "") {
        context.root.$message.error("邮箱不能为空");
        return false;
      }
      if (!validataEmail(ruleForm.username)) {
        context.root.$message.error("邮箱格式有误");
        return false;
      }
      if (ruleForm.password === "") {
        context.root.$message.error("密码不能为空");
        return false;
      }

      let requestData = {
        username: ruleForm.username,
        model: model.value
      };

      updateButtonsStatus({
        status: true,
        text: "发送中"
      });

      // 延时5s
      setTimeout(() => {
        getSMS(requestData)
          .then(response => {
            context.root.$message({
              message: response.data.message,
              type: "success"
            });
            loginButtonStates.value = false;
            // 定时器，倒计时60s
            countDown(60);
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }, 0);

      // 请求的接口
      // 获取验证码
    };

    /**
     * 数据
     */

    //data 生命周期 自定义函数
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);

    const model = ref("login");

    // 登录按钮禁用
    const loginButtonStates = ref(true);

    // 验证码按钮禁用
    const code = reactive({
      status: false,
      text: "获取验证码"
    });

    // 倒计时
    const timer = ref(null);

    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      passwords: [{ validator: validateRePass, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });

    /**
     * 声明函数
     */

    /**
     * 切换模块
     */
    const toggleMenu = item => {
      menuTab.forEach(elem => {
        elem.current = false;
      });
      item.current = true;
      // 修改模块值
      model.value = item.type;
      // 重置表单
      resetFromData();
      clearCountDown();
    };

    // 重置表单
    const resetFromData = () => {
      context.refs.ruleForm.resetFields();
    };

    // 更新按钮的状态
    const updateButtonsStatus = parmas => {
      code.status = parmas.status;
      code.text = parmas.text;
    };

    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          // model.value === "login"?userLogin():userRegister();
          if (model.value === "login") {
            userLogin();
          } else {
            userRegister();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    /**
     * 登录
     */
    const userLogin = () => {
      let requestData = reactive({
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      });
      context.root.$store
        .dispatch("app/login", requestData)
        .then(response => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success"
          });
          context.root.$router.push({
            name: "Console"
          });
        })
        .catch(error => {
          console.log(error);
        });
      // login(requestData)
      //   .then(response => {
      //     let data = response.data;
      //     context.root.$message({
      //       message: data.message,
      //       type: "success"
      //     });
      //     context.root.$router.push({
      //       name: "Console"
      //     });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    };

    /**
     * 注册
     */
    const userRegister = () => {
      let requestData = reactive({
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        model: "register"
      });
      register(requestData)
        .then(response => {
          let data = response.data;
          context.root.$message.error({
            message: data.message,
            type: "success"
          });
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          console.log(error);
        });
    };

    const countDown = number => {
      // 判断定时器是否存在 存在则清除
      if (timer.value) {
        clearInterval(timer.value);
      }

      // setTimeout:clearTimeout(变量) 只执行一次
      // setInterval：cleatInterval(变量) 不断执行 需要条件才会停止

      let time = number;

      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updateButtonsStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          code.text = `倒计时${time}秒`;
        }
      }, 1000);
    };

    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      // 还原验证码状态
      updateButtonsStatus({
        status: false,
        text: "获取验证码"
      });
      // 清除倒计时
      clearInterval(timer.value);
    };

    /**
     * 生命周期
     */
    onMounted(() => {});

    return {
      menuTab,
      model,
      toggleMenu,
      submitForm,
      ruleForm,
      rules,
      getSms,
      loginButtonStates,
      code
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: lightsteelblue;
}

.login-wrap {
  width: 330px;
  margin: auto;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    font-size: 14px;
    width: 90px;
    line-height: 36px;
    color: #ffffff;
    border-radius: 2px;
    cursor: pointer;
  }
}

.current {
  background-color: rgba(0, 0, 0, 0.1);
}

.login-form {
  margin-top: 29px;

  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }
}

.item-form {
  margin-bottom: 13px;
}

.block {
  width: 100%;
  display: block;
}

.login-btn {
  margin-top: 13px;
}
</style>

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
          <label>邮箱</label>
          <el-input
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
                v-model.number="ruleForm.code"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button class="block" type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validataEmail,
  validataPass,
  validataCode
} from "@/utils/validate";

export default {
  name: "login",
  data() {
    // 验证用户名邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validataEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validataPass(value)) {
        callback(new Error("密码为6-20位的数字加字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    var validateRePass = (rule, value, callback) => {
      // 如果是login 不判断重复密码 直接通过
      if (this.model == "login") {
        callback();
      }
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (!validataCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwords: [{ validator: validateRePass, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      },
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      // 模块的值
      model: "login"
    };
  },
  // 挂载完后
  mounted() {},
  methods: {
    // vue 数据驱动视频渲染
    toggleMenu(item) {
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      item.current = true;
      // 修改模块值
      this.model = item.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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

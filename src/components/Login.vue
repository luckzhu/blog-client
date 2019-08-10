<template>
  <div>
    <div id="login">
      <div class="username">
        <h4>用户名</h4>
        <el-input v-model="username" placeholder="请输入内容"></el-input>
      </div>
      <div class="passworde">
        <h4>密码</h4>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
      </div>
      <el-button type="primary" class="loginButton" @click="onLogin"
        >立即登陆</el-button
      >

      <div class="notice">
        没有账号？
        <router-link to="/register">注册新用户</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["user", "isLogin"])
  },
  methods: {
    ...mapActions(["login"]),
    onLogin() {
      this.login({ username: this.username, password: this.password }).then(
        res => {
            this.$router.push("/");
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/base.scss";

#login {
  display: grid;
  justify-content: center;
}
.username,
.password {
  padding: 10px 0;
}
h4 {
  color: $textPrimaryColor;
  margin: 10px 0 10px;
  font-weight: 500;
}
.el-input {
  width: 400px;
}

.loginButton {
  margin-top: 30px;
  justify-self: start;
}
.notice {
  font-size: 12px;
  color: $textLighterColor;
  text-align: center;
  margin-top: 30px;
  > a {
    color: $themeColor;
  }
}
</style>
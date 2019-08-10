<template>
  <header :class="{ login: isLogin, 'no-login': !isLogin }">
    <template v-if="!isLogin">
      <h1>LET'S SHARE</h1>
      <p>精品博客汇聚</p>
      <div class="button">
        <el-button type="primary" plain>立即登陆</el-button>
        <el-button type="primary" plain>注册账号</el-button>
      </div>
    </template>

    <template v-if="isLogin">
      <h1>LET'S SHARE</h1>
      <div class="icon-avatar">
        <i class="icon el-icon-s-custom "></i>
        <img
          class="avatar"
          src="http://cn.gravatar.com/avatar/1?s=128&d=identicon"
          alt=""
        />
      </div>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user", "isLogin"])
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions(["checkLogin", "logout"])
  }
};
</script>

<style lang="scss" scoped>
$primary-color: #409eff;

header {
  display: flex;
  background-color: $primary-color;
  align-items: center;
  > h1 {
    font-size: 40px;
    color: white;
    margin: 20px 0;
  }
}

header.no-login {
  flex-direction: column;
  justify-content: center;

  padding: 20px 0;
  > p {
    color: white;
    margin-bottom: 20px;
  }

  > .button {
    > .el-button {
      margin: 0 10px;
    }
  }
}

header.login {
  justify-content: space-between;
  > .icon-avatar {
    display: flex;
    align-items: center;
    > .icon {
      color: #fff;
      font-size: 30px;
    }
    > .avatar {
      width: 45px;
      height: 45px;
      margin-left: 15px;
      border: 1px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 3px #aaa;
    }
  }
}
</style>

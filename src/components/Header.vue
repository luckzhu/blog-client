<template>
  <header :class="{ login: isLogin, 'no-login': !isLogin }">
    <template v-if="!isLogin">
      <h1>LET'S SHARE</h1>
      <p>精品博客汇聚</p>
      <div class="button">
        <router-link to="/login"
          ><el-button type="primary" plain>立即登陆</el-button></router-link
        >
        <router-link to="/register">
          <el-button type="primary" plain>注册账号</el-button></router-link
        >
      </div>
    </template>

    <template v-if="isLogin">
      <h1>LET'S SHARE</h1>
      <div class="icon-avatar">
        <img
          class="avatar"
          src="http://cn.gravatar.com/avatar/1?s=128&d=identicon"
          alt=""
        />
        <i class="icon el-icon-s-custom "></i>
        <i class="icon el-icon-error " @click="onLogout"></i>
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
    ...mapActions(["checkLogin", "logout"]),
    onLogout() {
      this.logout().then(()=>{
        this.$router.push('/')
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";

header {
  display: flex;
  background-color: $bgColor;
  align-items: center;
  > h1 {
    font-size: 40px;
    color: $normalWhite;
    margin: 20px 0;
  }
}

header.no-login {
  flex-direction: column;
  justify-content: center;

  padding: 20px 0;
  > p {
    color: $normalWhite;
    margin-bottom: 20px;
  }

  > .button {
     .el-button {
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
      color: $normalWhite;
      font-size: 30px;
      margin-left: 15px;
    }
    > .avatar {
      width: 45px;
      height: 45px;
      border: 1px solid $normalWhite;
      border-radius: 50%;
      box-shadow: 0 0 3px #aaa;
    }
  }
}
</style>

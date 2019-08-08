<template>
  <header>
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
    </template>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isLogin: false
    };
  }
};
</script>

<style lang="scss" scoped>
$primary-color:#409eff;

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:$primary-color;
  padding: 20px 0;

  > h1 {
    font-size: 40px;
    color: white;
    margin: 20px 0;
  }
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
</style>

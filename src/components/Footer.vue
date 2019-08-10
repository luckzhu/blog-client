<template>
  <footer>
    <p>© xiedaimala.com 2019 wechat: xiedaimala01</p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 14px;
  color: $textLighterColor;
  background-color: rgb(215, 215, 215);
}
</style>

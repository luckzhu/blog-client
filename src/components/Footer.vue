<template>
  <footer>
    <p>© github/luckzhu 2019 wechat: z6196422</p>
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 14px;
  color: $textLighterColor;
  background-color: rgb(215, 215, 215);
}
</style>

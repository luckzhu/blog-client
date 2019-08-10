<template>
  <div id="index">
    <section class="blog-posts">
      <div class="item">
        <figure>
          <img
            class="avatar"
            src="http://cn.gravatar.com/avatar/1?s=128&d=identicon"
            alt=""
          />
          <figcaption class="name">rouyu</figcaption>
        </figure>

        <h3>前端异步大揭秘<span>3天前</span></h3>

        <p>
          本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的
          callback、ES2016中的Promise和Generator、 Node 用于解决回调的co
          模块、ES2017中的async/await。适合初步接触 Node.js以及少量
          ES6语法的同学阅读...
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$textLighterColor: black;
.item {
  display: grid;
  grid: auto auto / 80px 1fr;
  margin: 20px 0;

  > figure {
    grid-column: 1;
    grid-row: 1 / span 2;
    justify-self: center;
    margin-left: 0;
    text-align: center;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    > figcaption {
      font-size: 12px;
      color: $textLighterColor;
    }
  }

  h3 {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    & > span {
      color: $textLighterColor;
      display: inline-block;
      font-size: 12px;
      font-weight: normal;
      margin-left: 10px;
    }
  }

  p {
    grid-column: 2;
    grid-row: 2;
  }
}
</style>

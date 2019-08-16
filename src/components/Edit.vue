<template>
  <div>
    <div id="edit">
      <h1>编辑文章</h1>
      <h3>文章标题</h3>
      <el-input v-model="title"></el-input>
      <p class="msg">限30个字</p>
      <h3>内容简介</h3>
      <el-input
        v-model="description"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
      ></el-input>
      <p class="msg">限30个字</p>
      <h3>文章内容</h3>
      <el-input
        v-model="content"
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 40 }"
      ></el-input>
      <p class="msg">限30个字</p>

      <p class="isAtIndex">
        <el-switch
          v-model="atIndex"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
        <label>在首页展示</label>
      </p>
      <el-button type="primary" @click="onUpdateBlog">更新</el-button>
    </div>
  </div>
</template>

<script>
import blog from "@/api/blog.js";
export default {
  data() {
    return {
      atIndex: true,
      title: "",
      description: "",
      content: ""
    };
  },
  created() {
    this.blogId = this.$route.params.blogId;
    blog.getDetail({ blogId: this.blogId }).then(res => {
      this.title = res.data.title;
      this.description = res.data.description;
      this.content = res.data.content;
      this.atIndex = res.data.atIndex;
    });
  },
  methods: {
    onUpdateBlog() {
      blog
        .updateBlog(
          { blogId: this.blogId },
          {
            title: this.title,
            content: this.content,
            description: this.description,
            atIndex: this.atIndex
          }
        )
        .then(res => {
          this.$message.success(res.msg);
          this.$router.push({ path: `/detail/${res.data.id}` });
        });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/base.scss";

#edit,
#create {
  padding-bottom: 30px;

  h1 {
    text-align: center;
  }
  h3 {
    margin-bottom: 5px;
    font-weight: 500;
  }

  .isAtIndex {
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    > label {
      margin-left: 5px;
    }
  }

  .msg {
    text-align: right;
    font-size: 12px;
    color: $textLighterColor;
  }
}
</style>
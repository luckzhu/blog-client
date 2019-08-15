<template>
  <div id="index">
    <section class="blog-posts" v-for="blog in blogs" :key="blog.id">
      <div class="item">
        <figure>
          <img
            class="avatar"
            :src="blog.user.avatar"
            :alt="blog.user.username"
          />
          <figcaption class="name">{{ blog.user.username }}</figcaption>
        </figure>

        <h3>
          {{ blog.title }}<span>{{ blog.createdAt }}</span>
        </h3>

        <p>
          {{ blog.description }}
        </p>
      </div>
    </section>
    <section class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="onPageChange"
         :current-page="page"
      >
      </el-pagination>
    </section>
  </div>
</template>

<script>
import blog from "@/api/blog.js";
export default {
  data() {
    return {
      blogs: null,
      page: 1,
      total: null
    };
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1;
    blog.getIndexBlogs({page:this.page}).then(res => {
      this.blogs = res.data;
      this.page = res.page;
      this.total = res.total;
    });
  },
  methods: {
    onPageChange(newPage) {
      blog.getIndexBlogs({ page: newPage }).then(res => {
        this.blogs = res.data;
        this.page = res.page;
        this.total = res.total;
        this.$router.push({ path: "/", query: { page: newPage } });
      });
    }
  }
};
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
.pagination {
  display: flex;
  justify-content: center;
}
</style>

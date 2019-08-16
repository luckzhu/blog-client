<template>
  <div class="div">
    <div id="index">
      <section class="blog-posts" v-for="blog in blogs" :key="blog.id">
        <div class="item">
          <figure>
            <router-link :to="`/user/${blog.user.id}`">
              <img
                class="avatar"
                :src="blog.user.avatar"
                :alt="blog.user.username"
              />
              <figcaption class="name">{{ blog.user.username }}</figcaption>
            </router-link>
          </figure>

          <h3>
            <router-link :to="`detail/${blog.id}`">
              {{ blog.title }} </router-link
            ><span>{{ friendlyDate(blog.createdAt) }}</span>
          </h3>
          <p>
            <router-link :to="`detail/${blog.id}`">
              {{ blog.description }}
            </router-link>
          </p>
        </div>
      </section>
      <section ref="pagination" class="pagination">
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
  </div>
</template>

<script>
import blog from "@/api/blog.js";
export default {
  data() {
    return {
      blogs: null,
      page: 1,
      total: null,
    };
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1;
    blog.getIndexBlogs({ page: this.page }).then(res => {
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
  },
   
};
</script>

<style lang="scss" scoped>
@import "@/assets/base.scss";
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
    figcaption {
      font-size: 12px;
      color: $textLighterColor;
    }
  }

  h3 {
    grid-column: 2;
    grid-row: 1;
    align-self: center;

    > a {
      color: $textPrimaryColor;
    }
    & > span {
      color: $textLighterColor;
      display: inline-block;
      font-size: 12px;
      font-weight: normal;
      margin-left: 10px;
    }
  }

  p {
    > a {
      color: $textPrimaryColor;
    }
    grid-column: 2;
    grid-row: 2;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

// .pagination-noFulled {
//   position: absolute;
//   bottom: 90px;
//   left: 50%;
//   transform: translateX(-50%);
// }
</style>

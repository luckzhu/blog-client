<template>
  <div>
    <div id="user">
      <section class="user-info">
        <img :src="user.avatar" :alt="user.username" class="avatar" />
        <h3>{{ user.username }}</h3>
      </section>
      <section>
        <div class="item" v-for="blog in userBlogs" :key="blog.id">
          <div class="date">
            <span class="day">{{ splitDate(blog.updatedAt).date }}</span>
            <span class="month">{{ splitDate(blog.updatedAt).month }}月</span>
            <span class="year">{{ splitDate(blog.updatedAt).year }}</span>
          </div>
          <h3>{{ blog.title }}</h3>
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
  </div>
</template>

<script>
import blog from "../api/blog.js";
export default {
  data() {
    return {
      userBlogs: [],
      user: {},
      page: 1,
      total: ""
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    console.log(this.userId);
    this.page = this.$route.query.page || 1
    blog.getBlogsByUserId(this.userId, { page: this.page }).then(res => {
      this.userBlogs = res.data;
      this.page = res.page;
      this.total = res.total;
      if (res.data.length > 0) {
        this.user = res.data[0].user;
      }
    });
  },
  methods: {
    splitDate(dateStr) {
      let dateObj = typeof dateStr === "object" ? dateStr : new Date(dateStr);
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      };
    },
    onPageChange(newPage) {
      blog.getBlogsByUserId(this.userId, { page: newPage }).then(res => {
        this.userBlogs = res.data;
        this.page = res.page;
        this.total = res.total;
        this.$router.push({
          path: `/user/${this.userId}`,
          query: { page: newPage }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/base.scss";

#my,
#user {
  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;

    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-column: 2;
      grid-row: 1;
      margin-top: 10px;
    }
  }

  .item {
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 20px 0;

    .date {
      grid-column: 1;
      grid-row: 1 / span 3;
      justify-self: center;
      text-align: center;

      span {
        display: block;
        color: $textLighterColor;
      }

      .day {
        font-size: 40px;
      }
    }

    h3 {
      grid-column: 2;
      grid-row: 1;
    }

    p {
      grid-column: 2;
      grid-row: 2 / span 2;
    }

    .actions {
      grid-column: 2;
      grid-row: 3;
      font-size: 12px;

      a {
        color: $themeLighterColor;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
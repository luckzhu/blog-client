<template>
  <div>
    <div id="my">
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

          <router-link :to="`/detail/${blog.id}`">
            <h3>{{ blog.title }}</h3>
            <p>
              {{ blog.description }}
            </p>
          </router-link>
          <div class="edit-delete-button">
            <router-link :to="`/Edit/${blog.id}`">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
              ></el-button>
            </router-link>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-delete"
              @click="onDelete(blog.id)"
            ></el-button>
          </div>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userBlogs: [],
      page: 1,
      total: 1
    };
  },
  created() {
    this.page = this.$route.query.page || 1;
    blog.getBlogsByUserId(this.user.id, { page: this.page }).then(res => {
      this.userBlogs = res.data;
      this.page = res.page;
      this.total = res.total;
    });
  },
  computed: {
    ...mapGetters(["user", "isLogin"])
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
      blog.getBlogsByUserId(this.user.id, { page: newPage }).then(res => {
        this.userBlogs = res.data;
        this.page = res.page;
        this.total = res.total;
        this.$router.push({
          path: "/my",
          query: { page: newPage }
        });
      });
    },
    onDelete(blogId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          blog.deleteBlog({ blogId }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.userBlogs = this.userBlogs.filter(blog => blog.id !== blogId);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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
      grid-row: 2;
      margin: 8px 0;
    }

    .edit-delete-button {
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
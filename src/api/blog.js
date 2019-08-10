import request from '@helpers/request.js'

let URL = {
  GET_LIST: '/blog',
  GET_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPDATE: '/blog/:blogId',
  DELETE: '/blog/:blogId'
}

export default {
  getBlog({ page = 1, userId, atIndex } = { page: 1 }) {
    return request(URL.GET_LIST, 'GET', { page, userId, atIndex })
  },

  getIndexBlogs({ page = 1 } = { page: 1 }) {
    return this.getBlogs({ page, atIndex: true })
  },

  getBlogsByUserId(userId, { page = 1, atIndex } = { page: 1 }) {
    return this.getBlogs({ userId, page, atIndex })
  },

  //获取某个帖子的详情
  getDetail({ blogId }) {
    return request(URL.GET_DETAIL.replace(':blogId', blogId))
  },

  createBlog({ title = '', content = '', description = '', atIndex = false } = { title: '', content: '', description: '', atIndex: false }) {
    return request(URL.CREATE, 'POST', { title, content, description, atIndex })
  },

  updateBlog({ blogId }, { title, content, description, atIndex }) {
    return request(URL.UPDATE.replace(':blogID', blogId), 'PATCH', { title, content, description, atIndex })
  },

  deleteBlog({ blogId }) {
    return request(URL.DELETE.replace(':blogID', blogId), 'DELETE')
  }
}


import auth from '@/api/auth'
import {Message} from 'element-ui'

export default {
  state: {
    user: null,
    isLogin: false
  },
  getters: {
    user: state => state.user,
    isLogin: state => state.isLogin
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return auth.login({ username, password })
        .then(res => {
          commit('setUser', { user: res.data })
          commit('setLogin', { isLogin: true })
          Message.success('登陆成功')
        })
    },

    async register({ commit }, { username, password }) {
      let res = await auth.register({ username, password })
      commit('setUser', { user: res.data })
      commit('setLogin', { isLogin: true })
      Message.success('注册成功')
      return res.data
    },

    async logout({ commit }) {
      await auth.logout()
      commit('setUser', { user: null })
      commit('setLogin', { isLogin: false })
      Message.success('注销成功')
    },

    async checkLogin({ commit, state }) {
      if (state.isLogin) return true
      let res = await auth.getInfo()
      commit('setLogin', { isLogin: res.isLogin })
      if (!res.isLogin) return false
      commit('setUser', { user: res.data })
      return true
    }

  }
}
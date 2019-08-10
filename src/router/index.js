import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Index
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }]
})
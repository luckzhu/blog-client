import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Create from "../components/create.vue"
import Edit from "../components/Edit.vue"
import My from "../components/My.vue"
import User from "../components/User.vue"
import Detail from "../components/Detail.vue"

Vue.use(Router)

const router = new Router({
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
    },
    {
        path: '/create',
        component: Create,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit/:blogId',
        component: Edit,
        meta: { requiresAuth: true }
    },
    {
        path: '/my',
        component: My,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/:userId',
        component: User
    },
    {
        path: '/detail/:blogId',
        component: Detail
    }
    ]
})

import store from "../store"

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        store.dispatch('checkLogin').then(isLogin=>{
            if (!isLogin) {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        })
       
    } else {
        next() // 确保一定要调用 next()
    }
})

export default router

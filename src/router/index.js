import Vue from 'vue'
import Router from 'vue-router'

// import Index from "@/components/Index.vue"
// import Login from "@/components/Login.vue"
// import Register from "@/components/Register.vue"
// import Create from "@/components/create.vue"
// import Edit from "@/components/Edit.vue"
// import My from "@/components/My.vue"
// import User from "@/components/User.vue"
// import Detail from "@/components/Detail.vue"

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        component: () => import("@/components/Index.vue")
    },
    {
        path: '/login',
        component: () => import("@/components/Login.vue")

    },
    {
        path: '/register',
        component: () => import("@/components/Register.vue")
    },
    {
        path: '/create',
        component: () => import("@/components/Create.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/edit/:blogId',
        component: () => import("@/components/Edit.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/my',
        component: () => import("@/components/My.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/user/:userId',
        component: () => import("@/components/User.vue")
    },
    {
        path: '/detail/:blogId',
        component: () => import("@/components/Detail.vue")
    }
    ]
})

import store from "../store"

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        store.dispatch('checkLogin').then(isLogin => {
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

import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

const dashboardRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: '首页',
                },
            },
        ],
    },
]

export default dashboardRoutes

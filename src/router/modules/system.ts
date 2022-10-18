import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

const systemRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/system/user',
        children: [
            {
                path: '/system/user',
                name: 'system.user',
                component: () => import('@/views/system/user.vue'),
                meta: {
                    title: '用户管理',
                },
            },
        ],
    },
]

export default systemRoutes

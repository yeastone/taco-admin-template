import { RouteRecordRaw } from 'vue-router'
import dashboardRoutes from './modules/dashboard'
import systemRoutes from './modules/system'

const commonRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/views/index.vue'),
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login/index.vue'),
                meta: {
                    title: '登录',
                },
            },
        ],
    },
    ...dashboardRoutes,
    ...systemRoutes,
]

export default commonRoutes

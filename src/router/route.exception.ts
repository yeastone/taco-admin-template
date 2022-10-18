// 跟鉴权无关的特殊路由
import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

const exceptionRoutes: Array<RouteRecordRaw> = [
    {
        path: '/error',
        component: Layout,
        redirect: '/error/401',
        meta: {
            title: '错误页面',
        },
        children: [
            {
                path: '/error/401',
                name: '401',
                meta: {
                    title: '需要登录',
                },
                component: () => import('@/views/exception/401.vue'),
            },
            {
                path: '/error/404',
                name: '404',
                meta: {
                    title: '非常抱歉,页面走丢了',
                },
                component: () => import('@/views/exception/404.vue'),
            },
            {
                path: '/:pathMatch(.*)',
                meta: {},
                redirect: '/404',
            },
        ],
    },
]

export default exceptionRoutes

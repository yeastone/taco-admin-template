<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group appear name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <span v-if="index === levelList.length - 1" class="breadcrumb-label no-redirect">{{
                    item.meta.title
                }}</span>
                <a v-else @click.prevent="handleLink(item, index)"> {{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched, RouteRecordRaw } from 'vue-router'
import { getParentPaths, findRouteByPath } from '@/router/utils'

const route = useRoute()
const levelList = ref([])
const router = useRouter()
const routes = router.options.routes as RouteRecordRaw[]

const baseRoute = {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
        title: '首页',
    },
}

const getBreadcrumb = (): void => {
    const matched = [{ ...baseRoute }]
    let currentRoute = router.currentRoute.value.path
    if (currentRoute === '/dashboard') {
        levelList.value = matched
        return
    }
    // console.log(route, routes)
    const parentRoutes = getParentPaths(currentRoute, routes)
    console.log(currentRoute, parentRoutes)
    parentRoutes.forEach(path => {
        if (path !== '/') {
            matched.push(findRouteByPath(path, routes))
        }
    })
    matched.push(findRouteByPath(currentRoute, routes))
    levelList.value = matched.filter(item => item?.meta && item?.meta.title !== false)
}
getBreadcrumb()
watch(
    () => route.path,
    () => getBreadcrumb()
)
const handleLink = (item: RouteLocationMatched, index: number): any => {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect.toString())
        return
    }
    router.push(path)
}
</script>
<style lang="less" scoped>
.app-breadcrumb {
    margin-left: 10px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>

<template>
    <div class="side-bar" :class="{ 'hide-side-bar': !sidebarExpend }">
        <Logo :expend="sidebarExpend"></Logo>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :collapse="!sidebarExpend"
                mode="vertical"
                class="sidebar-menu"
                :default-active="route.path"
                router
            >
                <sidebar-item v-for="item in menuConfig" :key="item.key" :item="item"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAppStoreHook } from '@/store/modules/app'
import Logo from './logo.vue'
import SidebarItem from './sidebarItem.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const routers = useRouter().options.routes
const sidebarExpend = computed(() => {
    return useAppStoreHook().sidebarExpand
})
watch(route, route => {
    console.log(route)
})
const menuConfig = ref([
    {
        name: '首页',
        icon: 'icon-electronics',
        route: '/dashboard',
        key: 'dashboard',
        subMenuList: [],
    },
    {
        name: '用户管理',
        icon: 'icon-meh',
        route: '/system/user',
        key: 'user',
        subMenuList: [],
    },
    {
        name: '错误页面',
        icon: 'icon-warning',
        route: '',
        key: 'error',
        subMenuList: [
            {
                name: '401',
                route: '/error/401',
                key: 'error.401',
            },
            {
                name: '404',
                route: '/error/404',
                key: 'error.404',
            },
        ],
    },
])
</script>
<style lang="less" scoped>
.side-bar {
    transition: width 0.3s;
    // width: 100px;
    // background: #1c9399;
    width: 210px;
    height: 100%;
    overflow: hidden;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 10px;
        width: 2px;
        height: 40px;
        // transform: translate(-0, -50%);
        background: #409eff;
        opacity: 0.6;
    }
    .el-menu {
        border-right: none;
        .el-menu-item {
            text-align: left;
            i {
                font-size: 14px;
                display: inline-block;
            }
        }
    }
}
.hide-side-bar {
    transition-duration: 0.3s;
    width: 54px !important;
    // transform: translate3d(0, 0, 0);
}
</style>

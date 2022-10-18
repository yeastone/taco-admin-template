<template>
    <div class="nav-bar">
        <div class="sidebar-expend">
            <el-icon @click="toggleSidebar">
                <Expand v-if="!sidebarExpand" />
                <Fold v-else />
            </el-icon>
        </div>

        <BreadCrumb class="breadcrumb-container"></BreadCrumb>

        <div class="nav-bar-right">
            <fullscreen></fullscreen>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <img v-if="avatar" :src="avatar" :style="avatarStyle" />
                    <p v-if="username">{{ username }}</p>
                </span>
                <template #dropdown>
                    <el-dropdown-menu class="logout">
                        <el-dropdown-item @click="logout">
                            <i class="iconfont icon-sign-out"></i>
                            <span>退出登录</span></el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { useAppStoreHook } from '@/store/modules/app'
import { useUserStoreHook } from '@/store/modules/user'
import BreadCrumb from './breadCrumb.vue'
import fullscreen from '../fullscreen/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarExpand = computed(() => {
    return useAppStoreHook().sidebarExpand
})
const username = computed(() => useUserStoreHook().name)
const avatar = computed(() => useUserStoreHook().avatar)
const avatarStyle = computed(() => {
    return username ? { marginRight: '10px' } : ''
})

const toggleSidebar = () => {
    console.log(sidebarExpand, useAppStoreHook())
    useAppStoreHook().SET_SIDEBAR_EXPAND(!sidebarExpand.value)
}

function logout() {
    window.sessionStorage.removeItem('access-token')
    router.push('/login')
}
</script>
<style lang="less" scoped>
.nav-bar {
    width: 100%;
    height: 100%;
    padding: 0 0 0 20px;
    display: flex;
    align-items: center;
    .sidebar-expend {
        font-size: 22px;
        cursor: pointer;
        height: 22px;
        &:hover {
            color: #409eff;
        }
    }
    .nav-bar-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        min-width: 280px;
        height: 100%;
        .full-screen,
        .el-dropdown-link {
            cursor: pointer;

            &:hover {
                background: #f6f6f6;
                color: #409eff;
            }
        }
        .el-dropdown-link {
            // height: 48px;
            height: 100%;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            cursor: pointer;
            // color: $subMenuActiveText;

            // &:hover {
            //   background: $menuHover;
            // }

            p {
                font-size: 14px;
            }

            img {
                width: 22px;
                height: 22px;
                border-radius: 50%;
            }
        }
    }
}
</style>

<template>
    <div class="layout-wrap">
        <sidebar></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <div class="app-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import sidebar from './components/sidebar/index.vue'
import navbar from './components/navbar/index.vue'
</script>
<style lang="less" scoped>
.layout-wrap {
    width: 100%;
    height: 100%;
    display: flex;

    .main-container {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;

        .nav-bar {
            height: 60px;
            width: 100%;
        }

        .app-main {
            flex: 1;
            background: #f7faf8;
            width: 100%;
            padding: 20px;
        }
    }
}
</style>

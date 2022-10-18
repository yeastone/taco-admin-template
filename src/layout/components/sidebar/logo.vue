<template>
    <router-link to="/">
        <div class="sidebar-logo-container">
            <div class="logo-wrap">
                <img class="sidebar-logo-img" src="../../../assets/taco.svg" />
            </div>
            <span class="sidebar-logo-title" v-if="props.expend">{{ title }}</span>
        </div>
    </router-link>
</template>
<script setup lang="ts">
const props = defineProps({
    expend: Boolean,
})

const title = 'TacoAdmin'
</script>
<style lang="less" scoped>
.sidebar-logo-container {
    width: 100%;
    height: 60px;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    .logo-wrap {
        width: 60px;
        height: 56px;
        padding: 8px 10px;
        .sidebar-logo-img {
            width: 100%;
            height: 100%;
        }
    }

    .sidebar-logo-title {
        color: #1890ff;
        font-weight: 600;
        font-size: 20px;
        margin-top: 10px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
}
</style>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
    <div class="full-screen" @click="toggle">
        <i
            class="iconfont"
            :title="isFullscreen ? '退出全屏' : '全屏'"
            :class="isFullscreen ? 'icon-fullscreen-shrink' : 'icon-fullscreen-expand'"
        ></i>
    </div>
</template>

<style lang="less" scoped>
.full-screen {
    width: 48px;
    height: 100%px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    i {
        font-size: 18px;
    }
}
</style>

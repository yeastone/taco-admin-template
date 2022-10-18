<template>
    <div class="verification-code">
        <el-image class="verification-code_image" fit="fill" :src="img">
            <template #error>
                <div class="image-slot">
                    <el-icon><icon-picture /></el-icon>
                </div>
            </template>
        </el-image>
    </div>
</template>

<script setup lang="ts">
import { Picture as IconPicture, Loading } from '@element-plus/icons-vue'

const props = defineProps({
    img: String,
})
</script>
<style lang="less" scoped>
.verification-code {
    width: 120px;
    height: 38px;
    cursor: pointer;
    &_image {
        width: 100%;
        height: 100%;
        :deep(.image-slot) {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>

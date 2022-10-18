<template>
    <template v-if="hasSub(props.item)">
        <el-sub-menu :index="props.item.route">
            <template #title>
                <div class="menu-icon">
                    <i v-if="props.item.icon" class="iconfont" :class="props.item.icon"></i>
                </div>

                <span>{{ props.item.name }}</span>
            </template>
            <sidebar-item v-for="child in props.item.subMenuList" :key="child.key" :item="child"></sidebar-item>
        </el-sub-menu>
    </template>
    <el-menu-item v-else :index="props.item.route">
        <div class="menu-icon">
            <i v-if="props.item.icon" class="iconfont" :class="props.item.icon"></i>
        </div>
        <template #title>{{ props.item.name }}</template>
    </el-menu-item>
</template>
<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { menuItemType } from '../../types'

const props = defineProps({
    item: {
        type: Object as PropType<menuItemType>,
        required: true,
    },
})
const hasSub = (item: menuItemType) => {
    if (item && item.subMenuList && item.subMenuList.length > 0) {
        return true
    } else {
        return false
    }
}
</script>

<style lang="less" scoped>
.menu-icon {
    width: 20px;
    vertical-align: middle;
    margin-right: 9px;
    font-size: 18px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // flex-basis: 24px;
    i {
        font-size: 20px;
    }
}
.el-menu--collapse {
    .is-active {
        // &::after {
        //     content: '';
        //     position: absolute;
        //     width: 3px;
        //     height: 100%;
        //     left: 0;
        //     top: 0;
        //     background: @main-color;
        //     transition: all 0.2s ease-in-out;
        //     transform: translateY(0);
        // }
    }
}
</style>

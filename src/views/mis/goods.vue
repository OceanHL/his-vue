<template>
    <div v-if="isAuth([ROOT, GOODS_SELECT])">体检套餐</div>
</template>

<script setup lang="ts">
import type {
    ComponentInternalInstanceI,
    IsAuthFn,
    HttpFn,
} from "./types/globalType";
import { PermissionEnum } from "@/utils/isAuth";

const { proxy, appContext } =
    getCurrentInstance() as ComponentInternalInstanceI;

const isAuth = appContext.config.globalProperties.$isAuth as IsAuthFn;
const http = appContext.config.globalProperties.$http as HttpFn;

// 权限
const { ROOT, GOODS_SELECT } = PermissionEnum;
</script>

<style lang="less" scoped>
@import url(./styles/goods.less);
</style>

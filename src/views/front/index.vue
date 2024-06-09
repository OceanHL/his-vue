<template>
    <div>
        index
        <h3>{{ msg }}</h3>
        <p>
            <el-button type="primary" @click="changeMsg">Primary</el-button>
        </p>
        <p>
            <!-- 
              使用自定义SvgIcon标签引入 icon-assurance_fill.svg 文件，
              不需要写 icon-前缀，和 .svg后缀 
            -->
            <SvgIcon name="assurance_fill" class="icon-svg" />
        </p>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
const msg: Ref<string> = ref("HelloWorld");
const changeMsg = () => {
    msg.value = "Hello Vue 3";
};
</script>

<style scoped></style>

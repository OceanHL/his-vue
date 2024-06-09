<template>
  <div class="content">
    <div class="title">诶呀，你访问的页面不存在！</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: 100%;
  background-image: url(@/assets/404.jpg);
  background-size: cover; /* cover 缩放背景图片（保持原有比例）以完全覆盖背景区，可能背景图片部分看不见。 */
  background-position: center;
  .title {
    font-size: 28px;
    color: #888;
    padding-top: 100px;
    user-select: none;
  }
}
</style>

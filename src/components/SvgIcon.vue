<template>
    <svg aria-hidden="true">
        <use :href="symbolId" :fill="color" />
    </svg>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "SvgIcon",
    props: {
        prefix: {
            type: String,
            default: "icon", // 引用SVG文件的时候省去文件名icon前缀
        },
        name: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`);
        const color = computed(() => props.color);
        return { symbolId, color };
    },
});
</script>

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// 导入ElementPlus相关依赖库
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 配置SVG依赖库
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const pathSrc = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ["vue"],
            // 配置按需自动加载 ElementPlus 控件
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
            ],
        }),
        // 引入ElementPlus控件库
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [resolve(process.cwd(), "src/icons/svg")],
            // Specify symbolId format
            symbolId: "[name]",
        }),
    ],
    server: {
        host: "localhost",
        port: 7600,
        cors: true, // 允许跨域
    },
    resolve: {
        alias: {
            // 设置文件./src路径为 @
            "@": pathSrc,
        },
    },
});

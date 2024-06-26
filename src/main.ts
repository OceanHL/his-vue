import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/index.scss";
import router from "@/router";

// 引入ElementPlus的CSS文件，否则MasOS系统会出现控件丢失样式
import "element-plus/dist/index.css";

// 引入ElementPlus组件库
import ElementPlus from "element-plus";

// 让日历控件每周从星期一开始，导入简体中文
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'; // 官方给出的引用有类型问题，使用以下方式
import zhCn from "element-plus/es/locale/lang/zh-cn";

// 使用ElementPlus自带的图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 导入SVG依赖库，可以在页面上显示SVG图片
import "virtual:svg-icons-register";

// 导入后端URL路径、Minio服务器地址、全局http方法
import { baseUrl, minioUrl, http } from "@/api/http";
import { isAuth } from "@/utils/isAuth";

const app = createApp(App);

// 导入路由配置
app.use(router);

// 导入ElementPlus
app.use(ElementPlus, {
    locale: zhCn, // 使用中文
});

// 导入ElementPlus所有自带图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 设置全局变量$baseUrl（后端项目URL根路径）
app.config.globalProperties.$baseUrl = baseUrl;

// 设置全局变量$minioUrl（Minio服务器地址）
app.config.globalProperties.$minioUrl = minioUrl;

// 设置全局变量$http（全局Ajax公共函数）
app.config.globalProperties.$http = http;

// 封装用于判断用户是否具有某些权限的公共函数
app.config.globalProperties.$isAuth = isAuth;

app.mount("#app");

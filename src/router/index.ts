import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const history = createWebHistory();
const routes: Array<RouteRecordRaw> = [
    {
        path: "/front",
        name: "Front",
        component: () => import("../views/front/main.vue"),
        children: [
            {
                path: "index", // 开头不能加斜线
                name: "FrontIndex",
                component: () => import("../views/front/index.vue"),
            },
            {
                path: "goods/:id", // 传入商品ID
                name: "FrontGoods",
                component: () => import("../views/front/goods.vue"),
            },
        ],
    },
    {
        path: "/mis",
        name: "Main",
        component: () => import("../views/mis/main.vue"),
        children: [
            {
                path: "home",
                name: "MisHome",
                component: () => import("../views/mis/home.vue"),
                meta: {
                    title: "首页",
                },
            },
            {
                path: "dept",
                name: "MisDept",
                component: () => import("../views/mis/dept.vue"),
                meta: {
                    title: "部门管理",
                    isTab: true,
                },
            },
            {
                path: "role",
                name: "MisRole",
                component: () => import("../views/mis/role.vue"),
                meta: {
                    title: "角色管理",
                    isTab: true,
                },
            },
            {
                path: "user",
                name: "MisUser",
                component: () => import("../views/mis/user.vue"),
                meta: {
                    title: "用户管理",
                    isTab: true,
                },
            },
            // 体检套餐
            {
                path: "goods",
                name: "MisGoods",
                component: () => import("../views/mis/goods.vue"),
                meta: {
                    title: "体检套餐",
                    isTab: true,
                },
            },
        ],
    },
    {
        path: "/mis/login",
        name: "MisLogin",
        component: () => import("@/views/mis/login.vue"),
    },
    {
        path: "/404",
        name: "/404",
        component: () => import("@/views/404.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404", // 重定向到 /404 路径
    },
];

const router = createRouter({
    history,
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    const permissions = localStorage.getItem("permissions"); // 权限字符串
    const token = localStorage.getItem("token"); // token 字符串
    const fullPath = to.fullPath;
    // 以/mis开头的路径，若未登录，则跳转到登录页面
    if (fullPath.startsWith("/mis") && fullPath != "/mis/login") {
        if (
            permissions == null ||
            permissions == "" ||
            token == null ||
            token == ""
        ) {
            next({ name: "MisLogin" }); // 跳转到mis的login页面
        } else {
            return next();
        }
    } else if (
        fullPath.startsWith("/front/customer") || // 客户页面
        fullPath.startsWith("/front/goods_snapshot") // 商品快照页面
    ) {
        if (token == null || token == "") {
            // 业务端都具有相同的权限，所以不需要校验 permissions
            next({ name: "FrontIndex" });
        } else {
            // 登录过
            return next();
        }
    } else {
        return next();
    }
});

export default router;

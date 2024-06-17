<template>
    <!-- 最小宽度修改为1500px（默认值为1800px） -->
    <div
        class="site-wrapper"
        :class="{ 'site-sidebar--fold': sidebar.sidebarFold }"
        v-loading.fullscreen.lock="loading"
        element-loading-text="拼命加载中"
    >
        <!-- 头部区域 -->
        <nav
            class="site-navbar"
            :class="{ 'site-navbar--fold': sidebar.sidebarFold }"
        >
            <div class="site-navbar__header">
                <h1 class="site-navbar__brand">
                    <a href="" class="site-navbar__brand-lg">
                        神州大健康体检系统
                    </a>
                    <a href="" class="site-navbar__brand-mini"> 体检 </a>
                </h1>
            </div>
            <div
                class="navbar-container"
                :class="{ 'navbar-container--fold': sidebar.sidebarFold }"
            >
                <!-- 菜单栏折叠 -->
                <div class="switch" @click="handleSwitch">
                    <SvgIcon name="zhedie" class="icon-svg" />
                </div>
                <!-- 用户信息 -->
                <div class="right-container">
                    <el-dropdown>
                        <!-- 用户名 -->
                        <span class="el-dropdown-link">
                            <span class="avatar-container">
                                <el-avatar
                                    shape="circle"
                                    :size="25"
                                    :src="user.photo"
                                    :icon="UserFilled"
                                ></el-avatar>
                            </span>
                            {{ user.name }}
                        </span>
                        <!-- 修改密码、退出 -->
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="updatePassword">
                                    修改密码
                                </el-dropdown-item>
                                <el-dropdown-item @click="logout">
                                    退出
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </nav>

        <!-- 左侧菜单栏区域 -->
        <aside class="site-sidebar site-sidebar--dark">
            <div class="site-sidebar__inner">
                <!-- 菜单栏 -->
                <el-menu
                    :default-active="siteContent.menuActiveName || 'Home'"
                    :collapse="sidebar.sidebarFold"
                    :collapseTransition="false"
                    @open="handleOpen"
                    @close="handleClose"
                    class="site-sidebar__menu"
                    background-color="#263238"
                    active-text-color="#fff"
                    text-color="#8a979e"
                >
                    <!-- 首页 -->
                    <el-menu-item
                        index="Home"
                        @click="$router.push({ name: 'MisHome' })"
                    >
                        <el-icon>
                            <SvgIcon name="home" class="icon-svg" />
                        </el-icon>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <!-- 组织管理 -->
                    <el-sub-menu
                        index="组织管理"
                        :popper-class="
                            'site-sidebar--' +
                            sidebar.sidebarLayoutSkin +
                            '-popper-class'
                        "
                    >
                        <template #title>
                            <el-icon>
                                <SvgIcon name="users_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">组织管理</span>
                        </template>
                        <!-- 部门管理 -->
                        <el-menu-item
                            index="MisDept"
                            @click="router.push({ name: 'MisDept' })"
                        >
                            <el-icon>
                                <SvgIcon name="company_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">部门管理</span>
                        </el-menu-item>
                        <!-- 角色管理 -->
                        <el-menu-item
                            index="MisRole"
                            @click="$router.push({ name: 'MisRole' })"
                        >
                            <el-icon>
                                <SvgIcon name="role_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">角色管理</span>
                        </el-menu-item>
                        <!-- 用户管理 -->
                        <el-menu-item
                            index="MisUser"
                            @click="$router.push({ name: 'MisUser' })"
                        >
                            <el-icon>
                                <SvgIcon name="user_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <!-- 业务管理 -->
                    <el-sub-menu
                        index="业务管理"
                        :popper-class="
                            'site-sidebar--' +
                            sidebar.sidebarLayoutSkin +
                            '-popper-class'
                        "
                    >
                        <template #title>
                            <el-icon>
                                <SvgIcon name="trust_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">业务管理</span>
                        </template>
                        <!-- 体检套餐 -->
                        <el-menu-item
                            index="MisGoods"
                            v-if="isAuth(['ROOT', 'GOODS:SELECT'])"
                            @click="$router.push({ name: 'MisGoods' })"
                        >
                            <el-icon>
                                <SvgIcon name="goods_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">体检套餐</span>
                        </el-menu-item>
                        <!-- 促销规则 -->
                        <el-menu-item
                            index="MisRule"
                            v-if="isAuth(['ROOT', 'RULE:SELECT'])"
                            @click="$router.push({ name: 'MisRule' })"
                        >
                            <el-icon>
                                <SvgIcon name="rule_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">促销规则</span>
                        </el-menu-item>
                        <!-- 客户档案 -->
                        <el-menu-item
                            index="MisCustomer"
                            v-if="isAuth(['ROOT', 'CUSTOMER:SELECT'])"
                            @click="$router.push({ name: 'MisCustomer' })"
                        >
                            <el-icon>
                                <SvgIcon
                                    name="customer_fill"
                                    class="icon-svg"
                                />
                            </el-icon>
                            <span slot="title">客户档案</span>
                        </el-menu-item>
                        <!-- 订单管理 -->
                        <el-menu-item
                            index="MisOrder"
                            v-if="isAuth(['ROOT', 'ORDER:SELECT'])"
                            @click="$router.push({ name: 'MisOrder' })"
                        >
                            <el-icon>
                                <SvgIcon name="order_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                        <!-- 客服IM -->
                        <el-menu-item
                            index="MisCustomerIm"
                            v-if="isAuth(['ROOT', 'CUSTOMER:SELECT'])"
                            @click="$router.push({ name: 'MisCustomerIm' })"
                        >
                            <el-icon>
                                <SvgIcon name="im_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">客服IM</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <!-- 体检管理 -->
                    <el-sub-menu
                        index="体检管理"
                        :popper-class="
                            'site-sidebar--' +
                            sidebar.sidebarLayoutSkin +
                            '-popper-class'
                        "
                    >
                        <template #title>
                            <el-icon>
                                <SvgIcon name="night_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">体检管理</span>
                        </template>
                        <!-- 体检预约 -->
                        <el-menu-item
                            index="MisAppointment"
                            v-if="isAuth(['ROOT', 'APPOINTMENT:SELECT'])"
                            @click="$router.push({ name: 'MisAppointment' })"
                        >
                            <el-icon>
                                <SvgIcon
                                    name="appointment_fill"
                                    class="icon-svg"
                                />
                            </el-icon>
                            <span slot="title">体检预约</span>
                        </el-menu-item>
                        <!-- 体检签到 -->
                        <el-menu-item
                            index="MisCustomerCheckin"
                            v-if="isAuth(['ROOT', 'CUSTOMER_CHICKIN:SELECT'])"
                            @click="
                                $router.push({ name: 'MisCustomerCheckin' })
                            "
                        >
                            <el-icon>
                                <SvgIcon name="checkin_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">体检签到</span>
                        </el-menu-item>
                        <!-- 预约设置 -->
                        <el-menu-item
                            index="MisAppointmentRestriction"
                            v-if="
                                isAuth([
                                    'ROOT',
                                    'APPOINTMENT_RESTRICTION:SELECT',
                                ])
                            "
                            @click="
                                $router.push({
                                    name: 'MisAppointmentRestriction',
                                })
                            "
                        >
                            <el-icon>
                                <SvgIcon name="setting_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">预约设置</span>
                        </el-menu-item>
                        <!-- 医生检查 -->
                        <el-menu-item
                            index="MisCheckup"
                            v-if="isAuth(['ROOT', 'CHECKUP:SELECT'])"
                            @click="$router.push({ name: 'MisCheckup' })"
                        >
                            <el-icon>
                                <SvgIcon name="doctor_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">医生检查</span>
                        </el-menu-item>
                        <!-- 体检报告 -->
                        <el-menu-item
                            index="MisCheckupReport"
                            v-if="isAuth(['ROOT', 'CHECKUP_REPORT:SELECT'])"
                            @click="$router.push({ name: 'MisCheckupReport' })"
                        >
                            <el-icon>
                                <SvgIcon name="file_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">体检报告</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <!-- 系统设置 -->
                    <el-sub-menu
                        index="系统设置"
                        :popper-class="
                            'site-sidebar--' +
                            sidebar.sidebarLayoutSkin +
                            '-popper'
                        "
                        v-if="isAuth(['ROOT', 'SYSTEM:SELECT'])"
                    >
                        <template #title>
                            <el-icon>
                                <SvgIcon name="system_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">系统设置</span>
                        </template>
                        <el-menu-item
                            index="MisFlowRegulation"
                            v-if="isAuth(['ROOT', 'FLOW_REGULATION:SELECT'])"
                            @click="$router.push({ name: 'MisFlowRegulation' })"
                        >
                            <el-icon>
                                <SvgIcon name="people_fill" class="icon-svg" />
                            </el-icon>
                            <span slot="title">人员限流</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </aside>

        <!-- 内容区域 -->
        <div class="site-content__wrapper">
            <main
                class="site-content"
                :class="{ 'site-content--tabs': $route.meta.isTab }"
            >
                <el-tabs
                    v-if="$route.meta.isTab"
                    v-model="siteContent.mainTabsActiveName"
                    :closable="true"
                    @tab-click="selectedTabHandle"
                    @tab-remove="removeTabHandle"
                >
                    <!-- 面板pane -->
                    <el-tab-pane
                        v-for="item in siteContent.mainTabs"
                        :label="item.title"
                        :name="item.name"
                        :key="item.name"
                    >
                        <el-card
                            :body-style="siteContent.siteContentViewHeight"
                        >
                            <router-view
                                :key="router.currentRoute.value.query.random"
                            />
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
                <el-card v-else :body-style="siteContent.siteContentViewHeight">
                    <router-view
                        :key="router.currentRoute.value.query.random"
                    />
                </el-card>
            </main>
        </div>

        <!-- 避免路由引用页面的时候浏览器不刷新内容（加载缓存），给URL添加随机数参数 -->
        <!-- <router-view :key="router.currentRoute.value.query.random" /> -->
    </div>

    <!-- 修改密码弹窗 -->
    <el-dialog title="提示" v-model="dialogVisible" width="25%">
        <el-form
            :model="dialog.dataForm"
            :rules="dialog.dataRule"
            ref="dialogForm"
            label-width="80px"
        >
            <!-- 原密码 -->
            <el-form-item label="原密码" prop="password">
                <el-input
                    type="password"
                    v-model="dialog.dataForm.password"
                    placeholder="原密码"
                    maxlength="20"
                    clearable
                />
            </el-form-item>
            <!-- 新密码 -->
            <el-form-item label="新密码" prop="newPassword">
                <el-input
                    type="password"
                    v-model="dialog.dataForm.newPassword"
                    maxlength="20"
                    clearable
                    placeholder="新密码"
                />
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                    type="password"
                    v-model="dialog.dataForm.confirmPassword"
                    maxlength="20"
                    clearable
                    placeholder="确认密码"
                />
            </el-form-item>
        </el-form>
        <!-- 取消、确定 -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false"> 取 消 </el-button>
                <el-button type="primary" @click="dialogFormSubmit">
                    确 定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
// import router from "@/router/index";
import type { ComponentInternalInstance } from "vue";
import type { RouteRecordNormalized } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
import { isURL } from "@/utils/validate";
import { useRouter, useRoute } from "vue-router";
import { UserFilled } from "@element-plus/icons-vue"; // 导入icon图标

// 用于获取路由参数
const route = useRoute();
// 用于切换路由引用的页面
const router = useRouter();
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance;
const isAuth = appContext.config.globalProperties.$isAuth;
const http = appContext.config.globalProperties.$http;

// loading加载
const loading = ref(false);

// 左边-菜单栏常量
const sidebar = reactive({
    sidebarFold: false, // 是否折叠左边栏
    sidebarLayoutSkin: "dark", // 主题
});

// 内容区相关常量（后续用到）
const siteContent = reactive({
    documentClientHeight: 0,
    siteContentViewHeight: {},
    height: null,
    // 数据里面每个元素就是要给Tab
    mainTabs: [],
    // 记录当前选中的Tab标签
    mainTabsActiveName: "",
    // 记录当前选中的菜单项
    menuActiveName: "组织管理", // 菜单默认选中
});

// 用户信息常量
const user = reactive({
    name: "", // 用户姓名
    photo: "", // 头像
    updatePasswordVisible: false, // 修改密码弹窗是否显示
});

// 修改密码弹窗是否显示
const dialogVisible = ref(false);
// 再次输入密码校验
const validateConfirmPassword = (rule, value, callback) => {
    if (value != dialog.dataForm.newPassword) {
        callback(new Error("两次输入的密码不一致"));
    } else {
        callback();
    }
};
// 修改密码弹窗相关常量
const dialog = reactive({
    dataForm: {
        password: "",
        newPassword: "",
        confirmPassword: "",
    },
    dataRule: {
        password: [
            {
                required: true,
                pattern: "^[a-zA-Z0-9]{6,20}$",
                message: "密码格式错误",
            },
        ],
        newPassword: [
            {
                required: true,
                pattern: "^[a-zA-Z0-9]{6,20}$",
                message: "密码格式错误",
            },
        ],
        confirmPassword: [
            {
                required: true,
                pattern: "^[a-zA-Z0-9]{6,20}$",
                message: "密码格式错误",
            },
            {
                validator: validateConfirmPassword,
                trigger: "blur",
            },
        ],
    },
});

// 菜单栏折叠
const handleSwitch = () => {
    sidebar.sidebarFold = !sidebar.sidebarFold;
};

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

// 路径跳转
const routeHandle = (route) => {
    // 每次切换页面时，重新计算页面高度和内容区高度
    resetDocumentClientHeight();
    loadSiteContentViewHeight();

    // 判断是否要创建Tab控件
    if (route?.meta?.isTab) {
        /**
         * 创建Tab控件之前，先判断mainTabs[]数组中是否存在该Vue页面的Tab控件。
         * 比如我们要访问角色管理页面，程序先要判断是否存在角色管理* 页面的Tab控件。
         * 如果不存在就创建Tab控件;如果存在就不创建新的Tab控件，直接切换到现有的Tab控件
         */
        const tabs = siteContent.mainTabs.filter(
            (item) => item.name === route.name
        );
        if (!tabs.length) {
            const tab = {
                title: route.meta.title,
                name: route.name,
            };
            siteContent.mainTabs.push(tab);
        }

        // 选中某个菜单项
        const name = tabs[0].name;
        siteContent.menuActiveName = name;
        siteContent.mainTabsActiveName = name;
    } else {
        siteContent.mainTabs = [];
        // 取消选中某个Tab控件
        siteContent.menuActiveName = "";
        // 选中某个菜单项
        siteContent.mainTabsActiveName = "Home";
    }
};
/**
 * 载入框架页面就立即执行routeHandle()函数，把当前路由加载页面对应的Tab控件选中
 * 例如直接访问htto://localhost:7600/mis/role页面，需要让框架页面创建Tab控件，并且选中该Tab
 */
routeHandle(route);

/**
 * 框架页面的路由标签每次切换引用的页面，就调用routeHandle(),
 * 判断一下是创建新的Tab控件，还是切换到现有的Tab控件
 */
watch(
    () => router,
    () => {
        routeHandle(route);
    },
    {
        deep: true, // 深层次监控
        immediate: true, // 立即监控
    }
);

// 计算网页可见区域的高度
function resetDocumentClientHeight() {
    // 获取网页可见区域的高度
    siteContent.documentClientHeight = document.documentElement.clientHeight;
}

// 计算内容区卡片控件高度
function loadSiteContentViewHeight() {
    // 卡片控件高度 = 网页可见区域高度 - 导航区高度 - 卡片控件上下外填充 - 上下边框
    let height = siteContent.documentClientHeight - 50 - 30 - 2 - 39;
    if (route.meta.isTab) {
        // 如果引用的Vue页面需要Tab控件，卡片控件高度还要减去 40
        height -= 54;
    }
    // 保存卡片控件高度
    siteContent.height = height;
    // 声明CSS样式
    siteContent.siteContentViewHeight = { minHeight: height + "px" };
}

// 浏览器尺寸发生变化的回调函数
window.onresize = () => {
    // 更新保存的网页可见区域高度
    resetDocumentClientHeight();
    // 重新计算内容区的高度
    loadSiteContentViewHeight();
};

// 选中某个菜单tab
const selectedTabHandle = (tab) => {
    router.push({
        // 使用Vue页面路由作为Tab面板的名字
        name: tab.paneName,
    });
};

// 关闭某个菜单tab
const removeTabHandle = (tabName: string) => {
    // 从mainTabs数组中删除要关闭的Tab【保留不等于tabName的Tab】
    siteContent.mainTabs = siteContent.mainTabs.filter(
        (item) => item.name !== tabName
    );

    // 如果还存在Tab，就切换到最后的Tab上面【说明删除的不是最后一个】
    if (siteContent.mainTabs.length >= 1) {
        // 获取mainTabs数组最后一个元素
        let tab = siteContent.mainTabs[siteContent.mainTabs.length - 1];
        // 选中这个Tab控件
        siteContent.mainTabsActiveName = tab.name;
        // 内容区气候引用的页面
        router.push({ name: tab.name });
    } else {
        // 没有Tab时，切换到主页
        siteContent.mainTabsActiveName = "";
        router.push({ name: "MisHome" });
    }
};

// 退出登录
const logout = () => {
    http("/mis/user/logout", "GET", null, true, (resp) => {
        localStorage.removeItem("token");
        localStorage.removeItem("permissions");
        router.push({ name: "MisLogin" });
    });
};

// 修改密码，显示密码修改弹框
const updatePassword = () => {
    dialogVisible.value = true;
    // 清空上一次的验证结果
    proxy?.$nextTick(() => {
        // (proxy.$refs["dialogForm"] as any).clearValidate(); // 清空上一次的校验
        // 通过 ref 属性找到指向的组件，清空表单值
        (proxy.$refs["dialogForm"] as any).resetFields();
    });
};

const dialogFormSubmit = () => {
    // 验证Form表单中的控件内容
    (proxy?.$refs["dialogForm"] as any).validate((valid: boolean) => {
        // 验证失败
        if (!valid) return;
        // 验证通过，提交表单
        const data = {
            password: dialog.dataForm.password,
            newPassword: dialog.dataForm.newPassword,
        };
        http("/mis/user/updatePassword", "post", data, true, (resp: any) => {
            if (resp.rows == 0) {
                (proxy as any)?.$message({
                    message: "密码修改失败",
                    type: "error",
                    duration: 1200,
                });
                return;
            }

            // 密码修改成功
            (proxy as any)?.$message({
                message: "密码修改成功，请重新登录",
                type: "success",
                duration: 1200,
                onClose: () => {
                    // 关闭弹窗
                    dialogVisible.value = false;
                    // 退出登录
                    logout();
                },
            });
        });
    });
};
</script>

<style scoped lang="scss">
// @import url(main.less);
@import "@/assets/scss/index.scss";

.avatar-container {
    vertical-align: -8px; // 行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式
    margin-right: 5px;
}
</style>

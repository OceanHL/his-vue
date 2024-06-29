<template>
    <div class="page">
        <div class="panel">
            <!-- logo图片 -->
            <div class="left">
                <img src="@/assets/login/logo.png" class="logo" />
                <img src="@/assets/login/big.png" class="big" />
            </div>
            <div class="right">
                <!-- title -->
                <div class="title-container">
                    <h2>神州大健康体检系统</h2>
                    <span>v1.0</span>
                </div>
                <!-- 账户密码登录 -->
                <div v-if="!qr.qrCodeVisible">
                    <div class="row">
                        <el-input
                            v-model="loginForm.username"
                            placeholder="用户名"
                            prefix-icon="user"
                            size="large"
                            clearable
                        />
                    </div>
                    <div class="row">
                        <el-input
                            type="password"
                            v-model="loginForm.password"
                            placeholder="密码"
                            prefix-icon="Lock"
                            size="large"
                            clearable
                        />
                    </div>
                    <div class="row">
                        <el-button
                            type="primary"
                            class="btn"
                            size="large"
                            @click="login"
                        >
                            用户名密码登录
                        </el-button>
                    </div>
                    <div class="row">
                        <a href="" class="link">二维码登录</a>
                    </div>
                </div>
                <!-- 二维码登录 -->
                <div v-if="qr.qrCodeVisible">
                    <div class="qrCode-container">
                        <img :src="qr.qrCode" height="153" class="qrCode" />
                        <img src="@/assets/login/phone.png" height="148" />
                    </div>
                    <div class="row">
                        <a href="" class="link">用户名密码登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ComponentInternalInstanceI } from "@/types/globalType";
// 当用户登录成功后，需要使用路由对象跳转页面
import { useRouter } from "vue-router";
import { isUsername, isPassword } from "@/utils/validate";

const router = useRouter();
// router.push("/");

const {
    proxy,
    appContext: {
        config: {
            globalProperties: { $http },
        },
    },
} = getCurrentInstance() as ComponentInternalInstanceI;

const loginForm = reactive({
    username: "admin",
    password: "abc123456",
});

// 这部分内容将来给APP程序使用
const qr = reactive({
    qrCodeVisible: false,
    qrCode: "",
    uuid: null,
    qrCodeTimer: null,
    loginTimer: null,
});

const login = () => {
    // 验证用户名不正确【5-50位】
    if (!isUsername(loginForm.username)) {
        proxy.$message({
            message: "用户名不正确",
            type: "error",
            duration: 1200,
        });
        return;
    }
    // 验证密码不正确
    if (!isPassword(loginForm.password)) {
        proxy.$message({
            message: "密码格式错误",
            type: "error",
            duration: 1200,
        });
        return;
    }

    // 用户密码验证正确
    const data = toValue(loginForm);

    // 发送请求
    $http("/mis/user/login", "post", data, true, (resp: any) => {
        if (resp.result) {
            const permissions = resp.permissions;
            const token = resp.token;
            // 向浏览器storage保存令牌和权限列表
            localStorage.setItem("permissions", permissions);
            localStorage.setItem("token", token);
            // 跳转到Mis端首页
            router.push({ name: "MisHome" });
        } else {
            proxy.$message({
                message: "登录失败",
                type: "error",
                duration: 1200,
            });
        }
    });
};
</script>

<style lang="less" scoped>
@import url(./login.less);
</style>
../../types/globalType

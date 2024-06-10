<template>
    <div>
        <!-- 查询表单 -->
        <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="form">
            <!-- 姓名 -->
            <el-form-item prop="name">
                <el-input
                    v-model="dataForm.name"
                    placeholder="姓名"
                    maxlength="10"
                    class="input"
                    clearable="clearable"
                />
            </el-form-item>
            <!-- 性别 -->
            <el-form-item>
                <el-select
                    v-model="dataForm.sex"
                    placeholder="性别"
                    style="width: 160px"
                    clearable="clearable"
                >
                    <el-option
                        v-for="one in sexList"
                        :key="one.value"
                        :label="one.label"
                        :value="one.value"
                    />
                </el-select>
            </el-form-item>
            <!-- 角色 -->
            <el-form-item>
                <el-select
                    v-model="dataForm.role"
                    style="width: 160px"
                    placeholder="角色"
                    clearable="clearable"
                >
                    <el-option
                        v-for="one in dataForm.roleList"
                        :key="one.roleName"
                        :label="one.roleName"
                        :value="one.roleName"
                    />
                </el-select>
            </el-form-item>
            <!-- 部门 -->
            <el-form-item>
                <el-select
                    v-model="dataForm.deptId"
                    style="width: 160px"
                    placeholder="部门"
                    clearable="clearable"
                >
                    <el-option
                        v-for="one in dataForm.deptList"
                        :key="one.id"
                        :label="one.deptName"
                        :value="one.id"
                    />
                </el-select>
            </el-form-item>
            <!-- 在职状态 -->
            <el-form-item>
                <el-select
                    v-model="dataForm.status"
                    style="width: 160px"
                    placeholder="状态"
                    clearable="clearable"
                >
                    <el-option
                        v-for="one in employmentStatus"
                        :key="one.label"
                        :label="one.label"
                        :value="one.value"
                    />
                </el-select>
            </el-form-item>
            <!-- 查询、新增、批量删除 -->
            <el-form-item>
                <el-button type="primary" @click="searchHandle()"
                    >查询</el-button
                >
                <el-button
                    type="primary"
                    :disabled="!isAuth([ROOT, USER_INSERT])"
                    @click="addHandle()"
                    >新增</el-button
                >
                <el-button
                    type="danger"
                    :disabled="!isAuth([ROOT, USER_DELETE])"
                    @click="deleteHandle()"
                    >批量删除</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import type { ComponentInternalInstance } from "vue";
import { PERMISSION } from "@/utils/isAuth";

// 全局实例
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance;
const isAuth = appContext.config.globalProperties.$isAuth;

// 权限
const { ROOT, USER_INSERT, USER_DELETE } = PERMISSION;

// 表单值
const dataForm = reactive({
    name: "",
    sex: "",
    role: "",
    deptId: "",
    status: "",
    roleList: [],
    deptList: [],
});

// 表单校验规则
const dataRule = reactive({
    name: [
        {
            required: false,
            pattern: "^[\u4e00-\u9fa5]{1,10}$", // 只能简体中文汉字，1~10个字符
            message: "姓名格式错误",
            trigger: "blur",
        },
    ],
});

// 在职状态
const employmentStatus = [
    {
        label: "在职",
        value: "1",
    },
    {
        label: "离职",
        value: "2",
    },
];

// 性别
const sexList = [
    {
        label: "男",
        value: "男",
    },
    {
        label: "女",
        value: "女",
    },
];

// 查询
const searchHandle = () => {};

// 添加
const addHandle = () => {};

// 批量删除
const deleteHandle = () => {};
</script>

<style lang="scss" scoped></style>

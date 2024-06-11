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
        <!-- table表格 -->
        <el-table
            :data="tableData.dataList"
            :header-cell-style="{ background: '#fafafa' }"
            border
            v-loading="tableData.loading"
            @selection-change="selectionChangeHandle"
        >
            <!-- 复选框 -->
            <el-table-column
                type="selection"
                header-align="center"
                align="center"
                width="50"
            />
            <!-- 序号 -->
            <el-table-column
                type="index"
                header-align="center"
                align="center"
                width="100"
                label="序号"
            >
                <template #default="scope">
                    <span>
                        { (tableData.pageIndex - 1) * tableData.pageSize +
                        scope.$index + 1 }
                    </span>
                </template>
            </el-table-column>
            <!-- 姓名 -->
            <el-table-column
                prop="name"
                header-align="center"
                align="center"
                width="100"
                label="姓名"
            />
            <!-- 性别 -->
            <el-table-column
                prop="sex"
                header-align="center"
                align="center"
                width="60"
                label="姓名"
            />
            <!-- 电话 -->
            <el-table-column
                prop="tel"
                header-align="center"
                align="center"
                width="130"
                label="电话"
            />
            <!-- 邮箱 -->
            <el-table-column
                prop="email"
                header-align="center"
                align="center"
                width="240"
                label="邮箱"
                :show-overflow-tooltip="true"
            />
            <!-- 入职日期-->
            <el-table-column
                prop="hiredate"
                header-align="center"
                align="center"
                width="130"
                label="入职日期"
            />
            <!-- 角色 -->
            <el-table-column
                prop="roles"
                header-align="center"
                align="center"
                width="150"
                label="角色"
                :show-overflow-tooltip="true"
            />
            <!-- 部门 -->
            <el-table-column
                prop="dept"
                header-align="center"
                align="center"
                width="120"
                label="部门"
            />
            <!-- 状态 -->
            <el-table-column
                prop="status"
                header-align="center"
                align="center"
                width="100"
                label="状态"
            />
            <!-- 操作 -->
            <el-table-column
                header-align="center"
                align="center"
                width="150"
                label="操作"
            >
                <template #default="scope">
                    <el-button
                        type="text"
                        v-if="isAuth([ROOT, USER_UPDATE])"
                        @click="updateHandle(scope.row.id)"
                    >
                        修改
                    </el-button>
                    <el-button
                        type="text"
                        v-if="isAuth([ROOT, USER_UPDATE])"
                        :disabled="scope.row.status == '离职' || scope.row.root"
                        @click="dimissHandle(scope.row.id)"
                    >
                        离职
                    </el-button>
                    <el-button
                        type="text"
                        v-if="isAuth([ROOT, USER_DELETE])"
                        :disabled="scope.row.root"
                        @click="deleteHandle(scope.row.id)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="tableData.pageIndex"
            :page-sizes="tableData.pageSizes"
            :page-size="tableData.pageSize"
            :total="tableData.totalCount"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { ComponentInternalInstance } from "vue";
import { PERMISSION } from "@/utils/isAuth";

// 全局实例
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance;
const isAuth = appContext.config.globalProperties.$isAuth;

// 权限
const { ROOT, USER_INSERT, USER_DELETE, USER_UPDATE } = PERMISSION;

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

// table数据
const tableData = reactive({
    dataList: [], // 表格展示的数据
    pageIndex: 1, // 当前页码
    pageSize: 10, // 每页展示多少数据
    pageSizes: [10, 20, 50], // 每页展示数量列表，提供选择
    totalCount: 0, // 数据总数
    loading: false, // 加载数据中是否出现【滚动进度条】
    selections: [], // 勾选中的行
});

// 查询
const searchHandle = () => {};

// 添加
const addHandle = () => {};

// 批量删除
const deleteHandle = () => {};

// 勾选
const selectionChangeHandle = () => {};

// 修改
const updateHandle = () => {};

// 离职
const dimissHandle = () => {};

// 每页展示数量改变
const sizeChangeHandle = () => {};

// 当前页改变
const currentChangeHandle = () => {};
</script>

<style lang="scss" scoped></style>

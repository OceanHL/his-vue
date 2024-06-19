<template>
    <!-- 表单、表格 -->
    <div v-if="isAuth([ROOT, USER_SELECT])">
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
                <!-- 查询 -->
                <el-button type="primary" @click="searchHandle()"
                    >查询</el-button
                >
                <!-- 新增 -->
                <el-button
                    type="primary"
                    :disabled="!isAuth([ROOT, USER_INSERT])"
                    @click="addHandle()"
                    >新增</el-button
                >
                <!-- 删除 -->
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
            style="margin-bottom: 20px"
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
                        {{
                            (tableData.pageIndex - 1) * tableData.pageSize +
                            scope.$index +
                            1
                        }}
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
                width="109"
                label="状态"
            />
            <!-- 操作 -->
            <el-table-column
                header-align="center"
                align="center"
                width="200"
                label="操作"
            >
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        v-if="isAuth([ROOT, USER_UPDATE])"
                        @click="updateHandle(scope.row.id)"
                    >
                        修改
                    </el-button>
                    <el-button
                        link
                        :type="scope.row.root ? '' : 'primary'"
                        v-if="isAuth([ROOT, USER_UPDATE])"
                        :disabled="scope.row.status == '离职' || scope.row.root"
                        @click="dimissHandle(scope.row.id)"
                    >
                        离职
                    </el-button>
                    <el-button
                        link
                        type="danger"
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
    <!-- 弹窗 -->
    <el-dialog
        :title="!dialogData.dataForm.id ? '新增' : '修改'"
        v-if="isAuth([ROOT, USER_INSERT, USER_UPDATE])"
        :close-on-click-modal="false"
        v-model="dialogVisible"
        width="450px"
    >
        <!-- 新增、修改表单 -->
        <el-form
            :model="dialogData.dataForm"
            :rules="dialogData.dataRule"
            ref="dialogForm"
            label-width="80px"
        >
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="username">
                <el-input
                    v-model="dialogData.dataForm.username"
                    maxlength="20"
                    clearable
                />
            </el-form-item>
            <!-- 密码【为修改时，才显示】 -->
            <el-form-item
                label="密码"
                prop="password"
                v-if="!dialogData.update"
            >
                <el-input
                    type="password"
                    v-model="dialogData.dataForm.password"
                    maxlength="20"
                    clearable
                />
            </el-form-item>
            <!-- 姓名 -->
            <el-form-item label="姓名" prop="name">
                <el-input
                    v-model="dialogData.dataForm.name"
                    maxlength="10"
                    clearable
                />
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别" prop="sex">
                <el-select v-model="dialogData.dataForm.sex" clearable>
                    <el-option
                        v-for="item in sexList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 电话 -->
            <el-form-item label="电话" prop="tel">
                <el-input
                    v-model="dialogData.dataForm.tel"
                    maxlength="11"
                    clearable
                />
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱" prop="email">
                <el-input
                    v-model="dialogData.dataForm.email"
                    maxlength="200"
                    clearable
                />
            </el-form-item>
            <!-- 入职日期 -->
            <el-form-item label="入职日期" prop="hiredate">
                <el-date-picker
                    v-model="dialogData.dataForm.hiredate"
                    type="date"
                    placeholder="选择日期"
                    :editable="false"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    class="dialog-input"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <!-- 角色 -->
            <el-form-item label="角色" prop="role">
                <el-select
                    v-model="dialogData.dataForm.role"
                    placeholder="选择角色"
                    class="dialog-input"
                    multiple
                    clearable
                >
                    <!-- 无法选择【超级管理员】选项 -->
                    <el-option
                        v-for="item in dialogData.roleList"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id"
                        :disabled="item.roleName == '超级管理员'"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 部门 -->
            <el-form-item label="部门" prop="deptId">
                <el-select
                    v-model="dialogData.dataForm.deptId"
                    placeholder="选择部门"
                    class="dialog-input"
                    clearable
                >
                    <el-option
                        v-for="item in dialogData.deptList"
                        :key="item.id"
                        :label="item.deptName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 在职状态 -->
            <el-form-item label="状态" prop="status">
                <el-select
                    v-model="dialogData.dataForm.status"
                    placeholder="状态"
                    clearable
                >
                    <el-option
                        v-for="item in employmentStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 取消、确定 -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogData.visible = false">取消</el-button>
                <el-button type="primary" @click="dataFormSubmit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { ComponentInternalInstance } from "vue";
import { PERMISSION } from "@/utils/isAuth";
import { dayjs } from "element-plus";

// 全局实例
const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance;
const isAuth = appContext.config.globalProperties.$isAuth;
const http = appContext.config.globalProperties.$http;

// 权限
const { ROOT, USER_INSERT, USER_DELETE, USER_UPDATE, USER_SELECT } = PERMISSION;

// 在职状态
const employmentStatus = [
    {
        label: "在职",
        value: 1,
    },
    {
        label: "离职",
        value: 2,
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

// 查询表单条件值
const dataForm = reactive({
    name: null,
    sex: null,
    role: null,
    deptId: null,
    status: null,
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

// 弹窗显示，调试完静态页面后，需修改为false【ElementPlus最新版本只能用 ref 当作弹框显示属性】
const dialogVisible = ref(true);
// 弹窗数据
const dialogData = reactive({
    visible: true, // 弹窗显示，调试完静态页面后，需修改为false
    update: false, // 是否为修改
    dataForm: {
        id: null,
        username: null,
        password: null,
        name: null,
        sex: null,
        tel: null,
        email: null,
        hiredate: dayjs(new Date()).format("YYYY-MM-DD"),
        role: null,
        deptId: null,
        status: 1, // 在职状态：1-在职、2-离职
    },
    dataRule: {
        username: [
            {
                required: true,
                message: "用户名不能为空",
            },
            {
                pattern: "^[a-zA-Z0-9]{5,20}$",
                message: "用户名格式错误",
            },
        ],
        password: [
            {
                required: true,
                message: "密码不能为空",
            },
            {
                pattern: "^[a-zA-Z0-9]{6,20}$",
                message: "密码格式错误",
            },
        ],
        name: [
            {
                required: true,
                message: "姓名不能为空",
            },
            {
                pattern: "^[\u4e00-\u9fa5]{2,10}$",
                message: "姓名格式错误",
            },
        ],
        sex: [
            {
                required: true,
                message: "性别不能为空",
            },
        ],
        tel: [
            {
                required: true,
                message: "手机号不能为空",
            },
            {
                pattern: "^1[3-9]{1}[0-9]{9}$",
                message: "手机号格式错误",
            },
        ],
        email: [
            {
                required: true,
                message: "邮箱不能为空",
            },
            {
                pattern: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$",
                message: "邮箱格式错误",
            },
        ],
        hiredate: [
            {
                required: true,
                message: "入职日期不能为空",
            },
        ],
        role: [
            {
                required: true,
                message: "角色不能为空",
            },
        ],
        deptId: [
            {
                required: true,
                message: "部门不能为空",
            },
        ],
        status: [
            {
                required: true,
                message: "在职状态不能为空",
            },
        ],
    },
});

// 在组件挂载完成后执行
onMounted(() => {
    // 加载角色列表
    loadRoleList();
    // 加载部门列表
    loadDeptList();
    // 加载table分页记录
    loadTableDataList();
});

// 查询
const searchHandle = () => {
    // 校验表单内输入的所有查询条件
    (proxy?.$refs["form"] as any).validate((valid: boolean) => {
        if (!valid) return false;

        // 校验成功
        // 清理验证结果
        (proxy?.$refs["form"] as any).clearValidate();
        // 将空字符串替换成 null 值
        if (dataForm.name == "") dataForm.name = null;
        if (dataForm.sex == "") dataForm.sex = null;
        if (dataForm.role == "") dataForm.role = null;
        if (dataForm.deptId == "") dataForm.deptId = null;
        if (dataForm.status == "") dataForm.status = null;

        // 默认显示第一页数据
        if (tableData.pageIndex !== 1) tableData.pageIndex = 1;
        // 加载table分页记录
        loadTableDataList();
    });
};

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
const sizeChangeHandle = (pageSize: number) => {
    console.log("每页条数: " + pageSize);
    tableData.pageSize = pageSize; // 显示的条数
    tableData.pageIndex = 1; // 当前页码
    // 加载table分页记录
    loadTableDataList();
};

// 当前页码改变
const currentChangeHandle = (pageIndex: number) => {
    console.log("当前页码: " + pageIndex);
    tableData.pageIndex = pageIndex; // 当前页码
    // 加载table分页记录
    loadTableDataList();
};

// 弹窗-数据提交
const dataFormSubmit = () => {};

// 加载角色列表
const loadRoleList = () => {
    http("/mis/role/searchAllRole", "get", null, true, (resp: any) => {
        dataForm.roleList = resp.list;
    });
};

// 加载部门列表
const loadDeptList = () => {
    http("/mis/dept/searchAllDept", "get", null, true, (resp: any) => {
        dataForm.deptList = resp.list;
    });
};

// 加载table分页记录
const loadTableDataList = () => {
    tableData.loading = true;
    const json = {
        page: tableData.pageIndex, // 当前页码
        length: tableData.pageSize, // 每页展示多少数据
        name: dataForm.name, // 姓名
        sex: dataForm.sex, // 性别
        role: dataForm.role, // 角色
        deptId: dataForm.deptId, // 部门
        status: dataForm.status, // 状态
    };
    http("/mis/user/searchByPage", "post", json, true, (resp: any) => {
        const page = resp.page; // 分页数据
        const list = page.list;
        for (const item of list) {
            if (item.status == 1) item.status = "在职";
            else if (item.status == 2) item.status = "离职";
        }
        tableData.dataList = list;
        tableData.totalCount = page.totalCount;
        tableData.loading = false;
    });
};
</script>

<style lang="scss" scoped>
.dialog-input {
    width: 100% !important;
}
</style>

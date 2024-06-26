<template>
    <div v-if="isAuth([ROOT, GOODS_SELECT])">
        <!-- 搜索区 -->
        <el-form
            :inline="true"
            :model="searchDataForm"
            :rules="searchDataFormRule"
            ref="form"
        >
            <!-- 套餐名称 -->
            <el-form-item prop="keyword">
                <el-input
                    v-model="searchDataForm.keyword"
                    placeholder="套餐名称"
                    maxlength="50"
                    class="input"
                    clearable="clearable"
                />
            </el-form-item>
            <!-- 套餐编码 -->
            <el-form-item prop="code">
                <el-input
                    v-model="searchDataForm.code"
                    placeholder="套餐编码"
                    maxlength="20"
                    class="input"
                    clearable="clearable"
                />
            </el-form-item>
            <!-- 类别 -->
            <el-form-item style="width: 150px">
                <el-select
                    v-model="searchDataForm.type"
                    placeholder="类别"
                    class="input"
                    clearable="clearable"
                >
                    <el-option label="父母体检" value="父母体检"></el-option>
                    <el-option label="入职体检" value="入职体检"></el-option>
                    <el-option label="职场白领" value="职场白领"></el-option>
                    <el-option label="个人高端" value="个人高端"></el-option>
                    <el-option
                        label="中青年体检"
                        value="中青年体检"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 展示区 -->
            <el-form-item style="width: 150px">
                <el-select
                    v-model="searchDataForm.partId"
                    placeholder="展示区"
                    class="input"
                    clearable="clearable"
                >
                    <el-option label="活动专区" value="1"></el-option>
                    <el-option label="热卖套餐" value="2"></el-option>
                    <el-option label="新品推荐" value="3"></el-option>
                    <el-option label="孝敬父母" value="4"></el-option>
                    <el-option label="白领精英" value="5"></el-option>
                </el-select>
            </el-form-item>
            <!-- 查询、新增、批量删除、 -->
            <el-form-item>
                <!-- 查询 -->
                <el-button type="primary" @click="searchHandle()"
                    >查询</el-button
                >
                <!-- 新增 -->
                <el-button
                    type="danger"
                    :disable="!isAuth([ROOT, GOODS_INSERT])"
                    @click="addHandle()"
                    >新增</el-button
                >
                <!-- 批量删除 -->
                <el-button
                    type="danger"
                    :disable="!isAuth([ROOT, GOODS_DELETE])"
                    @click="deleteHandle()"
                    >批量删除</el-button
                >
            </el-form-item>
            <!-- 全部、已上架、已下架 -->
            <el-form-item style="float: right; margin-right: 0">
                <el-radio-group
                    v-model="searchDataForm.statusLabel"
                    @change="searchHandle()"
                >
                    <el-radio-button label="全部" />
                    <el-radio-button label="已上架" />
                    <el-radio-button label="已下架" />
                </el-radio-group>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
            :data="tableData.dataList"
            :header-cell-style="{ background: '#f5f7fa' }"
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
                :selectable="selectable"
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
                    <span>{{
                        (tableData.pageIndex - 1) * tableData.pageSize +
                        scope.$index +
                        1
                    }}</span>
                </template>
            </el-table-column>
            <!-- 套餐名称 -->
            <el-table-column
                prop="title"
                header-align="left"
                align="left"
                min-width="250"
                label="套餐名称"
            />
            <!-- 套餐编号 -->
            <el-table-column
                prop="code"
                header-align="left"
                align="left"
                min-width="130"
                label="套餐编号"
            />
            <!-- 现价 -->
            <el-table-column
                header-align="center"
                align="center"
                min-width="80"
                label="现价"
            >
                <template #default="scope">
                    <span>{{ scope.row.currentPrice }}</span>
                </template>
            </el-table-column>
            <!-- 原价 -->
            <el-table-column
                header-align="center"
                align="center"
                min-width="100"
                label="原价"
            >
                <template #default="scope">
                    <span>{{ scope.row.initialPrice }}</span>
                </template>
            </el-table-column>
            <!-- 促销方案 -->
            <el-table-column
                prop="ruleName"
                header-align="center"
                align="center"
                min-width="100"
                label="促销方案"
            />
            <!-- 销量 -->
            <el-table-column
                prop="salesVolume"
                header-align="center"
                align="center"
                min-width="100"
                label="销量"
            />
            <!-- 类型 -->
            <el-table-column
                prop="type"
                header-align="center"
                align="center"
                min-width="100"
                label="类型"
            />
            <!-- 体检内容 -->
            <el-table-column
                prop="center"
                header-align="center"
                align="center"
                min-width="100"
                label="体检内容"
            >
                <template #default="scope">
                    <span
                        :class="scope.row.hasCheckup ? 'link-blue' : 'link-red'"
                        @click="
                            documentHandle(scope.row.id, scope.row.hasCheckup)
                        "
                    >
                        {{ scope.row.hasCheckup ? "右文档" : "无文档" }}
                    </span>
                </template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column
                prop="status"
                header-align="center"
                align="center"
                min-width="80"
                label="状态"
            >
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.status"
                        inline-prompt
                        style="
                            --el-switch-on-color: #13ce66;
                            --el-switch-off-color: #ff4949;
                        "
                        active-text="上架"
                        inactive-text="下架"
                        :disabled="!scope.row.hasCheckup"
                        @change="
                            changeSwitchHandle(scope.row.id, scope.row.status)
                        "
                    />
                </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
                header-align="center"
                align="center"
                width="150"
                label="操作"
            >
                <template #default="scope">
                    <!-- 预览 -->
                    <el-button link @click="viewHandle(scope.row.id)"
                        >预览</el-button
                    >
                    <!-- 修改 -->
                    <el-button
                        link
                        v-if="isAuth([ROOT, GOODS_UPDATE])"
                        :disabled="scope.row.status"
                        @click="updateHandle(scope.row.id)"
                        >修改</el-button
                    >
                    <!-- 删除 -->
                    <el-button
                        link
                        v-if="isAuth([ROOT, GOODS_DELETE])"
                        :disabled="
                            scope.row.salesVolume > 0 || scope.row.status
                        "
                        @click="deleteHandle(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :currentPage="tableData.pageIndex"
            :page-sizes="[10, 20, 50]"
            :page-size="tableData.pageSize"
            :total="tableData.totalCount"
            layout="total, sizes, prev, pager, next, jumper"
        />
    </div>
</template>

<script setup lang="ts">
import type {
    ComponentInternalInstanceI,
    IsAuthFn,
    HttpFn,
} from "./types/globalType";
import { PermissionEnum } from "@/utils/isAuth";
import { Delete, Download, Upload } from "@element-plus/icons-vue";

/**
 * @description 搜索表单数据类型
 */
type SearchDataFormType = {
    keyword: string | null;
    code: string | null;
    type: string | null;
    partId: string | null;
    statusLabel: string;
    status: string | null;
};

// 表格数据类型
type TableDataType = {
    /**
     * 表格数据
     */
    dataList: any[];
    /**
     * 表格数据加载状态
     */
    loading: boolean;
    /**
     * 当前页码
     */
    pageIndex: number;
    /**
     * 每页显示条数
     */
    pageSize: number;
    /**
     * 每页可展示数量的列表
     */
    pageSizes: number[];
    /**
     * 总条数
     */
    totalCount: number;
};

const { proxy, appContext } =
    getCurrentInstance() as ComponentInternalInstanceI;

const isAuth = appContext.config.globalProperties.$isAuth as IsAuthFn;
const http = appContext.config.globalProperties.$http as HttpFn;

// 权限
const { ROOT, GOODS_SELECT, GOODS_DELETE, GOODS_INSERT, GOODS_UPDATE } =
    PermissionEnum;

// 搜索表单数据
const searchDataForm = reactive<SearchDataFormType>({
    keyword: null,
    code: null,
    type: null,
    partId: null,
    statusLabel: "全部",
    status: null,
});

// 搜索表单数据校验规则
const searchDataFormRule = reactive({
    keyword: [
        {
            pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{1,50}$",
            message: "关键字内容不正确",
        },
    ],
    code: [
        { min: 6, message: "编号不能少于6个字符" },
        { pattern: "^[a-zA-Z0-9]{6,20}$", message: "编号格式不正确" },
    ],
});

// 表格所有数据
const tableData = reactive<TableDataType>({
    dataList: [],
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50],
    totalCount: 0,
});

// 查询【全部、已上架、已下架】
function searchHandle() {}

// 新增
function addHandle() {}

// 批量删除
function deleteHandle() {}

// 选中的所有行
function selectionChangeHandle() {}

// 当前复选框是否可行
function selectable() {
    return true;
}

// 体检内容-文档
function documentHandle(id: number, hasCheckup: boolean) {}

// 状态切换 - 上架、下架
function changeSwitchHandle(id: number, status: boolean) {}

// 页面展示条数变化
function sizeChangeHandle(size: number) {}

// 当前页码变化
function currentChangeHandle(page: number) {}
</script>

<style lang="less" scoped>
@import url(./goods.less);
</style>

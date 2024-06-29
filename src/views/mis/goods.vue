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
    <!-- 新增弹窗 -->
    <el-dialog
        :title="!goodsDialog.dataForm.id ? '新增' : '修改'"
        v-if="isAuth([ROOT, GOODS_INSERT, GOODS_UPDATE])"
        :close-on-click-modal="false"
        v-model="goodsDialogVisible"
        width="750px"
    >
        <el-form
            :model="goodsDialog.dataForm"
            :rules="goodsDialog.dataRule"
            ref="dialogForm"
            label-width="80px"
        >
            <!-- 套餐名称 -->
            <el-form-item label="套餐名称" prop="title">
                <el-input
                    v-model="goodsDialog.dataForm.title"
                    maxlength="50"
                    clearable
                />
            </el-form-item>
            <!-- 套餐编码 -->
            <el-form-item label="套餐编码" prop="code">
                <el-input
                    v-model="goodsDialog.dataForm.code"
                    maxlength="20"
                    clearable
                />
            </el-form-item>
            <!-- 简介信息 -->
            <el-form-item label="简介信息" prop="description">
                <el-input
                    type="textarea"
                    v-model="goodsDialog.dataForm.description"
                    :rows="4"
                    maxlength="200"
                    clearable
                />
            </el-form-item>
            <!-- 套餐原价 -->
            <el-form-item label="套餐原价" prop="initialPrice">
                <el-input-number
                    v-model="goodsDialog.dataForm.initialPrice"
                    placeholder="输入原价"
                    class="price"
                    maxlength="20"
                    clearable
                >
                    <template #append>元</template>
                </el-input-number>
                <span class="desc">提示：价格精确到分（小数点后两位</span>
            </el-form-item>
            <!-- 折扣列表 -->
            <el-form-item label="折扣列表">
                <el-select
                    v-model="goodsDialog.dataForm.ruleId"
                    placeholder="选择折扣信息"
                    clearable
                >
                    <el-option
                        v-for="item in goodsDialog.ruleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <!-- 封面图片 -->
            <el-form-item label="封面图片" prop="image">
                <el-upload
                    class="image-uploader"
                    :action="goodsDialog.upload.action"
                    :headers="goodsDialog.upload.headers"
                    :data="goodsDialog.upload.data"
                    :show-file-list="false"
                    accept=".jpg,.jpeg"
                    :on-success="imageUploadSuccess"
                    :before-upload="imageBeforeUpload"
                    :on-error="imageUploadError"
                >
                    <img
                        v-if="goodsDialog.imageUrl"
                        :src="goodsDialog.imageUrl"
                        class="image"
                    />
                    <el-icon v-else class="image-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <!-- 套餐类别 -->
            <el-form-item label="套餐类别" prop="type">
                <el-select
                    v-model="goodsDialog.dataForm.type"
                    placeholder="检查类别"
                    clearable
                >
                    <el-option label="父母体检" value="父母体检" />
                    <el-option label="入职体检" value="入职体检" />
                    <el-option label="职场白领" value="职场白领" />
                    <el-option label="个人高端" value="个人高端" />
                    <el-option label="中青年体检" value="中青年体检" />
                </el-select>
            </el-form-item>
            <!-- 特征标签 -->
            <el-form-item label="特征标签">
                <div class="tag-row">
                    <el-input
                        class="tag-input"
                        v-model="goodsDialog.newTag"
                        @keyup.enter="enterTag"
                        clearable
                    />
                    <span class="desc">提示, 输入标签后按回车键</span>
                </div>
                <div class="tags">
                    <el-tag
                        v-for="item in goodsDialog.dataForm.tags"
                        :key="item"
                        closable
                        :disable-transitions="false"
                        @close="closeTag(item)"
                    >
                        {{ item }}
                    </el-tag>
                </div>
            </el-form-item>
            <!-- 展示区 -->
            <el-form-item label="展示区" prop="partId">
                <el-select
                    v-model="goodsDialog.dataForm.partId"
                    placeholder="选择展示区"
                    clearable="clearable"
                >
                    <el-option label="活动专区" value="1" />
                    <el-option label="热卖套餐" value="2" />
                    <el-option label="新品推荐" value="3" />
                    <el-option label="孝敬父母" value="4" />
                    <el-option label="白领精英" value="5" />
                </el-select>
            </el-form-item>
            <!-- 体检内容 -->
            <el-form-item label="体检内容">
                <el-row
                    :gutter="10"
                    class="item-row"
                    v-for="(item, $index) in goodsDialog.item"
                    :key="$index"
                >
                    {{ $index }}
                    <!-- 检查类别 -->
                    <el-col :span="6">
                        <el-select
                            v-model="item.type"
                            placeholder="检查类别"
                            clearable
                        >
                            <el-option label="科室检查" value="科室检查" />
                            <el-option label="实验室检查" value="实验室检查" />
                            <el-option label="医技检查" value="医技检查" />
                            <el-option label="其他检查" value="其他检查" />
                        </el-select>
                    </el-col>
                    <!-- 体检项目 -->
                    <el-col :span="6">
                        <el-input
                            v-model="item.title"
                            placeholder="体检项目"
                            maxlength="50"
                            clearable
                        />
                    </el-col>
                    <!-- 体检内容 -->
                    <el-col :span="11">
                        <el-input
                            v-model="item.content"
                            placeholder="体检内容"
                            maxlength="500"
                            clearable
                        />
                    </el-col>
                    <!-- 删除 -->
                    <el-col :span="1">
                        <el-button
                            type="primary"
                            :icon="Delete"
                            @click="deleteItem($index)"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <!-- 添加项目、取消、确定 -->
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="addItem">添加项目</el-button>
                <el-button @click="goodsDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dataFormSubmit"
                    >确定</el-button
                >
            </span>
        </template>
    </el-dialog>
    <!-- 上传、下载弹窗 -->
    <el-dialog
        title="提示信息"
        v-if="isAuth([ROOT, GOODS_INSERT, GOODS_UPDATE])"
        v-model="documentDialogVisible"
        width="350px"
    >
        <div class="message-content">
            <el-icon :size="18" class="icon">
                <WarningFilled />
            </el-icon>
            <p>
                请您选择【上传】或者【下载】体检内容文档？如果未上传体检内容文档，则体检套餐将无法上架。
            </p>
        </div>
        <template #footer>
            <div class="document-dialog-footer">
                <el-upload
                    :action="documentDialog.upload.action"
                    :data="documentDialog.data"
                    :show-file-list="false"
                    :headers="documentDialog.upload.headers"
                    accept=".xlsx"
                    :before-upload="documentBeforeUpload"
                    :on-success="documentUploadSuccess"
                    :on-error="documentUploadError"
                >
                    <el-button type="success" :icon="Upload" class="uploadBtn"
                        >上传</el-button
                    >
                </el-upload>
                <el-button
                    type="primary"
                    :icon="Download"
                    class="downloadBtn"
                    :disabled="!documentDialog.data.hasCheckup"
                    @click="documentDownloadHandle"
                    >下载</el-button
                >
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type {
    ComponentInternalInstanceI,
    IsAuthFn,
    HttpFn,
} from "@/types/globalType";
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
    /**
     * 选中的行数据
     */
    selections: any[];
};

// 【新增-修改弹窗】数据类型
type GoodsDialogType = {
    newTag: null;
    item: any[];
    imageUrl: string | null;
    checkup: boolean | null;
    ruleList: any[];
    /**
     * 弹窗数据
     */
    dataForm: {
        id: number | null;
        title: string | null;
        code: number | null;
        description: string | null;
        initialPrice: number | null;
        currentPrice: number | null;
        ruleId: number | null;
        image: string | null;
        type: string | null;
        tag: [];
        partId: number | null;
    };
    upload: {
        action: string;
        headers: {
            token: string | null;
        };
        data: {
            id: number | null;
        };
    };
    /**
     * 表单校验规则
     */
    dataRule: Object;
};

// 【上传、下载弹窗】数据类型
type DocumentDialogType = {
    upload: {
        action: string;
        headers: {
            token: string | null;
        };
    };
    data: {
        id: number | null;
        // 是否拥有检查报告
        hasCheckup: boolean;
    };
};

const { proxy, appContext } =
    getCurrentInstance() as ComponentInternalInstanceI;

const isAuth = appContext.config.globalProperties.$isAuth as IsAuthFn;
const http = appContext.config.globalProperties.$http as HttpFn;
const baseUrl = appContext.config.globalProperties.$baseUrl as string;

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
    selections: [],
});

// 【新增-修改弹窗】是否显示
const goodsDialogVisible = ref(false);
// 【新增-修改弹窗】数据
const goodsDialog = reactive<GoodsDialogType>({
    newTag: null,
    item: [],
    imageUrl: null,
    checkup: false,
    ruleList: [],
    dataForm: {
        id: null,
        title: null,
        code: null,
        description: null,
        initialPrice: null,
        currentPrice: null,
        ruleId: null,
        image: null,
        type: null,
        tag: [],
        partId: null,
    },
    upload: {
        action: `${baseUrl}/mis/goods/uploadImage`,
        headers: {
            token: localStorage.getItem("token"),
        },
        data: {
            id: null,
        },
    },
    dataRule: {
        title: [
            { required: true, message: "名称不能为空" },
            { min: 2, message: "名称不能少于2个字符" },
            {
                pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,50}$",
                message: "名称格式错误",
            },
        ],
        code: [
            { required: true, message: "编号不能为空" },
            { min: 6, message: "编号不能少于6个字符" },
            { pattern: "^[a-zA-Z0-9]{6,20}$", message: "编号格式错误" },
        ],
        description: [
            {
                required: true,
                message: "简介信息不能为空",
            },
        ],
        initialPrice: [
            {
                required: true,
                message: "原价不能为空",
            },
            {
                pattern: "(^[1-9]\\d*(\\.\\d{1,2})?$)|(^0(\\.\\d{1,2})?$",
                message: "价格不正确",
            },
        ],
        currentPrice: [
            {
                required: true,
                message: "现价不能为空",
            },
            {
                pattern: "(^[1-9]\\d*(\\.\\d{1,2})?$)|(^0(\\.\\d{1,2})?$",
                message: "价格不正确",
            },
        ],
        image: [
            {
                required: true,
                message: "没有上传封面图片",
            },
        ],
        type: [
            {
                required: true,
                message: "没有选择套餐类别",
            },
        ],
    },
});

// 【上传、下载弹窗】是否显示
const documentDialogVisible = ref(true);
// 【上传、下载弹窗】数据
const documentDialog = reactive<DocumentDialogType>({
    upload: {
        action: `${baseUrl}/mis/goods/uploadCheckupExcel`,
        headers: {
            token: localStorage.getItem("token"),
        },
    },
    data: {
        id: null,
        hasCheckup: false,
    },
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

// 监控按键 Enter
function enterTag(e: KeyboardEvent) {
    console.log("e: ", e);
}
</script>

<style lang="less" scoped>
@import url(./goods.less);
</style>

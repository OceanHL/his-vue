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

const { proxy, appContext } =
    getCurrentInstance() as ComponentInternalInstanceI;

const isAuth = appContext.config.globalProperties.$isAuth as IsAuthFn;
const http = appContext.config.globalProperties.$http as HttpFn;

// 权限
const { ROOT, GOODS_SELECT, GOODS_DELETE, GOODS_INSERT } = PermissionEnum;

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
</script>

<style lang="less" scoped>
@import url(./goods.less);
</style>

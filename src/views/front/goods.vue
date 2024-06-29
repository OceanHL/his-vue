<template>
    <div class="goods-detail">
        <!-- 套餐图片 -->
        <img :src="data.image" class="cover" />
        <!-- 套餐属性 -->
        <div class="property">
            <!-- 套餐名 -->
            <h3 class="title">{{ data.title }} {{ data.code }}</h3>
            <!-- 套餐描述 -->
            <p class="desc">{{ data.description }}</p>
            <!-- 官网价格： -->
            <div class="row">
                <label>官网价格：</label>
                <div class="info">
                    <span class="current-price">{{ data.currentPrice }}</span>
                    <span class="initial-price">￥{{ data.initialPrice }}</span>
                </div>
            </div>
            <!-- 享有折扣： -->
            <div class="row">
                <label>享有折扣：</label>
                <div class="info">
                    <img
                        src="@/assets/front/goods/discount.png"
                        alt="折扣"
                        class="discount-img"
                    />
                    <span class="discount">{{
                        data.ruleName != null ? data.ruleName : "无"
                    }}</span>
                </div>
            </div>
            <!-- 商品类型 -->
            <div class="row">
                <label>商品类型：</label>
                <div class="info">虚拟卡（电子卡密）</div>
            </div>
            <!-- 适用人群 -->
            <div class="row">
                <label>适用人群：</label>
                <div class="info">{{ data.type }}</div>
            </div>
            <!-- 购买数量 -->
            <div class="row">
                <label>购买数量：</label>
                <div class="info">
                    <el-input-number
                        v-model="dataForm.number"
                        size="small"
                        :min="1"
                        :max="10"
                        @change="handleChange"
                    />
                </div>
            </div>
            <!-- 服务承诺 -->
            <div class="row">
                <label>服务承诺：</label>
                <div class="info">
                    <img
                        src="@/assets/front/goods/property-icon-1.png"
                        alt="服务承诺"
                        class="property-icon"
                    />
                    <span class="service-tag">专业品质</span>
                    <img
                        src="@/assets/front/goods/property-icon-2.png"
                        alt="专业品质"
                        class="property-icon"
                    />
                    <span class="service-tag">官方直营</span>
                    <img
                        src="@/assets/front/goods/property-icon-3.png"
                        alt="随时改"
                        class="property-icon"
                    />
                    <span class="service-tag">随时改</span>
                    <img
                        src="@/assets/front/goods/property-icon-4.png"
                        alt="随时退"
                        class="property-icon"
                    />
                    <span class="service-tag">随时退</span>
                </div>
            </div>
            <!-- 咨询客服、立即付款 -->
            <div class="operate">
                <div class="consult-btn" @click="consultHandle">
                    <img
                        src="@/assets/front/goods/consult.png"
                        alt="咨询客服"
                    />
                    <span>咨询客服</span>
                </div>
                <div class="buy-btn" @click="createPayment">立即付款</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ComponentInternalInstanceI } from "@/types/globalType";
import { ElMessageBox } from "element-plus";
import router from "@/router";

const { proxy, appContext } =
    getCurrentInstance() as ComponentInternalInstanceI;

const dataForm = reactive({
    number: 1,
});

const data = reactive({
    code: "117GWMN00",
    title: "新感恩敬老中级体检套餐",
    description:
        "「感恩季到检钜惠」适合人群:适用于中、老年人及血管疾病人群 (参加第二件0元)",
    image: "http://localhost:9000/his/front/goods/1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=58AP9DPW0Z56IMYLMFUR%2F20240629%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240629T074551Z&X-Amz-Expires=43200&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiI1OEFQOURQVzBaNTZJTVlMTUZVUiIsImV4cCI6MTcxOTY4NzQwNCwicGFyZW50Ijoicm9vdCJ9.YHNtlE-RzcBcN9l_8THUJpfZWKpifiqu2vIFIMnfOTjt3QpwmCK5f_vQcYkeuculPKa16aGVlLVrprKHkrS1HQ&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=cd09cdddeed4ab542e7ef834ec7d1d8a93286369d0ef7c3aa03a9ce0bf7b7297",
    initialPrice: 2249.0,
    currentPrice: 2142.0,
    ruleName: null,
    type: "父母体检",
    tag: ["中老年", "女性", "男性"],
    checkup_1: {},
    checkup_2: {},
    checkup_3: {},
    checkup_4: {},
    count_1: null,
    count_2: null,
    count_3: null,
    count_4: null,
    checkupCount: null,
});
</script>

<style lang="less" scoped>
@import url("goods.less");
</style>

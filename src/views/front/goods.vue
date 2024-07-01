<template>
    <!-- 商品信息 -->
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
    <!--横线  -->
    <el-divider />
    <!-- 商品内容（体检内容） -->
    <div class="goods-content">
        <!-- 商品摘要信息 -->
        <el-descriptions title="商品摘要信息" :column="3" size="large" border>
            <el-descriptions-item label="体检名称" label-align="center"
                >{{ data.title }} {{ data.code }}</el-descriptions-item
            >
            <el-descriptions-item label="体检类型" label-align="center">{{
                data.type
            }}</el-descriptions-item>
            <el-descriptions-item label="适用人群" label-align="center"
                ><span class="tag" v-for="item in data.tag" :key="item">{{
                    item
                }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="体检机构" label-align="center">
                北京市神州大健康体检中心（东直门外大街234号）
            </el-descriptions-item>
            <el-descriptions-item label="体检项目" label-align="center">
                {{ data.checkupCount }} 个
            </el-descriptions-item>
            <el-descriptions-item label="有效期" label-align="center">
                一年
            </el-descriptions-item>
        </el-descriptions>
        <!-- 体检项目明细 -->
        <div class="detail">
            <fieldset>
                <legend>体检项目明细</legend>
                <!-- 科室检查 -->
                <div v-if="data.count_1 > 0">
                    <h4 class="detail-title">
                        科室检查({{ data.count_1 }})项目
                    </h4>
                    <table class="detail-table">
                        <tr v-for="item in data.checkup_1" :key="item.title">
                            <th>{{ item.title }}</th>
                            <td>{{ item.content }}</td>
                        </tr>
                    </table>
                </div>
                <!-- 实验室检查 -->
                <div v-if="data.count_2 > 0">
                    <h4 class="detail-title">
                        实验室检查({{ data.count_2 }})项目
                    </h4>
                    <table class="detail-table">
                        <tr v-for="item in data.checkup_2" :key="item.title">
                            <th>{{ item.title }}</th>
                            <td>{{ item.content }}</td>
                        </tr>
                    </table>
                </div>
                <!-- 医技检查 -->
                <div v-if="data.count_3 > 0">
                    <h4 class="detail-title">
                        医技检查({{ data.count_2 }})项目
                    </h4>
                    <table class="detail-table">
                        <tr v-for="item in data.checkup_3" :key="item.title">
                            <th>{{ item.title }}</th>
                            <td>{{ item.content }}</td>
                        </tr>
                    </table>
                </div>
                <!-- 其他检查 -->
                <div v-if="data.count_4 > 0">
                    <h4 class="detail-title">
                        其他检查({{ data.count_2 }})项目
                    </h4>
                    <table class="detail-table">
                        <tr v-for="item in data.checkup_4" :key="item.title">
                            <th>{{ item.title }}</th>
                            <td>{{ item.content }}</td>
                        </tr>
                    </table>
                </div>
            </fieldset>
        </div>
    </div>
    <!-- 预约须知-线上预约优势 -->
    <div class="checkup-appointment">
        <!-- 预约须知 -->
        <fieldset>
            <legend>预约须知</legend>
            <el-descriptions
                title=""
                :column="1"
                size="large"
                class="descriptions"
            >
                <el-descriptions-item
                    label="预约时间："
                    label-aligen="center"
                    style="width: 300px"
                >
                    该医院支持提前可约，若要预约当天请在08:30前下单
                </el-descriptions-item>
                <el-descriptions-item label="营业时间:" label-align="center"
                    >周一至周五08:00-10:30(到院时间为08:00-10:30)</el-descriptions-item
                >
                <el-descriptions-item label="体检地点:" label-align="center"
                    >北京市东城区东直门外大街234号神州大健康体检中心</el-descriptions-item
                >
                <el-descriptions-item label="体检凭证:" label-align="center"
                    >体检当天凭借预约成功短信，现场出示身份证即可体检</el-descriptions-item
                >
                <el-descriptions-item label="优惠信息:" label-align="center"
                    >会员在线支付时含“立减”字样的套餐，付款时会自动抵扣掉对应的金额</el-descriptions-item
                >
                <el-descriptions-item label="订单退改:" label-align="center">
                    如客户预约成功后选择退款，需扣除套餐实付金额的10%作为服务费。最高扣款金额不超过</el-descriptions-item
                >
                <el-descriptions-item label="注意事项:" label-align="center"
                    >当您预约套餐时，即表示接受检测的所有项目。如因自身原因放弃体检套餐中的检查项目</el-descriptions-item
                >
                <el-descriptions-item label="发票申请:" label-align="center"
                    >请在体检后到“我的订单”中申请，如需了解开票具体流程，可在提交订单后及时联系中康体检</el-descriptions-item
                >
            </el-descriptions>
        </fieldset>

        <!-- 线上预约优势 -->
        <fieldset>
            <legend>线上预约优势</legend>
            <!-- 内容 -->
            <div class="content">
                <div class="advantage">
                    <!-- 提前确认到院可检 -->
                    <div class="card">
                        <div class="left">
                            <span>提前确认到院可检</span>
                        </div>
                        <div class="right">
                            <span
                                >提前选择体检时间、体检套餐，避免部分医院预约号紧缺，而导致当天无</span
                            >
                        </div>
                    </div>
                    <!-- 省时方便无需排队 -->
                    <div class="card">
                        <div class="left">
                            <span>省时方便无需排队</span>
                        </div>
                        <div class="right">
                            <span
                                >体检当天携带身份证到院打印体检单，即可开始体检，无需排队缴费</span
                            >
                        </div>
                    </div>
                    <!-- 电话通知灵活改期 -->
                    <div class="card">
                        <div class="left">
                            <span>电话通知灵活改期</span>
                        </div>
                        <div class="right">
                            <span
                                >预约成功后如需改期，可提前电话告知客服，灵活安排行程</span
                            >
                        </div>
                    </div>
                    <!-- 享受优惠节省费用 -->
                    <div class="card">
                        <div class="left">
                            <span>享受优惠节省费用</span>
                        </div>
                        <div class="right">
                            <span
                                >线上体检套餐，享受团体体检优惠价格，大部分可享医院价的7-9折</span
                            >
                        </div>
                    </div>
                </div>
                <!-- 1-4步骤 -->
                <div class="timeline">
                    <ul>
                        <!-- 1-选购体检套餐 -->
                        <li>
                            <img
                                src="@/assets/front/goods/timeline-icon-1.png"
                                alt="步骤1-icon"
                                class="list-img"
                            />
                            <div class="list-line"></div>
                            <div class="list-tag">
                                <img
                                    src="@/assets/front/goods/timeline-tag-1.png"
                                    alt="步骤1-tag"
                                />
                                <span>1</span>
                            </div>
                            <div class="list-content">
                                <h4>选购体检套餐</h4>
                                <p>确定订单无误后，完成线上支付</p>
                            </div>
                        </li>
                        <!-- 2-完成预约体检 -->
                        <li>
                            <img
                                src="@/assets/front/goods/timeline-icon-2.png"
                                alt="步骤2-icon"
                                class="list-img"
                            />
                            <div class="list-line"></div>
                            <div class="list-tag">
                                <img
                                    src="@/assets/front/goods/timeline-tag-2.png"
                                    alt="步骤2-tag"
                                />
                                <span>2</span>
                            </div>
                            <div class="list-content">
                                <h4>完成预约体检</h4>
                                <p>填写体检人信息及体检日期</p>
                            </div>
                        </li>
                        <!-- 3-完成预约体检 -->
                        <li>
                            <img
                                src="@/assets/front/goods/timeline-icon-3.png"
                                alt="步骤3-icon"
                                class="list-img"
                            />
                            <div class="list-line"></div>
                            <div class="list-tag">
                                <img
                                    src="@/assets/front/goods/timeline-tag-3.png"
                                    alt="步骤3-tag"
                                />
                                <span>3</span>
                            </div>
                            <div class="list-content">
                                <h4>到院体检</h4>
                                <p>到院出示身份证，领取体检单体检</p>
                            </div>
                        </li>
                        <!-- 4-完成预约体检 -->
                        <li>
                            <img
                                src="@/assets/front/goods/timeline-icon-4.png"
                                alt="步骤4-icon"
                                class="list-img"
                            />
                            <div class="list-line"></div>
                            <div class="list-tag">
                                <img
                                    src="@/assets/front/goods/timeline-tag-4.png"
                                    alt="步骤4-tag"
                                />
                                <span>4</span>
                            </div>
                            <div class="list-content">
                                <h4>获取体检报告</h4>
                                <p>根据医院情况，到前台登记自取或自费邮寄</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </fieldset>

        <!-- 体检注意事项 -->
        <fieldset>
            <legend>体检注意事项</legend>
            <div class="content">
                <ul class="look-list">
                    <!-- 体检前 -->
                    <li class="item">
                        <div class="left">体检前</div>
                        <div class="right">
                            <ul>
                                <li>
                                    体检前一天请您清淡饮食,勿饮酒、勿劳累。体检当天请空腹
                                </li>
                                <li>
                                    体检前一天要注意休息，晚上8点后不再进食。避免剧烈运动和情绪激动
                                </li>
                                <li>例假期间不宜做妇科、尿液检查。</li>
                            </ul>
                        </div>
                    </li>
                    <!-- 体检中 -->
                    <li class="item">
                        <div class="left">体检中</div>
                        <ul class="right">
                            <li>
                                需空腹检查的项目为抽血、腹部B超、数字胃肠，胃镜及其它标注的体检
                            </li>

                            <li>
                                做膀胱、子宫、附件B超时请勿排尿，如无尿需饮水至膀胱充盈。做妇科
                            </li>
                            <li>
                                未婚女性不做妇科检查;怀孕的女性请预先告知医护人员,不安排做放射
                            </li>
                            <li>
                                做放射线检查前,请您除去身上佩戴的金银、玉器等饰物。
                            </li>
                            <li>
                                核磁共振检查，应禁止佩带首饰、手表、传呼、手机等金属物品，磁卡
                            </li>
                        </ul>
                    </li>
                    <!-- 体检后 -->
                    <li class="item">
                        <div class="left">体检后</div>
                        <div class="right">
                            <ul>
                                <li>全部项目完毕后请您务必将体检单交到前台</li>
                                <li>
                                    请您认真听取医生的建议,及时复查,随诊或进一步检查治疗
                                </li>
                                <li>
                                    请您保存好体检结果，以便和下次体检结果作对照，也可作为您就医时
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </fieldset>
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
    // 科室检查
    checkup_1: [
        {
            title: "一般健康检查",
            content:
                "身高、体重、血压、心、肺、肝、脾、神经系统 ;甲状腺、乳腺、肛门、直肠",
        },
    ],
    // 实验室检查
    checkup_2: [
        {
            title: "C反应蛋白",
            content: "升高常见于:急性炎症、组织坏死、恶性肿瘤、风湿病等疾病",
        },
        {
            title: "肝功10项",
            content:
                "测定;总胆红素(T-Bil)测定;直接胆红素(D-Bil)测定;总胆汁酸(TBA)测定 ;胆碱脂酶(ChE)测定丙氨酸氨基转移酶(ALT)测定:天门冬氨酸氨基转移酶(ASD测定;总蛋白(TP)测定:白蛋白(AIb)测定:碱性磷酸酶(ALP)测定 -谷氨酰基转移酶(GGT)",
        },
        {
            title: "甲功七项",
            content:
                "蛋白抗体(TGAb)测定;抗甲状腺过氧化物酶抗体(TPOAb)测定三碘甲状腺原氨酸(T3)测定;甲状腺素(T4)测定;促甲状腺激素(TSH)测定;游离三碘甲状腺原氨酸(FT3)测定;游离甲状腺素(FT4)测定;抗甲状腺球",
        },
        {
            title: "尿常规",
            content: "尿常规化学分析;尿有形成分分析",
        },
        {
            title: "肾功5项",
            content:
                "尿素(Urea)测定 ;肌酐(Cr)测定;葡萄糖(Glu)测定;尿酸(UA)测定:β2微球蛋白(B2-MG)测定",
        },
        {
            title: "糖化血红蛋白",
            content: "检测近2-3个月内的平均血糖水平、用于糖尿病疗效观察",
        },
        {
            title: "同型半胱氨酸",
            content: "HCY升高是心血管疾病的重要危险因素",
        },
        {
            title: "肌红蛋白",
            content: "肌红蛋白可作为急性心肌梗死(AMI)诊断的早期最灵敏的指标",
        },
        {
            title: "肌钙蛋白",
            content: "肌钙蛋白",
        },
        {
            title: "心肌酶谱",
            content:
                "肌酸激酶(CK)测定:肌酸激酶-MB同工酶活性(CK-MB)测定;乳酸脱氢酶(LD)测定;α羟基丁酸脱氢酶(α-HBD)测定",
        },
        {
            title: "全血细胞分析",
            content: "全血细胞分析(五分类)，有无贫血、感染、凝血功能是否正常等",
        },
        {
            title: "血脂6项",
            content:
                "血脂6项:总胆固醇(TC)测定;甘油三酯(TG)测定;高密度脂蛋白胆固醇(HDL-C)测定;低密度脂蛋白胆固醇(LDL-C)测定;载脂蛋白AI(apOAI)测定:载脂蛋白B(apoB)测定",
        },
        {
            title: "幽门螺杆菌抗体测定",
            content: "细菌抗体测定",
        },
        {
            title: "恶性肿瘤特异性生长因子",
            content: "筛查早期肿瘤",
        },
    ],
    // 医技检查
    checkup_3: [
        {
            title: "泌尿系彩色多普勒超声检查",
            content: "双肾、肾盂、输尿管、膀胱壁、[前列腺(男)]",
        },
        {
            title: "肝胆胰脾彩色多普勒超声检查",
            content: "肝胆胰脾彩色多普勒超声检查",
        },
        {
            title: "数字化摄影(指CR/DR)",
            content: "心、肺、膈等",
        },
        {
            title: "超声骨密度检测",
            content: "超声仪检查骨量情况，无骨质疏松、骨量减少",
        },
        {
            title: "心电图",
            content:
                "检查心脏有否器官功能性病变，如:窦性心动过速、过缓、不齐以及各种心脏病的筛查",
        },
    ],
    // 其他检查
    checkup_4: [
        {
            title: "肿物标记物(男)",
            content:
                "男:甲胎蛋白(AFP)测定;癌胚抗原(CEA)测定,游离前列腺特异性抗原(FPSA)测定;总前列腺特异性抗原(TPSA)测定;糖类抗原CA-199测定",
        },
    ],
    count_1: 1,
    count_2: 1,
    count_3: 1,
    count_4: 1,
    checkupCount: null,
});
</script>

<style lang="less" scoped>
@import url("goods.less");
</style>

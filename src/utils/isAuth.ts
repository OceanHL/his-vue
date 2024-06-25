/**
 * 鉴权函数，判断具体的权限
 * @param requiredPermissions string[] 被要求的权限
 * @returns boolean
 */
export function isAuth(requiredPermissions: string[]) {
    const userPermissions: string | null = localStorage.getItem("permissions"); // 用户拥有的的权限
    if (userPermissions) {
        let flag = false;
        for (const one of requiredPermissions) {
            // 用户拥有要求的权限
            if (userPermissions.includes(one)) {
                flag = true;
                break;
            }
        }
        return flag;
    } else {
        return false;
    }
}

/* 权限常量列表 */
export enum PermissionEnum {
    /* 全部权限 */
    ROOT = "ROOT", // 超级管理员
    /* 角色模块 */
    ROLE_SELECT = "ROLE:SELECT", // 角色模块_查询
    ROLE_DELETE = "ROLE:DELETE", // 角色模块_删除
    ROLE_UPDATE = "ROLE:UPDATE", // 角色模块_更新
    ROLE_INSERT = "ROLE:INSERT", // 角色模块_插入
    /* 用户模块 */
    USER_SELECT = "USER:SELECT", // 用户模块_查询
    USER_DELETE = "USER:DELETE", // 用户模块_删除
    USER_UPDATE = "USER:UPDATE", // 用户模块_更新
    USER_INSERT = "USER:INSERT", // 用户模块_插入
    /* 部门模块 */
    DEPT_INSERT = "DEPT:INSERT", // 部门模块_插入
    DEPT_UPDATE = "DEPT:UPDATE", // 部门模块_更新
    DEPT_DELETE = "DEPT:DELETE", // 部门模块_删除
    DEPT_SELECT = "DEPT:SELECT", // 部门模块_查询
    /* 体检套餐模块 */
    GOODS_INSERT = "GOODS:INSERT", // 体检套餐模块_插入
    GOODS_UPDATE = "GOODS:UPDATE", // 体检套餐模块_更新
    GOODS_DELETE = "GOODS:DELETE", // 体检套餐模块_删除
    GOODS_SELECT = "GOODS:SELECT", // 体检套餐模块_查询
    /* 规则模块 */
    RULE_INSERT = "RULE:INSERT", // 规则模块_插入
    RULE_UPDATE = "RULE:UPDATE", // 规则模块_更新
    RULE_DELETE = "RULE:DELETE", // 规则模块_删除
    RULE_SELECT = "RULE:SELECT", // 规则模块_查询
    /* 客户模块 */
    CUSTOMER_INSERT = "CUSTOMER:INSERT", // 客户模块_插入
    CUSTOMER_UPDATE = "CUSTOMER:UPDATE", // 客户模块_更新
    CUSTOMER_DELETE = "CUSTOMER:DELETE", // 客户模块_删除
    CUSTOMER_SELECT = "CUSTOMER:SELECT", // 客户模块_查询
    /* 订单模块 */
    ORDER_INSERT = "ORDER:INSERT", // 订单模块_插入
    ORDER_UPDATE = "ORDER:UPDATE", // 订单模块_更新
    ORDER_DELETE = "ORDER:DELETE", // 订单模块_删除
    ORDER_SELECT = "ORDER:SELECT", // 订单模块_查询
    /* 客服模块 */
    CUSTOMER_IM_INSERT = "CUSTOMER_IM:INSERT", // 客服模块_插入
    CUSTOMER_IM_UPDATE = "CUSTOMER_IM:UPDATE", // 客服模块_更新
    CUSTOMER_IM_DELETE = "CUSTOMER_IM:DELETE", // 客服模块_删除
    CUSTOMER_IM_SELECT = "CUSTOMER_IM:SELECT", // 客服模块_查询
    /* 体检预约模块 */
    APPOINTMENT_INSERT = "APPOINTMENT:INSERT", // 体检预约模块_插入
    APPOINTMENT_UPDATE = "APPOINTMENT:UPDATE", // 体检预约模块_更新
    APPOINTMENT_DELETE = "APPOINTMENT:DELETE", // 体检预约模块_删除
    APPOINTMENT_SELECT = "APPOINTMENT:SELECT", // 体检预约模块_查询
    /* 体检签到模块 */
    CUSTOMER_CHECKIN_INSERT = "CUSTOMER_CHECKIN:INSERT", // 体检签到模块_插入
    CUSTOMER_CHECKIN_UPDATE = "CUSTOMER_CHECKIN:UPDATE", // 体检签到模块_更新
    CUSTOMER_CHECKIN_DELETE = "CUSTOMER_CHECKIN:DELETE", // 体检签到模块_删除
    CUSTOMER_CHECKIN_SELECT = "CUSTOMER_CHECKIN:SELECT", // 体检签到模块_查询
    /* 体检预约设置模块 */
    APPOINTMENT_RESTRICTION_INSERT = "APPOINTMENT_RESTRICTION:INSERT", // 体检预约设置模块_插入
    APPOINTMENT_RESTRICTION_UPDATE = "APPOINTMENT_RESTRICTION:UPDATE", // 体检预约设置模块_更新
    APPOINTMENT_RESTRICTION_DELETE = "APPOINTMENT_RESTRICTION:DELETE", // 体检预约设置模块_删除
    APPOINTMENT_RESTRICTION_SELECT = "APPOINTMENT_RESTRICTION:SELECT", // 体检预约设置模块_查询
    /* 医生检查模块 */
    CHECKUP_INSERT = "CHECKUP:INSERT", // 医生检查模块_插入
    CHECKUP_UPDATE = "CHECKUP:UPDATE", // 医生检查模块_更新
    CHECKUP_DELETE = "CHECKUP:DELETE", // 医生检查模块_删除
    CHECKUP_SELECT = "CHECKUP:SELECT", // 医生检查模块_查询
    /* 体检报告管理模块 */
    CHECKUP_REPORT_INSERT = "CHECKUP_REPORT:INSERT", // 体检报告管理模块_插入
    CHECKUP_REPORT_UPDATE = "CHECKUP_REPORT:UPDATE", // 体检报告管理模块_更新
    CHECKUP_REPORT_DELETE = "CHECKUP_REPORT:DELETE", // 体检报告管理模块_删除
    CHECKUP_REPORT_SELECT = "CHECKUP_REPORT:SELECT", // 体检报告管理模块_查询
    /* 人员限流管理模块 */
    FLOW_REGULATION_INSERT = "FLOW_REGULATION:INSERT", // 人员限流管理模块_插入
    FLOW_REGULATION_UPDATE = "FLOW_REGULATION:UPDATE", // 人员限流管理模块_更新
    FLOW_REGULATION_DELETE = "FLOW_REGULATION:DELETE", // 人员限流管理模块_删除
    FLOW_REGULATION_SELECT = "FLOW_REGULATION:SELECT", // 人员限流管理模块_查询
}

// /* 权限常量列表 */
// export const PERMISSION = {
//     /* 全部权限 */
//     ROOT: "ROOT", // 超级管理员
//     /* 角色模块 */
//     ROLE_SELECT: "ROLE:SELECT", // 角色模块_查询
//     ROLE_DELETE: "ROLE:DELETE", // 角色模块_删除
//     ROLE_UPDATE: "ROLE:UPDATE", // 角色模块_更新
//     ROLE_INSERT: "ROLE:INSERT", // 角色模块_插入
//     /* 用户模块 */
//     USER_SELECT: "USER:SELECT", // 用户模块_查询
//     USER_DELETE: "USER:DELETE", // 用户模块_删除
//     USER_UPDATE: "USER:UPDATE", // 用户模块_更新
//     USER_INSERT: "USER:INSERT", // 用户模块_插入
//     /* 部门模块 */
//     DEPT_INSERT: "DEPT:INSERT", // 部门模块_插入
//     DEPT_UPDATE: "DEPT:UPDATE", // 部门模块_更新
//     DEPT_DELETE: "DEPT:DELETE", // 部门模块_删除
//     DEPT_SELECT: "DEPT:SELECT", // 部门模块_查询
//     /* 体检套餐模块 */
//     GOODS_INSERT: "GOODS:INSERT", // 体检套餐模块_插入
//     GOODS_UPDATE: "GOODS:UPDATE", // 体检套餐模块_更新
//     GOODS_DELETE: "GOODS:DELETE", // 体检套餐模块_删除
//     GOODS_SELECT: "GOODS:SELECT", // 体检套餐模块_查询
//     /* 规则模块 */
//     RULE_INSERT: "RULE:INSERT", // 规则模块_插入
//     RULE_UPDATE: "RULE:UPDATE", // 规则模块_更新
//     RULE_DELETE: "RULE:DELETE", // 规则模块_删除
//     RULE_SELECT: "RULE:SELECT", // 规则模块_查询
//     /* 客户模块 */
//     CUSTOMER_INSERT: "CUSTOMER:INSERT", // 客户模块_插入
//     CUSTOMER_UPDATE: "CUSTOMER:UPDATE", // 客户模块_更新
//     CUSTOMER_DELETE: "CUSTOMER:DELETE", // 客户模块_删除
//     CUSTOMER_SELECT: "CUSTOMER:SELECT", // 客户模块_查询
//     /* 订单模块 */
//     ORDER_INSERT: "ORDER:INSERT", // 订单模块_插入
//     ORDER_UPDATE: "ORDER:UPDATE", // 订单模块_更新
//     ORDER_DELETE: "ORDER:DELETE", // 订单模块_删除
//     ORDER_SELECT: "ORDER:SELECT", // 订单模块_查询
//     /* 客服模块 */
//     CUSTOMER_IM_INSERT: "CUSTOMER_IM:INSERT", // 客服模块_插入
//     CUSTOMER_IM_UPDATE: "CUSTOMER_IM:UPDATE", // 客服模块_更新
//     CUSTOMER_IM_DELETE: "CUSTOMER_IM:DELETE", // 客服模块_删除
//     CUSTOMER_IM_SELECT: "CUSTOMER_IM:SELECT", // 客服模块_查询
//     /* 体检预约模块 */
//     APPOINTMENT_INSERT: "APPOINTMENT:INSERT", // 体检预约模块_插入
//     APPOINTMENT_UPDATE: "APPOINTMENT:UPDATE", // 体检预约模块_更新
//     APPOINTMENT_DELETE: "APPOINTMENT:DELETE", // 体检预约模块_删除
//     APPOINTMENT_SELECT: "APPOINTMENT:SELECT", // 体检预约模块_查询
//     /* 体检签到模块 */
//     CUSTOMER_CHECKIN_INSERT: "CUSTOMER_CHECKIN:INSERT", // 体检签到模块_插入
//     CUSTOMER_CHECKIN_UPDATE: "CUSTOMER_CHECKIN:UPDATE", // 体检签到模块_更新
//     CUSTOMER_CHECKIN_DELETE: "CUSTOMER_CHECKIN:DELETE", // 体检签到模块_删除
//     CUSTOMER_CHECKIN_SELECT: "CUSTOMER_CHECKIN:SELECT", // 体检签到模块_查询
//     /* 体检预约设置模块 */
//     APPOINTMENT_RESTRICTION_INSERT: "APPOINTMENT_RESTRICTION:INSERT", // 体检预约设置模块_插入
//     APPOINTMENT_RESTRICTION_UPDATE: "APPOINTMENT_RESTRICTION:UPDATE", // 体检预约设置模块_更新
//     APPOINTMENT_RESTRICTION_DELETE: "APPOINTMENT_RESTRICTION:DELETE", // 体检预约设置模块_删除
//     APPOINTMENT_RESTRICTION_SELECT: "APPOINTMENT_RESTRICTION:SELECT", // 体检预约设置模块_查询
//     /* 医生检查模块 */
//     CHECKUP_INSERT: "CHECKUP:INSERT", // 医生检查模块_插入
//     CHECKUP_UPDATE: "CHECKUP:UPDATE", // 医生检查模块_更新
//     CHECKUP_DELETE: "CHECKUP:DELETE", // 医生检查模块_删除
//     CHECKUP_SELECT: "CHECKUP:SELECT", // 医生检查模块_查询
//     /* 体检报告管理模块 */
//     CHECKUP_REPORT_INSERT: "CHECKUP_REPORT:INSERT", // 体检报告管理模块_插入
//     CHECKUP_REPORT_UPDATE: "CHECKUP_REPORT:UPDATE", // 体检报告管理模块_更新
//     CHECKUP_REPORT_DELETE: "CHECKUP_REPORT:DELETE", // 体检报告管理模块_删除
//     CHECKUP_REPORT_SELECT: "CHECKUP_REPORT:SELECT", // 体检报告管理模块_查询
//     /* 人员限流管理模块 */
//     FLOW_REGULATION_INSERT: "FLOW_REGULATION:INSERT", // 人员限流管理模块_插入
//     FLOW_REGULATION_UPDATE: "FLOW_REGULATION:UPDATE", // 人员限流管理模块_更新
//     FLOW_REGULATION_DELETE: "FLOW_REGULATION:DELETE", // 人员限流管理模块_删除
//     FLOW_REGULATION_SELECT: "FLOW_REGULATION:SELECT", // 人员限流管理模块_查询
// };

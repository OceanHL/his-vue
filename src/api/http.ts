// 导入JQuery库，因为Ajax用起来非常方便，支持同步和异步的Ajax请求
import $ from "jquery";

// 导入ElementUI的消息通知组件，下面封装全局Ajax的时候处理异常的时候需要弹出通知
import { ElMessage } from "element-plus";
import router from "@/router";

// 后端项目的URL根路径
export const baseUrl = "http://localhost:7700/his-api";

// Minio服务器渎职
export const minioUrl = "http://localhost:9000/his";

type MethodType = "post" | "get" | "put" | "delete";

// 封装全局Ajax公共函数
export function http(
    url: string,
    method: MethodType,
    data: any, // 请求体数据
    async: boolean = true,
    fun: Function
) {
    $.ajax({
        url: baseUrl + url,
        type: method,
        async: async, // 同步/异步
        data: JSON.stringify(data), // 请求体数据
        dataType: "json",
        contentType: "application/json",
        traditional: true, // 上传的数据被序列化（允许Ajax上传数组）
        xhrFields: {
            // 允许Ajax请求跨域
            withCredentials: true,
        },
        headers: {
            token: localStorage.getItem("token"), // 携带token令牌
        },
        success: (resp: any) => {
            // 业务状态码为200表示成功
            if (resp.code === 200) {
                fun(resp);
            } else {
                ElMessage.error({
                    message: resp.msg, // 业务错误信息
                    duration: 1200, // 持续1.2秒
                });
            }
        },
        error(xhr: any) {
            // ajax有语法错误的时候，ajax没有发出去
            if (xhr.status == undefined) {
                ElMessage.error({
                    message: "前端页面错误",
                    duration: 1200, // 持续1.2秒
                });
            } else {
                const status = xhr.status;
                // 没有登录体检系统，跳转到登录画面
                if (status == 401) {
                    if (url.startsWith("/front/")) {
                        router.push({
                            name: "FrontIndex",
                        });
                    } else {
                        router.push({
                            name: "MisLogin",
                        });
                    }
                } else {
                    // 后端没有运行，提交的数据有误，或者没有连接上后端项目
                    if (!Object.hasOwn(xhr, "responseText")) {
                        ElMessage.error({
                            message:
                                "后端项目没有启动，或者HTTP请求类型以及参数错误",
                            duration: 1200, // 持续1.2秒
                        });
                    } else {
                        ElMessage.error({
                            message: xhr.responseText, // 后端返回的错误信息
                            duration: 1200, // 持续1.2秒
                        });
                    }
                }
            }
        },
    });
}

import type { ComponentInternalInstance } from "vue";
import { PermissionEnum } from "@/utils/isAuth";
/**
 * @description 组件实例类型
 */
export interface ComponentInternalInstanceI extends ComponentInternalInstance {
    proxy: globalThis.ComponentPublicInstance | null;
}

/**
 * @description 路由权限函数
 */
export type IsAuthFn = (auth: PermissionEnum[]) => boolean;

/**
 * @description 请求函数
 */
export type HttpFn<T = any> = (
    url: string,
    method: "post" | "get",
    data: any,
    callback: (resp: T) => void
) => void;

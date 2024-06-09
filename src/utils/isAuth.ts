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

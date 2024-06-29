export type Row = {
    id: number;
    name: string;
    sex: "男" | "女";
    email: string;
    deptName: string;
    hiredate: string;
    root: boolean;
    status: 1 | 2;
    roles: string; // [角色1、角色2、角色3]
};

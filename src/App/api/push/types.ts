import { RolesEnum } from "../../pages/MainPage/components/NewPush/types";

export type SendNotification = {
    title?: string,
    body?: string,
    toDepartmentRoles: DepartmentRoles[];
    toUserId: toUserId[];
};

export type DepartmentRoles = {
    departmentId: string,
    roles: RolesEnum[];
};

export type toUserId = {
    userId: string;
}

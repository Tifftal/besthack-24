// export type RolesEnum = "ROLE_EMPLOYEE" | "ROLE_USER"

export enum RolesEnum { ROLE_EMPLOYEE = "ROLE_EMPLOYEE", ROLE_USER = "ROLE_USER" };

export const RolesToSelect = [
    { value: RolesEnum.ROLE_EMPLOYEE, label: 'Сотрудник' },
    { value: RolesEnum.ROLE_USER, label: 'Пользователь' },
    { value: '', label: '-' },
  ]

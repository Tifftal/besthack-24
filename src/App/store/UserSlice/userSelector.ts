import { RootState } from "./UserSlice";

export const selectUserState = (state: RootState) => state.user;

// Если вам надо написать какой-то свой селектор, то пишите следующим образом:
// Параметры можно дополнять и выполнять какую-то мелкую логику внутри селектора
// Пример: отфильтровать что-то
// state передавать обязательно, иначе он не поймет откуда брать данные

export const selectUsername = (state: RootState) => selectUserState(state).username;

export const selectAllUsers = (state: RootState) => selectUserState(state).users;

export const selectUsersDepartments = (state: RootState) => selectUserState(state).departmentRoles;

export const selectIsUserAdmin = (state: RootState) => selectUserState(state).globalRole === 'ROLE_ADMIN';

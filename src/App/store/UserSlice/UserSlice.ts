import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";
import { DepartmentRole, FullInfo } from "../../pages/MainPage/MainPage";
export type JwtTokens = {
    access: string;
    refresh: string;
}

export type User = {
    id: string;
    name: string;
    surname: string;
    middleName: string;
    globalRole: string;
    username: string;
    jwtTokens: JwtTokens;
};

type UserState = FullInfo & User & { users: User[]; createDate: string; departmentRoles: DepartmentRole[] };

const initialState: UserState = {
    id: '',
    username: '',
    globalRole: '',
    middleName: '',
    surname: '',
    name: '',
    jwtTokens: {
        access: '',
        refresh: '',
    },
    users: [],
    createDate: '',
    departmentRoles: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            Object.assign(state, action.payload);
        },
        refreshTokens: (state, action: PayloadAction<JwtTokens>) => {
            Object.assign(state.jwtTokens, action.payload);
        },
        logout: (state) => {
            Object.assign(state, initialState);
        },
        setUsers: (state, action: PayloadAction<UserState[]>) => {
            state.users = action.payload;
        },
    }
})

export const {
    setUser,
    refreshTokens,
    logout,
    setUsers,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export type RootState = {
    [userSlice.name]: UserState;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof userSlice.actions>
>();

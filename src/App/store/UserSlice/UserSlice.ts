import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

export type JwtTokens = {
    access: string;
    refresh: string;
}

export type UserState = {
    id: string;
    mail: string;
    username: string;
    status: string;
    jwtTokens: JwtTokens;
};

const initialState: UserState = {
    id: '',
    mail: '',
    username: '',
    status: '',
    jwtTokens: {
        access: '',
        refresh: '',
    },
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
    }
})

export const {
    setUser,
    refreshTokens,
    logout,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export type RootState = {
    [userSlice.name]: UserState;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof userSlice.actions>
>();

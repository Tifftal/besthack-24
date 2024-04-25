import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

export type DepartmentState = {
    id: string,
    name: string,
    amountOfPeople: number,
    canSentTo: string[]
};

const initialState: DepartmentState[] = [];

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        setDepartments: (state, action: PayloadAction<DepartmentState[]>) => {
            state = action.payload;
            return state
        },
        addDepartment: (state, action: PayloadAction<DepartmentState>) => {
            state = [...state, action.payload];
            return state
        },
        updateDepartments: (state, action: PayloadAction<DepartmentState>) => {
            return state.map((department) => {
                const { id } = action.payload;

                if (department.id === id) {
                    department = action.payload;
                }

                return department;
            })
        }
    }
})

export const {
    setDepartments,
    addDepartment,
    updateDepartments
} = departmentSlice.actions;

export const departmentReducer = departmentSlice.reducer;

export type RootState = {
    [departmentSlice.name]: DepartmentState;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof departmentSlice.actions>
>();

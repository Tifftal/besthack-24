import { RootState } from "./DepatmentSlice";

export const selectDepartmentState = (state: RootState) => {
    return state.department;
};

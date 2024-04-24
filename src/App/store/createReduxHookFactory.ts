import {
    useStore as _useStore,
    TypedUseSelectorHook,
    useSelector as _useSelector,
    useDispatch as _useDispatch,
} from "react-redux";
import { configureStore, Dispatch, UnknownAction } from "@reduxjs/toolkit";

type RootState = ReturnType<ReturnType<typeof configureStore>["getState"]>;

export const createReduxHookFactory = <
    S extends RootState,
    A extends UnknownAction,
>() => {
    return {
        useStore: () => {
            // @ts-ignore
            const store = _useStore<S>();
            return store;
        },
        useSelector: _useSelector as TypedUseSelectorHook<S>,
        useDispatch: () => _useDispatch<Dispatch<A>>(),
    }
}
import { ActionFromReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { userReducer, userSlice } from './UserSlice/UserSlice';
import { createReduxHookFactory } from './createReduxHookFactory';

const initialReducers = {
  [userSlice.name]: userReducer,
}

export const store = configureStore({
  reducer: {
    ...initialReducers
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type RootActions = ActionFromReducersMapObject<typeof initialReducers>;

export const { useStore, useSelector, useDispatch } = createReduxHookFactory<
  RootState,
  RootActions
>();
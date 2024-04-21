import { Reducer, configureStore } from '@reduxjs/toolkit';

export type Action = { type: string; payload?: unknown };

const sessionReducer = (state = { user: null }, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

const store = configureStore({
    reducer: {
        session: sessionReducer as Reducer<{ user: unknown } | undefined, Action>,
    },
});

export default store;

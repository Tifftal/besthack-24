import { Reducer, configureStore } from '@reduxjs/toolkit';
import { RegResponse } from './pages/RegistrationPage/RegistrationPage';

export type Action = { type: string; payload?: unknown };

const sessionReducer = (state: RegResponse = null, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, state: action.payload };
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

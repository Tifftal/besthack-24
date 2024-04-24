import { Reducer, configureStore } from '@reduxjs/toolkit';
import { RegResponse } from './pages/RegistrationPage/RegistrationPage';

export type Action = { type: string; payload?: unknown };

const initialState: RegResponse = {
  id: '',
  mail: '',
  username: '',
  status: '',
  jwtTokens: {
    access: '',
    refresh: '',
  },
};

const sessionReducer = (state: RegResponse = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, state: action.payload };
    case 'REFRESH_TOKENS':
      return { ...state, jwtTokens: action.payload }; 
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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignInRequired: true,
  isSigningIn: false,
  isSignedIn: false,
  errors: null,
  hello: false,
};

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginRequired: (state, { payload }) => {
      state.isSignInRequired = payload;
    },
    setLoginSuccess: (state) => {
      state.isSignedIn = true;
    },
    setLoginFailure: (state, { payload }) => {
      state.isSignedIn = false;
      state.errors = payload.message;
    },
    setLogout: (state) => {
      state.isSignedIn = false;
      state.errors = null;
    },
  },
});

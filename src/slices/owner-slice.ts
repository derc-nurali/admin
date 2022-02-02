import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
};

export const { actions: ownerActions, reducer: ownerReducer } = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setOwner: (state, { payload }) => ({
      ...state,
      info: { ...payload },
    }),
    clearOwner: (state) => ({
      ...state,
      info: null,
    }),
  },
});

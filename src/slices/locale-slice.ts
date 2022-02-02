import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hits: null,
  isHitsFetching: false,
};

export const { actions: localeActions, reducer: localeReducer } = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setHits: (state, { payload }) => ({ ...state, hits: payload }),
    setHitsFetchingStart: (state) => ({ ...state, isHitsFetching: true }),
    setHitsFetchingEnd: (state) => ({ ...state, isHitsFetching: false }),
  },
});

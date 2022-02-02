import { createSlice } from '@reduxjs/toolkit';
import { DRAWER_KEY } from '../constants/app/keys-constants';

const storageState = localStorage.getItem(DRAWER_KEY);
const isVisible = storageState === 'true';

const initialState = {
  isVisible,
};

export const { actions: drawerActions, reducer: drawerReducer } = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggle: (state) => ({ ...state, isVisible: !state.isVisible }),
    show: (state) => ({ ...state, isVisible: true }),
    hide: (state) => ({ ...state, isVisible: false }),
  },
});

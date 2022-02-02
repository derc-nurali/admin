import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCALE_RU } from '../constants/app/locales-constants';

const initialState = {
  current: LOCALE_RU,
};

export const { actions: currentLocaleActions, reducer: currentLocaleReducer } =
  createSlice({
    name: 'currentLocale',
    initialState,
    reducers: {
      setCurrentLocale: (state, { payload }: PayloadAction<string>) => {
        state.current = payload;
      },
    },
  });

import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_FAQ } from '../constants/app/entity-constants';

const initialState = {
  catalog: {
    isLoading: false,
    hits: null,
  },
  counts: {
    isLoading: false,
  },
};

export const { actions: faqActions, reducer: faqReducer } = createSlice({
  name: ENTITY_FAQ,
  initialState,
  reducers: {
    //List
    setCatalogRequest: (state) => {
      state.catalog = {
        isLoading: true,
        hits: null,
      };
    },
    setCatalogSuccess: (state, { payload }) => {
      state.catalog = {
        isLoading: false,
        hits: payload,
      };
    },
    setCatalogFailure: (state) => {
      state.catalog = {
        isLoading: false,
        hits: null,
      };
    },

    //Counts
    setCountsRequest: (state) => {
      state.counts = {
        ...state.counts,
        isLoading: true,
      };
    },
    setCountsSuccess: (state, { payload }) => {
      state.counts = {
        ...state.counts,
        ...payload,
        isLoading: false,
      };
    },
    setCountsFailure: (state) => {
      state.counts = {
        ...state.counts,
        isLoading: false,
      };
    },

    //Default
    setDefault: (state) => {
      state.catalog = {
        isLoading: false,
        hits: null,
      };
      state.counts = {
        isLoading: false,
      };
    },
  },
});

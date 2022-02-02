import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_PORTFOLIO } from '../constants/app/entity-constants';

const initialState = {
  catalog: {
    isLoading: false,
    hits: null,
  },
  latest: {
    isLoading: false,
  },
  counts: {
    isLoading: false,
  },
};

export const { actions: portfolioActions, reducer: portfolioReducer } =
  createSlice({
    name: ENTITY_PORTFOLIO,
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

      //Latest
      setLatestRequest: (state) => {
        state.latest = {
          ...state.latest,
          isLoading: true,
        };
      },
      setLatestSuccess: (state, { payload }) => {
        state.latest = {
          ...state.latest,
          ...payload,
          isLoading: false,
        };
      },
      setLatestFailure: (state) => {
        state.latest = {
          ...state.latest,
          isLoading: false,
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
        state.latest = {
          isLoading: false,
        };
        state.counts = {
          isLoading: false,
        };
      },
    },
  });

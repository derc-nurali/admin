import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_SUBDIVISION } from '../constants/app/entity-constants';

const initialState = {
  catalog: {
    isLoading: false,
    hits: null,
  },
  counts: {
    isLoading: false,
  },
  parents: {
    isLoading: false,
  },
};

export const { actions: subdivisionActions, reducer: subdivisionReducer } =
  createSlice({
    name: ENTITY_SUBDIVISION,
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

      //Parents
      setParentsRequest: (state) => {
        state.parents = {
          ...state.parents,
          isLoading: true,
        };
      },
      setParentsSuccess: (state, { payload }) => {
        state.parents = {
          ...state.parents,
          ...payload,
          isLoading: false,
        };
      },
      setParentsFailure: (state) => {
        state.parents = {
          ...state.parents,
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
        state.parents = {
          isLoading: false,
        };
      },
    },
  });

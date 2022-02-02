import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_POST_CATEGORY } from '../constants/app/entity-constants';

const initialState = {
  catalog: {
    isLoading: false,
    hits: null,
  },
  counts: {
    isLoading: false,
  },
  nodes: {
    isLoading: false,
    hits: null,
  },
};

export const { actions: postCategoryActions, reducer: postCategoryReducer } =
  createSlice({
    name: ENTITY_POST_CATEGORY,
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

      //Nodes
      setNodesRequest: (state) => {
        state.nodes = {
          isLoading: true,
          hits: null,
        };
      },
      setNodesSuccess: (state, { payload }) => {
        state.nodes = {
          isLoading: false,
          hits: payload,
        };
      },
      setNodesFailure: (state) => {
        state.nodes = {
          isLoading: false,
          hits: null,
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
        state.nodes = {
          isLoading: false,
          hits: null,
        };
      },
    },
  });

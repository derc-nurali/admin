import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_ACTIVITY } from '../constants/app/entity-constants';

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
  nodes: {
    isLoading: false,
  },
};

export const { actions: activityActions, reducer: activityReducer } =
  createSlice({
    name: ENTITY_ACTIVITY,
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

      //Nodes
      setNodesRequest: (state) => {
        state.latest = {
          ...state.nodes,
          isLoading: true,
        };
      },
      setNodesSuccess: (state, { payload }) => {
        state.nodes = {
          ...state.nodes,
          ...payload,
          isLoading: false,
        };
      },
      setNodesFailure: (state) => {
        state.nodes = {
          ...state.nodes,
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
        state.nodes = {
          isLoading: false,
        };
      },
    },
  });

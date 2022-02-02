import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_PROJECT } from '../constants/app/entity-constants';

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

export const { actions: projectActions, reducer: projectReducer } = createSlice(
  {
    name: ENTITY_PROJECT,
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
  }
);

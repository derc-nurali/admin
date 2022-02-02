import { createSlice } from '@reduxjs/toolkit';
import { ACTIVE_FLOW } from '../constants/app/keys-constants';

const initialState = {
  flow: localStorage.getItem(ACTIVE_FLOW),
  projects: null,
};

export const { actions: workflowActions, reducer: workflowReducer } =
  createSlice({
    name: 'workflow',
    initialState,
    reducers: {
      setFlow: (state, { payload }) => {
        state.flow = payload;
      },
      setProject: (state, { payload }) => {
        state.projects = payload;
      },
    },
  });

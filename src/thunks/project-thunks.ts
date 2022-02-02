import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { projectActions } from '../slices/project-slice';
import { ApiProjects } from '../http';
import { ENTITY_PROJECT } from '../constants/app/entity-constants';

const {
  setCatalogRequest,
  setCatalogSuccess,
  setCatalogFailure,

  setCountsRequest,
  setCountsSuccess,
  setCountsFailure,

  setNodesRequest,
  setNodesSuccess,
  setNodesFailure,

  setDefault,
} = projectActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiProjects.fetchAll(params);
      dispatch(setCatalogSuccess(hits));
    } catch (e) {
      dispatch(setCatalogFailure());
    }
  };

//Counts
export const forceGetCounts =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setCountsRequest());
    const params = {
      language: locale,
      take: 1,
    };
    try {
      const { total } = await await ApiProjects.fetchAll(params);
      const drafts = 0;
      dispatch(setCountsSuccess({ [locale]: { total, drafts } }));
    } catch (e) {
      dispatch(setCountsFailure());
    }
  };
export const getCounts =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { counts } = storeStates[ENTITY_PROJECT];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Nodes
export const forceGetNodes =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setNodesRequest());
    try {
      const { hits } = await ApiProjects.fetchAll({
        take: 99999,
        language: locale,
      });
      dispatch(setNodesSuccess({ [locale]: hits }));
    } catch (e) {
      dispatch(setNodesFailure());
    }
  };
export const getNodes =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { nodes } = storeStates[ENTITY_PROJECT];
    if (isEmpty(nodes[locale]) && !nodes.isLoading) {
      dispatch(forceGetNodes(locale));
    }
  };

//Clear
export const clearProjects = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

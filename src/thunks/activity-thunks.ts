import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { activityActions } from '../slices/activity-slice';
import { ApiActivities } from '../http';
import { ENTITY_ACTIVITY } from '../constants/app/entity-constants';

const {
  setCatalogRequest,
  setCatalogSuccess,
  setCatalogFailure,

  setLatestRequest,
  setLatestSuccess,
  setLatestFailure,

  setCountsRequest,
  setCountsSuccess,
  setCountsFailure,

  setNodesRequest,
  setNodesSuccess,
  setNodesFailure,

  setDefault,
} = activityActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiActivities.fetchAll(params);
      dispatch(setCatalogSuccess(hits));
    } catch (e) {
      dispatch(setCatalogFailure());
    }
  };

//Latest
export const forceGetLatest =
  (params: { language: string; take: number }) =>
  async (dispatch: Dispatch<any>) => {
    dispatch(setLatestRequest());
    try {
      const { hits } = await ApiActivities.fetchAll(params);
      dispatch(setLatestSuccess({ [params.language]: { hits } }));
    } catch (e) {
      dispatch(setLatestFailure());
    }
  };
export const getLatest =
  (params: { language: string; take: number }) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { latest } = storeStates[ENTITY_ACTIVITY];
    if (isEmpty(latest[params.language]) && !latest.isLoading) {
      dispatch(forceGetLatest(params));
    }
  };

//Counts
export const forceGetCounts =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setCountsRequest());
    const params = {
      language: locale,
      take: 1,
      exclude:
        'description,shortDescription,title,slug,activities,cover,language,tags,updatedAt,createdAt,createdBy',
    };
    const promises = [
      await ApiActivities.fetchAll({ ...params, isActive: 1 }),
      await ApiActivities.fetchAll({ ...params, isActive: 0 }),
    ];

    try {
      const [active, notActive] = await Promise.all(promises);
      const total = active.total;
      const drafts = notActive.total;
      dispatch(setCountsSuccess({ [locale]: { total, drafts } }));
    } catch (e) {
      dispatch(setCountsFailure());
    }
  };
export const getCounts =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { counts } = storeStates[ENTITY_ACTIVITY];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Nodes
export const forceGetNodes =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setNodesRequest());
    try {
      const { hits } = await ApiActivities.fetchAll({
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
    const { nodes } = storeStates[ENTITY_ACTIVITY];
    if (isEmpty(nodes[locale]) && !nodes.isLoading) {
      dispatch(forceGetNodes(locale));
    }
  };

//Clear
export const clearActivity = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

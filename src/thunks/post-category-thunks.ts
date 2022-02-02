import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { postCategoryActions } from '../slices/post-category-slice';
import { ApiPostsCategories } from '../http';
import { ENTITY_POST_CATEGORY } from '../constants/app/entity-constants';

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
} = postCategoryActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiPostsCategories.fetchAll(params);
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
      const { total } = await ApiPostsCategories.fetchAll(params);
      const drafts = 0;
      dispatch(setCountsSuccess({ [locale]: { total, drafts } }));
    } catch (e) {
      dispatch(setCountsFailure());
    }
  };
export const getCounts =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { counts } = storeStates[ENTITY_POST_CATEGORY];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Nodes
export const getNodes = () => async (dispatch: Dispatch<any>) => {
  dispatch(setNodesRequest());
  try {
    const { hits } = await ApiPostsCategories.fetchAll({
      take: 99999,
    });
    dispatch(setNodesSuccess(hits));
  } catch (e) {
    dispatch(setNodesFailure());
  }
};

//Clear
export const clearPostCategory = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

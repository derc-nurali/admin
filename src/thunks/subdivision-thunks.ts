import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { subdivisionActions } from '../slices/subdivision-slice';
import { ApiSubdivisions } from '../http';
import { ENTITY_SUBDIVISION } from '../constants/app/entity-constants';

const {
  setCatalogRequest,
  setCatalogSuccess,
  setCatalogFailure,

  setCountsRequest,
  setCountsSuccess,
  setCountsFailure,

  setParentsRequest,
  setParentsSuccess,
  setParentsFailure,

  setDefault,
} = subdivisionActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiSubdivisions.fetchAll(params);
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
      exclude: 'description,shortDescription',
    };
    const promises = [
      await ApiSubdivisions.fetchAll({ ...params, isActive: 1 }),
      await ApiSubdivisions.fetchAll({ ...params, isActive: 0 }),
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
    const { counts } = storeStates[ENTITY_SUBDIVISION];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Parents
export const forceGetParents =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setParentsRequest());
    try {
      const { hits } = await ApiSubdivisions.fetchAll({
        language: locale,
        take: 99999,
        isParent: 1,
      });
      dispatch(setParentsSuccess({ [locale]: hits }));
    } catch (e) {
      dispatch(setParentsFailure());
    }
  };
export const getParents =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { parents } = storeStates[ENTITY_SUBDIVISION];
    if (isEmpty(parents[locale]) && !parents.isLoading) {
      dispatch(forceGetParents(locale));
    }
  };

//Clear
export const clearSubdivision = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { superuserActions } from '../slices/superuser-slice';
import { ApiSuperUsers } from '../http';
import { ENTITY_SUPERUSER } from '../constants/app/entity-constants';

const {
  setCatalogRequest,
  setCatalogSuccess,
  setCatalogFailure,

  setCountsRequest,
  setCountsSuccess,
  setCountsFailure,

  setDefault,
} = superuserActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiSuperUsers.fetchAll(params);
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
    try {
      const { total } = await ApiSuperUsers.fetchAll(params);
      const drafts = 0;
      dispatch(setCountsSuccess({ [locale]: { total, drafts } }));
    } catch (e) {
      dispatch(setCountsFailure());
    }
  };
export const getCounts =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { counts } = storeStates[ENTITY_SUPERUSER];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Clear
export const clearSuperuser = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

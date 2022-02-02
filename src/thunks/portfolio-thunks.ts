import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { portfolioActions } from '../slices/portfolio-slice';
import { ApiPortfolio } from '../http';
import { ENTITY_PORTFOLIO } from '../constants/app/entity-constants';

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

  setDefault,
} = portfolioActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiPortfolio.fetchAll(params);
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
      const { hits } = await ApiPortfolio.fetchAll(params);
      dispatch(setLatestSuccess({ [params.language]: { hits } }));
    } catch (e) {
      dispatch(setLatestFailure());
    }
  };
export const getLatest =
  (params: { language: string; take: number }) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { latest } = storeStates[ENTITY_PORTFOLIO];
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
        'description,shortDescription,title,slug,activities,colors,cover,logo,url,language,tags,updatedAt,createdAt,createdBy',
    };
    const promises = [
      await ApiPortfolio.fetchAll({ ...params, isActive: 1 }),
      await ApiPortfolio.fetchAll({ ...params, isActive: 0 }),
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
    const { counts } = storeStates[ENTITY_PORTFOLIO];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Clear
export const clearPortfolio = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { newsActions } from '../slices/news-slice';
import { ApiNews } from '../http';
import { ENTITY_NEWS } from '../constants/app/entity-constants';

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

  setTagsRequest,
  setTagsSuccess,
  setTagsFailure,

  setDefault,
} = newsActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiNews.fetchAll(params);
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
      const { hits } = await ApiNews.fetchAll(params);
      dispatch(setLatestSuccess({ [params.language]: { hits } }));
    } catch (e) {
      dispatch(setLatestFailure());
    }
  };
export const getLatest =
  (params: { language: string; take: number }) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { latest } = storeStates[ENTITY_NEWS];
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
      await ApiNews.fetchAll({ ...params, isActive: 1 }),
      await ApiNews.fetchAll({ ...params, isActive: 0 }),
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
    const { counts } = storeStates[ENTITY_NEWS];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Tags
export const forceGetTags =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setTagsRequest());
    try {
      const { hits } = await ApiNews.fetchAllTags({ language: locale });
      dispatch(setTagsSuccess({ [locale]: hits }));
    } catch (e) {
      dispatch(setTagsFailure());
    }
  };
export const getTags =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { tags } = storeStates[ENTITY_NEWS];
    if (isEmpty(tags[locale]) && !tags.isLoading) {
      dispatch(forceGetTags(locale));
    }
  };
export const addTag =
  (locale: string, tag: string) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { tags } = storeStates[ENTITY_NEWS];
    const hits = tags[locale] ? [...tags[locale]] : [];
    hits.push(tag);
    dispatch(setTagsSuccess({ [locale]: hits }));
  };

//Clear
export const clearNews = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

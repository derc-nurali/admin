import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { postActions } from '../slices/post-slice';
import { ApiPosts } from '../http';
import { ENTITY_POST } from '../constants/app/entity-constants';

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
} = postActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiPosts.fetchAll(params);
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
      const { hits } = await ApiPosts.fetchAll(params);
      dispatch(setLatestSuccess({ [params.language]: { hits } }));
    } catch (e) {
      dispatch(setLatestFailure());
    }
  };
export const getLatest =
  (params: { language: string; take: number }) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { latest } = storeStates[ENTITY_POST];
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
        'description,shortDescription,title,slug,cover,language,tags,updatedAt,createdAt,createdBy',
    };
    const promises = [
      await ApiPosts.fetchAll({ ...params, isActive: 1 }),
      await ApiPosts.fetchAll({ ...params, isActive: 0 }),
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
    const { counts } = storeStates[ENTITY_POST];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Tags
export const forceGetTags =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setTagsRequest());
    try {
      const { hits } = await ApiPosts.fetchAllTags({ language: locale });
      dispatch(setTagsSuccess({ [locale]: hits }));
    } catch (e) {
      dispatch(setTagsFailure());
    }
  };
export const getTags =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { tags } = storeStates[ENTITY_POST];
    if (isEmpty(tags[locale]) && !tags.isLoading) {
      dispatch(forceGetTags(locale));
    }
  };
export const addTag =
  (locale: string, tag: string) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { tags } = storeStates[ENTITY_POST];
    const hits = tags[locale] ? [...tags[locale]] : [];
    hits.push(tag);
    dispatch(setTagsSuccess({ [locale]: hits }));
  };

//Clear
export const clearPost = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

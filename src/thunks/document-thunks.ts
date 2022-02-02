import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { documentActions } from '../slices/document-slice';
import { ApiDocuments } from '../http';
import { ENTITY_DOCUMENT } from '../constants/app/entity-constants';

const {
  setCatalogRequest,
  setCatalogSuccess,
  setCatalogFailure,

  setCountsRequest,
  setCountsSuccess,
  setCountsFailure,

  setTagsRequest,
  setTagsSuccess,
  setTagsFailure,

  setDefault,
} = documentActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiDocuments.fetchAll(params);
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
      await ApiDocuments.fetchAll({ ...params, isActive: 1 }),
      await ApiDocuments.fetchAll({ ...params, isActive: 0 }),
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
    const { counts } = storeStates[ENTITY_DOCUMENT];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Tags
export const forceGetTags =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setTagsRequest());
    try {
      const { hits } = await ApiDocuments.fetchAllTags({ language: locale });
      dispatch(setTagsSuccess({ [locale]: hits }));
    } catch (e) {
      dispatch(setTagsFailure());
    }
  };
export const getTags =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { tags } = storeStates[ENTITY_DOCUMENT];
    if (isEmpty(tags[locale]) && !tags.isLoading) {
      dispatch(forceGetTags(locale));
    }
  };
export const addTag =
  (locale: string, tag: string) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { tags } = storeStates[ENTITY_DOCUMENT];
    const hits = tags[locale] ? [...tags[locale]] : [];
    hits.push(tag);
    dispatch(setTagsSuccess({ [locale]: hits }));
  };

//Clear
export const clearDocument = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

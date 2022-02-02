import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { faqActions } from '../slices/faq-slice';
import { ApiFaq } from '../http';
import { ENTITY_FAQ } from '../constants/app/entity-constants';

const {
  setCatalogRequest,
  setCatalogSuccess,
  setCatalogFailure,

  setCountsRequest,
  setCountsSuccess,
  setCountsFailure,

  setDefault,
} = faqActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiFaq.fetchAll(params);
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
      exclude:
        'description,shortDescription,title,slug,activities,cover,language,tags,updatedAt,createdAt,createdBy',
    };
    const promises = [
      await ApiFaq.fetchAll({ ...params, isActive: 1 }),
      await ApiFaq.fetchAll({ ...params, isActive: 0 }),
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
    const { counts } = storeStates[ENTITY_FAQ];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Clear
export const clearFaq = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

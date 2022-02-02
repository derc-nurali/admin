import { Dispatch } from 'redux';
import { isEmpty } from 'lodash';
import { vacancyActions } from '../slices/vacancy-slice';
import { ApiVacancies } from '../http';
import { ENTITY_VACANCY } from '../constants/app/entity-constants';

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
} = vacancyActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiVacancies.fetchAll(params);
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
      const { hits } = await ApiVacancies.fetchAll(params);
      dispatch(setLatestSuccess({ [params.language]: { hits } }));
    } catch (e) {
      dispatch(setLatestFailure());
    }
  };
export const getLatest =
  (params: { language: string; take: number }) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { latest } = storeStates[ENTITY_VACANCY];
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
      await ApiVacancies.fetchAll({ ...params, isActive: 1 }),
      await ApiVacancies.fetchAll({ ...params, isActive: 0 }),
      await ApiVacancies.fetchAllApplications({
        language: locale,
        take: 1,
        exclude: 'description,email,fullName,phone,position,resume,vacancy',
      }),
    ];

    try {
      const [active, notActive, apps] = await Promise.all(promises);
      const total = active.total;
      const drafts = notActive.total;
      const applications = apps.total;
      dispatch(setCountsSuccess({ [locale]: { total, drafts, applications } }));
    } catch (e) {
      dispatch(setCountsFailure());
    }
  };
export const getCounts =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { counts } = storeStates[ENTITY_VACANCY];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Clear
export const clearVacancy = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

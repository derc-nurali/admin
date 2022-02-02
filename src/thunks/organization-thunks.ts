import { Dispatch } from 'redux';
import { organizationActions } from '../slices/organization-slice';
import { ApiOrganizations } from '../http';
import { ENTITY_ORGANIZATION } from '../constants/app/entity-constants';
import { isEmpty } from 'lodash';

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
} = organizationActions;

//List
export const getCatalog =
  (params: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    dispatch(setCatalogRequest());
    try {
      const { hits } = await ApiOrganizations.fetchAll(params);
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
    try {
      const { total } = await ApiOrganizations.fetchAll(params);
      const drafts = 0;
      dispatch(setCountsSuccess({ [locale]: { total, drafts } }));
    } catch (e) {
      dispatch(setCountsFailure());
    }
  };
export const getCounts =
  (locale: string) => async (dispatch: Dispatch<any>, getState: any) => {
    const storeStates = getState();
    const { counts } = storeStates[ENTITY_ORGANIZATION];
    if (isEmpty(counts[locale]) && !counts.isLoading) {
      dispatch(forceGetCounts(locale));
    }
  };

//Nodes
export const forceGetNodes =
  (locale: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setNodesRequest());
    try {
      const { hits } = await ApiOrganizations.fetchAll({
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
    const { nodes } = storeStates[ENTITY_ORGANIZATION];
    if (isEmpty(nodes[locale]) && !nodes.isLoading) {
      dispatch(forceGetNodes(locale));
    }
  };

//Clear
export const clearOrganization = () => async (dispatch: Dispatch<any>) => {
  dispatch(setDefault());
};

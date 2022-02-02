import { Dispatch } from 'redux';
import { localeActions } from '../slices/locale-slice';
import { ApiLanguages } from '../http';
import { map, isEmpty } from 'lodash';

const { setHits, setHitsFetchingStart, setHitsFetchingEnd } = localeActions;

export const forceGetHits = () => async (dispatch: Dispatch<any>) => {
  dispatch(setHitsFetchingStart());
  try {
    const { hits } = await ApiLanguages.fetchAll({ take: 99, skip: 0 });
    const locales = map(hits, (locale) => {
      const slx = locale.code === 'oz' ? 4 : 3;
      return {
        shortName: locale.name.slice(0, slx),
        ...locale,
      };
    });
    dispatch(setHits(locales));
    dispatch(setHitsFetchingEnd());
  } catch (e) {
    dispatch(setHits(null));
    dispatch(setHitsFetchingEnd());
  }
};

export const getHits = () => async (dispatch: Dispatch<any>, getState: any) => {
  const storeStates = getState();
  const { hits, isHitsFetching } = storeStates.locale;
  if (isEmpty(hits) && !isHitsFetching) {
    dispatch(forceGetHits());
  }
};

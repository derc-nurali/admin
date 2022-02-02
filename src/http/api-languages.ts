import { API_ENDPOINTS } from '../constants/routes/api-endpoints-constants';
import { API } from './api-config';

const { LANGUAGES } = API_ENDPOINTS;
const { FIND_ALL, FIND_ONE } = LANGUAGES;

export const ApiLanguages = {
  fetchAll: (params: Record<string, any>) => {
    return API({
      path: FIND_ALL,
      method: 'GET',
      params,
    });
  },
  fetchOne: (id: string | number) => {
    return API({
      path: FIND_ONE,
      method: 'GET',
      pathParams: { id },
    });
  },
};

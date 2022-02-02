import { API_ENDPOINTS } from '../constants/routes/api-endpoints-constants';
import { API } from './api-config';

const { LANGUAGE_LINKS } = API_ENDPOINTS;
const { FIND_ONE, CREATE_ONE } = LANGUAGE_LINKS;

export const ApiLanguageLinks = {
  fetchOne: (entity: string, id: string | number) => {
    return API({
      path: FIND_ONE,
      method: 'GET',
      pathParams: { entity, id },
    });
  },
  createOne: (data: Record<string, any>) => {
    return API({
      path: CREATE_ONE,
      method: 'POST',
      data,
    });
  },
};

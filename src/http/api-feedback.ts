import { API_ENDPOINTS } from '../constants/routes/api-endpoints-constants';
import { API, API_UPLOAD } from './api-config';

const { FEEDBACK } = API_ENDPOINTS;
const { FIND_ALL, FIND_ONE, DELETE_ONE, CREATE_ONE } = FEEDBACK;

export const ApiFeedback = {
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
  deleteOne: (id: any) => {
    return API({
      path: DELETE_ONE,
      method: 'DELETE',
      pathParams: { id },
    });
  },
  createOne: (data: any) => {
    return API_UPLOAD({
      path: CREATE_ONE,
      method: 'POST',
      data,
    });
  },
};

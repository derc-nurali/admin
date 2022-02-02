import { API_ENDPOINTS } from '../constants/routes/api-endpoints-constants';
import { API } from './api-config';

const { MEDIALIB } = API_ENDPOINTS;
const { FIND_ALL, FIND_ONE, CREATE_ONE, UPDATE_ONE, PATCH_ONE, DELETE_ONE } =
  MEDIALIB;

export const ApiMedialib = {
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
  createOne: (data: Record<string, any>) => {
    return API({
      path: CREATE_ONE,
      method: 'POST',
      data,
    });
  },
  updateOne: (id: string | number, data: Record<string, any>) => {
    return API({
      path: UPDATE_ONE,
      method: 'PUT',
      pathParams: { id },
      data,
    });
  },
  patchOne: (id: string | number, data: Record<string, any>) => {
    return API({
      path: PATCH_ONE,
      method: 'PATCH',
      pathParams: { id },
      data,
    });
  },
  deleteOne: (id: string | number) => {
    return API({
      path: DELETE_ONE,
      method: 'DELETE',
      pathParams: { id },
    });
  },
};

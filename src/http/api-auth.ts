import { API_ENDPOINTS } from '../constants/routes/api-endpoints-constants';
import { API } from './api-config';

const { AUTH } = API_ENDPOINTS;
const { LOGIN, CODE, ME } = AUTH;

export const ApiAuth = {
  auth: (data: Record<string, any>) => {
    return API({
      path: LOGIN,
      method: 'POST',
      data,
    });
  },
  code: (data: Record<string, any>) => {
    return API({
      path: CODE,
      method: 'POST',
      data,
    });
  },
  me: (params?: Record<string, any>) => {
    return API({
      path: ME,
      method: 'GET',
      params,
    });
  },
};

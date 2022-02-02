import { forEach, isEmpty } from 'lodash';
import { ACTIVE_FLOW, AUTH_TOKEN_KEY } from '../constants/app/keys-constants';
import { store } from '../common/store';
import { authLogout } from '../thunks/auth-thunks';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface PathProps {
  path: string;
  params?: Record<string, any>;
  pathParams?: Record<string, any>;
}

interface ApiProps extends PathProps {
  method: HttpMethod;
  headers?: Record<string, any>;
  data?: any;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getPath = ({ path, params, pathParams }: PathProps) => {
  forEach(pathParams, (value, key) => {
    path = path.replace(`:${key}`, value);
  });

  let endPoint = `${BASE_URL}${path}`;
  if (path?.includes('https') || path?.includes('http')) endPoint = path;

  if (!isEmpty(params)) return `${endPoint}?${new URLSearchParams(params)}`;
  return endPoint;
};

export const getHeaders = (isFormData: boolean = false) => {
  let headers = {};
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const project =
    process.env.REACT_APP_SINGLE_PROJECT || localStorage.getItem(ACTIVE_FLOW);
  const contentType = { 'Content-Type': 'application/json' };
  const authorization = { Authorization: `Bearer ${token}` };
  if (!isFormData) headers = { ...headers, ...contentType };
  if (!isEmpty(token)) headers = { ...headers, ...authorization };
  if (!isEmpty(project)) headers = { ...headers, project };
  return headers;
};

const fetchResult = async (pathname: string, params: Record<string, any>) => {
  const response = await fetch(pathname, params);
  const { status } = response;
  try {
    const parsed = await response.json();
    if (status >= 200 && status < 300) return parsed;
    console.warn(parsed);
    return Promise.reject(parsed);
  } catch (e) {
    if (status >= 200 && status < 300) return { status };
    if (status === 401) store.dispatch(authLogout() as any);
    console.warn({ status });
    return Promise.reject({ status });
  }
};

export const API = async ({
  path,
  method,
  params,
  pathParams,
  data,
  headers: extraHeaders,
}: ApiProps) => {
  const pathname = getPath({ path, params, pathParams });
  const headers = { ...getHeaders(false), ...extraHeaders };
  const body = JSON.stringify(data);
  return fetchResult(pathname, { method, headers, body });
};

export const API_UPLOAD = async ({
  path,
  method,
  params,
  pathParams,
  data,
}: ApiProps) => {
  const pathname = getPath({ path, params, pathParams });
  const headers = getHeaders(true);
  const body = data;
  return fetchResult(pathname, { method, headers, body });
};

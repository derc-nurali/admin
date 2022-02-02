import { Dispatch } from 'redux';
import { AUTH_TOKEN_KEY } from '../constants/app/keys-constants';
import { ApiAuth } from '../http';
import { authActions } from '../slices/auth-slice';
import { getOwner } from './owner-thunks';
import { clearWorkflow, updateFlow, updateProjects } from './workflow-thunks';

const TOKEN = AUTH_TOKEN_KEY;
const { setLoginRequired, setLoginSuccess, setLoginFailure, setLogout } =
  authActions;

const persistAuthToken = (token: string) => localStorage.setItem(TOKEN, token);
const removeAuthToken = () => localStorage.removeItem(TOKEN);

export const authLogin =
  (data: Record<string, any>) => async (dispatch: Dispatch<any>) => {
    try {
      const { accessToken } = await ApiAuth.auth(data);
      persistAuthToken(accessToken);
      dispatch(setLoginSuccess());
      dispatch(getOwner());
    } catch ({ message }) {
      dispatch(setLoginFailure({ message }));
    }
  };

export const authCode = (code: string) => async (dispatch: Dispatch<any>) => {
  try {
    const { accessToken } = await ApiAuth.code({ code });
    persistAuthToken(accessToken);
    dispatch(setLoginSuccess());
    dispatch(getOwner());
  } catch ({ message }) {
    dispatch(setLoginFailure({ message }));
  }
};

export const authLogout = () => async (dispatch: Dispatch<any>) => {
  removeAuthToken();
  dispatch(setLogout());
  dispatch(updateFlow(null));
  dispatch(updateProjects(null));
  dispatch(clearWorkflow());
};

export const authRestore = () => async (dispatch: Dispatch<any>) => {
  dispatch(setLoginRequired(false));
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    dispatch(setLoginSuccess());
    dispatch(getOwner());
  }
};

import { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  authLogin,
  authCode,
  authLogout,
  authRestore,
} from '../thunks/auth-thunks';

const SSO_URL = process.env.REACT_APP_SSO_URL;
const SSO_CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isPasswordSent, setIsPasswordSent] = useState<boolean>(false);
  const { isSignInRequired, isSignedIn, errors } = useSelector(
    (state: RootStateOrAny) => state.auth
  );

  const sendEmailPassword = ({ email }: Record<string, any>) => {
    return new Promise<void>((resolve) => {
      if (email) {
        setIsPasswordSent(true);
        resolve();
      }
    });
  };

  const cancelSending = () => {
    return new Promise<void>((resolve) => {
      setIsPasswordSent(false);
      resolve();
    });
  };

  const authViaEmail = (credentials: Record<string, any>) => {
    dispatch(authLogin(credentials));
  };

  const authViaSSO = () => {
    const params = {
      response_type: 'one_code',
      client_id: SSO_CLIENT_ID || 'for_testing',
      redirect_uri: window.location.origin,
      scope: 'myportal',
      state: 'testState',
    };
    window.location.href = `${SSO_URL}?${new URLSearchParams(params)}`;
  };

  const authViaCode = (code: string) => {
    dispatch(authCode(code));
  };

  const restoreAuth = () => {
    dispatch(authRestore());
  };

  const logoutAuth = () => {
    dispatch(authLogout());
  };

  return {
    isSignInRequired,
    isSignedIn,
    isPasswordSent,
    errors,
    restoreAuth,
    logoutAuth,
    sendEmailPassword,
    cancelSending,
    authViaEmail,
    authViaSSO,
    authViaCode,
  };
};

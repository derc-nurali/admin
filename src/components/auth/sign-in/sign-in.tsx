import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { ComponentType, useEffect } from 'react';
import { SignInEmailForm } from '.';
import { ROUTES } from '../../../constants/routes/route-constants';
import { useAuth, useLanguage, useRouter } from '../../../hooks';
import { LangSwitcher } from '../../lang-switcher';
import { Logo } from '../../logo';
import { SignInOneId } from './sign-in-one-id';
import useStyles from './styles';
import { dynamicRoute } from '../../../utils/route-utils';

interface SignInProps {
  className?: string;
}

export const SignIn: ComponentType<SignInProps> = ({ className }) => {
  const classes = useStyles();
  const router: any = useRouter();
  const { currentLocale } = useLanguage();
  const {
    isPasswordSent,
    isSignedIn,
    errors,
    sendEmailPassword,
    cancelSending,
    authViaEmail,
    authViaSSO,
    authViaCode,
  } = useAuth();

  useEffect(() => {
    if (isSignedIn) router.push(`/${currentLocale}${ROUTES.DASHBOARD.ROOT}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  useEffect(() => {
    if (router?.query?.code) {
      authViaCode(router?.query?.code);
      router.push(dynamicRoute(ROUTES.EMPTY));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <div className={clsx(classes.root, className)}>
      <LangSwitcher className={classes.lang} />
      <Paper className={classes.card}>
        <div className={classes.content}>
          <header className={classes.header}>
            <Logo className={classes.logo} />
          </header>
          <div className={classes.body}>
            {!isPasswordSent && (
              <div className={classes.sso}>
                <SignInOneId
                  onClick={authViaSSO}
                  errors={errors}
                  size="medium"
                  variant="outlined"
                />
              </div>
            )}
            <div className={classes.login}>
              <SignInEmailForm
                isPasswordSent={isPasswordSent}
                errors={errors}
                sendEmailPassword={sendEmailPassword}
                authViaEmail={authViaEmail}
                cancel={cancelSending}
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

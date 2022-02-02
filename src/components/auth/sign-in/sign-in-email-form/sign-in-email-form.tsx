import { Button, Grid, SvgIcon, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { isEmpty } from 'ramda';
import { ComponentType, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../../../hooks';
import { secondsToHMS } from '../../../../utils/time-utils';
import { IconArrowLeft } from '../../../icons';
import { AppInput } from '../../../inputs';
import {
  SendingEmailValidationSchema,
  SignInEmailValidationSchema,
} from '../sign-in-email-model';
import useStyles from './styles';
import {
  FIELD_EMAIL,
  FIELD_PASSWORD,
} from '../../../../constants/app/fields-constants';

interface SignInEmailFormProps {
  className?: any;
  isPasswordSent?: boolean;
  errors?: any;
  sendEmailPassword?: (data: any) => void;
  authViaEmail?: (data: any) => void;
  cancel?: () => void;
}

const MAX_TIME_LEFT = 30;

export const SignInEmailForm: ComponentType<SignInEmailFormProps> = ({
  className,
  isPasswordSent,
  errors,
  sendEmailPassword,
  authViaEmail,
  cancel,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const r = useResponsive();
  const [timeLeft, setTimeLeft] = useState<number>(MAX_TIME_LEFT);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const signinFormik = useFormik({
    initialValues: {
      [FIELD_EMAIL]: '',
      [FIELD_PASSWORD]: '',
    },
    validationSchema: SignInEmailValidationSchema,
    onSubmit: authViaEmail ? authViaEmail : () => {},
  });

  const sendingFormik = useFormik({
    initialValues: {
      [FIELD_EMAIL]: '',
    },
    validationSchema: SendingEmailValidationSchema,
    onSubmit: sendEmailPassword
      ? (data) => {
          signinFormik.setFieldValue(FIELD_EMAIL, data.email);
          sendEmailPassword(data);
        }
      : () => null,
  });

  const handleStartCountdown = useCallback(() => {
    setIsCounting(true);
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    setIntervalId(interval);
  }, [setTimeLeft, setIntervalId]);

  const handleStopCountdown = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }, [intervalId]);

  const handleResend = () => {
    setTimeLeft(MAX_TIME_LEFT);
    sendingFormik.handleSubmit();
    setIsCounting(false);
    handleStartCountdown();
  };

  const handleGoBack = () => {
    setIsCounting(false);
    setTimeLeft(MAX_TIME_LEFT);
    if (cancel) cancel();
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      signinFormik.setFieldError(
        FIELD_PASSWORD,
        t(errors?.password, 'Неверный email или пароль')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (isPasswordSent && !isCounting) handleStartCountdown();
    return handleStopCountdown;
  }, [isPasswordSent, isCounting, handleStopCountdown, handleStartCountdown]);

  useEffect(() => {
    if (timeLeft <= 0) handleStopCountdown();
  }, [timeLeft, handleStopCountdown]);

  const text = (
    <Typography className={classes.text} variant="body1">
      {t(
        'signIn.text',
        'или войти с помощью электронной почты и временного пароля'
      )}
    </Typography>
  );

  const emailField = (formik: any, disabled: boolean = false) => {
    return (
      <Grid item xs={12} className={clsx(classes.col)}>
        <AppInput
          placeholder={t('signIn.login.placeholder', 'Ваша электронная почта')}
          disabled={disabled}
          error={!!formik?.errors?.email}
          helperText={
            formik?.errors?.email && t(formik.errors.email, { count: 4 })
          }
          {...formik.getFieldProps('email')}
        />
      </Grid>
    );
  };

  if (isPasswordSent) {
    return (
      <form
        className={clsx(classes.root, className)}
        onSubmit={signinFormik.handleSubmit}
      >
        <Button
          onClick={handleGoBack}
          variant="lever"
          color="info"
          size="small"
          startIcon={
            <SvgIcon
              component={IconArrowLeft}
              viewBox="0 0 9 16"
              color="primary"
            />
          }
          className={clsx(classes.back)}
        >
          {t('back', 'Назад')}
        </Button>
        {text}
        <Grid container spacing={2}>
          {emailField(signinFormik, true)}
          <Grid item xs={12} md={6} className={clsx(classes.col)}>
            <AppInput
              id="password"
              placeholder={t('signIn.password.placeholder', 'Временный пароль')}
              type="password"
              error={!!signinFormik?.errors?.password}
              helperText={
                signinFormik?.errors?.password &&
                t(signinFormik.errors.password, { count: 4 })
              }
              errorAppearance="fade"
              {...signinFormik.getFieldProps('password')}
            />
          </Grid>
          <Grid item xs="auto" className={clsx(classes.col)}>
            <Typography variant="body1">{secondsToHMS(timeLeft)}</Typography>
            {!!signinFormik?.errors?.password && (
              <div className={clsx(classes.errorPlaceholder)} />
            )}
          </Grid>
          <Grid item xs="auto" className={clsx(classes.col)}>
            <Button
              onClick={handleResend}
              size="small"
              variant="outlined"
              color="info"
              disabled={timeLeft > 0}
            >
              {t('signIn.rsendEmailPassword', 'Еще раз')}
            </Button>
            {!!signinFormik?.errors?.password && (
              <div className={clsx(classes.errorPlaceholder)} />
            )}
          </Grid>
          <Grid item xs={12} className={clsx(classes.col)}>
            <Button
              variant="contained"
              color="info"
              type="submit"
              fullWidth
              disabled={!signinFormik.values.password}
            >
              <b>{t('singIn', 'Войти')}</b>
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  return (
    <form
      className={clsx(classes.root, className)}
      onSubmit={sendingFormik.handleSubmit}
    >
      {text}
      <Grid container spacing={2}>
        {emailField(sendingFormik)}
        <Grid item xs={12} className={clsx(classes.col)}>
          <Button
            variant="outlined"
            color="info"
            type="submit"
            fullWidth
            disabled={!sendingFormik.values.email}
          >
            <b>
              {r({
                xs: t('signIn.sendEmailPassword', 'Отправить пароль'),
                lg: t('signIn.sendTempPassword', 'Временный пароль'),
              })}
            </b>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

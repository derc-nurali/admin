import { Collapse, Fade, FormHelperText, SvgIcon } from '@material-ui/core';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as OneIdIcon } from './assets/one_id.svg';
import { OneIdButton } from './styles';
import { get } from 'lodash';

interface SignInOneIdProps {
  className?: any;
  variant?: 'outlined' | 'contained';
  size?: 'small' | 'medium';
  errors?: any;
  errorAppearance?: 'collapse' | 'fade';
  onClick?: () => void;
}

export const SignInOneId: ComponentType<SignInOneIdProps> = ({
  className,
  variant = 'contained',
  size = 'medium',
  errors,
  errorAppearance = 'collapse',
  onClick,
}) => {
  const { t } = useTranslation();
  const helperText = t(get(errors, 'code', null), 'Пользователь не найден');

  const helper = () => {
    const text = (
      <FormHelperText
        error
        component="div"
        style={{ textAlign: 'center', color: 'red', fontSize: 12 }}
      >
        {helperText}
      </FormHelperText>
    );

    if (errorAppearance === 'fade') {
      return <Fade in={!!helperText}>{text}</Fade>;
    }

    return <Collapse in={!!helperText}>{text}</Collapse>;
  };

  return (
    <>
      <OneIdButton
        onClick={onClick}
        className={className}
        variant={variant}
        size={size}
        startIcon={<SvgIcon component={OneIdIcon} />}
        fullWidth
      >
        <b>{t('signIn.oneId', 'Войти через One ID')}</b>
      </OneIdButton>
      {helper()}
    </>
  );
};

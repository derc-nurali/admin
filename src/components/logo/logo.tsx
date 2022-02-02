import { SvgIcon } from '@material-ui/core';
import clsx from 'clsx';
import React, { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes/route-constants';
import { IconLogo } from '../icons';
import { dynamicRoute } from '../../utils/route-utils';
import useStyles from './styles';

interface LoginProps {
  className?: string;
  variant?: 'primary' | 'inherit';
}

export const Logo: ComponentType<LoginProps> = ({
  variant = 'primary',
  className,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Link
      to={dynamicRoute(ROUTES.DASHBOARD.ROOT)}
      className={clsx(classes.root, classes[variant], className)}
      title={t('app.title', 'Панель Администратора')}
    >
      <SvgIcon
        component={IconLogo}
        className={classes.img}
        viewBox="0 0 250 60"
      />
    </Link>
  );
};

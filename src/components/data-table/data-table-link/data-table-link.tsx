import { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { useResponsive } from '../../../hooks';
import { useTranslation } from 'react-i18next';

interface DataTableLinkProps {
  className?: string;
  to: any;
  label?: string;
  labelKey?: string;
  variant?: any;
}

export const DataTableLink: ComponentType<DataTableLinkProps> = ({
  className,
  to,
  label,
  labelKey,
  variant,
  children,
}) => {
  const classes = useStyles();
  const r = useResponsive();
  const { t } = useTranslation();

  const typographyVariant: any = variant
    ? variant
    : r({ xs: 'body3', sm: 'body3', md: 'body2' });

  if (children) {
    return (
      <Link to={to} className={clsx(classes.root, className)}>
        {children}
      </Link>
    );
  }

  return (
    <Link to={to} className={clsx(classes.root, className)}>
      <Typography variant={typographyVariant} component="span">
        {labelKey ? t(labelKey, label) : label}
      </Typography>
    </Link>
  );
};

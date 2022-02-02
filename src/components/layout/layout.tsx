import clsx from 'clsx';
import React, { ComponentType } from 'react';
import { LayoutDefault } from './layout-default';
import { LayoutSimple } from './layout-simple';
import useStyles from './styles';

interface LayoutProps {
  className?: any;
  variant?: 'default' | 'simple';
  children?: any;
}

export const Layout: ComponentType<LayoutProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  const classes = useStyles();

  if (variant === 'simple')
    return (
      <LayoutSimple className={clsx(classes.simple, className)} {...props} />
    );

  return (
    <LayoutDefault className={clsx(classes.default, className)} {...props} />
  );
};

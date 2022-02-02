import { Container } from '@material-ui/core';
import clsx from 'clsx';
import React, { ComponentType } from 'react';
import useStyles from './styles';

interface LayoutSimpleProps {
  className?: any;
  children?: any;
}

export const LayoutSimple: ComponentType<LayoutSimpleProps> = ({
  className,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      <Container className={classes.container}>{children}</Container>
    </div>
  );
};

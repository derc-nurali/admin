import { ComponentType } from 'react';
import { CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader: ComponentType<LoaderProps> = ({
  size = 64,
  className,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <CircularProgress color="info" size={size} />
    </div>
  );
};

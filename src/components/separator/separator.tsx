import { ComponentType } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

interface SeparatorProps {
  min?: number;
  max?: number;
}

export const Separator: ComponentType<SeparatorProps> = ({ min, max }) => {
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flex: '1 1 auto',
      minWidth: min ? theme.spacing(min) : 0,
      maxHeight: max ? theme.spacing(max) : 0,
    },
    options: {
      name: 'separator',
    },
  }));
  const classes = useStyles();

  return <div className={clsx(classes.root)} />;
};

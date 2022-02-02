import { ComponentType, ReactNode } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { Separator } from '../../separator';
import { isEmpty, map } from 'lodash';
import { Grid, Hidden } from '@material-ui/core';

interface DataTableHeaderProps {
  actions?: ReactNode[];
  usage?: 'header' | 'footer';
}

export const DataTableBrim: ComponentType<DataTableHeaderProps> = ({
  actions,
  usage = 'header',
  children,
}) => {
  const classes = useStyles();

  const rightSide = () => {
    if (isEmpty(actions)) return null;

    const items = map(actions, (action, idx) => (
      <Grid item key={idx}>
        {action}
      </Grid>
    ));

    return (
      <Grid container columnSpacing={3} className={clsx(classes.actions)}>
        {items}
      </Grid>
    );
  };

  return (
    <div className={clsx(classes.root, classes[usage])}>
      {children}
      <Hidden smDown={usage === 'header'}>
        <Separator min={3} />
      </Hidden>
      {rightSide()}
    </div>
  );
};

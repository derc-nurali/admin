import { ComponentType } from 'react';
import { Collapse } from '@material-ui/core';
import { useDrawer } from '../../hooks';
import clsx from 'clsx';
import useStyles from './styles';

export const Drawer: ComponentType = ({ children }) => {
  const classes = useStyles();
  const { isDrawerVisible } = useDrawer();

  return (
    <Collapse
      in={isDrawerVisible}
      orientation="horizontal"
      collapsedSize={56}
      classes={{ root: classes.root }}
    >
      <div className={clsx(classes.content)}>{children}</div>
    </Collapse>
  );
};

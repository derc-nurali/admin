import clsx from 'clsx';
import { ComponentType } from 'react';
import { Drawer } from '../../drawer';
import { Header } from '../../header';
import { Sidebar } from '../../sidebar';
import useStyles from './styles';
import { useDrawer } from '../../../hooks';

interface LayoutDefaultProps {
  className?: string;
}

export const LayoutDefault: ComponentType<LayoutDefaultProps> = ({
  className,
  ...props
}) => {
  const classes = useStyles();
  const { isDrawerVisible } = useDrawer();

  return (
    <>
      <Drawer>
        <Sidebar />
      </Drawer>
      <div
        className={clsx(classes.root, className, {
          [classes.drawerOpened]: isDrawerVisible,
        })}
      >
        <Header />
        <main className={classes.main} {...props} />
      </div>
    </>
  );
};

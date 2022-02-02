import { IconButton, SvgIcon, Toolbar } from '@material-ui/core';
import clsx from 'clsx';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrawer } from '../../hooks';
import { IconDrawerClose, IconDrawerOpen } from '../icons';
import { Logo } from '../logo';
import { SidebarNav } from './sidebar-nav';
import useStyles from './styles';

interface SidebarProps {
  className?: string;
}

export const Sidebar: ComponentType<SidebarProps> = ({ className }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { isDrawerVisible, toggleDrawer } = useDrawer();

  const togglerIcon = isDrawerVisible ? IconDrawerClose : IconDrawerOpen;
  const togglerText = isDrawerVisible
    ? t('drawer.close', 'Закрыть навигацию сайта')
    : t('drawer.open', 'Открыть навигацию сайта');

  return (
    <aside className={clsx(classes.root, className)}>
      <Toolbar
        className={clsx(classes.header, {
          [classes.headerOut]: !isDrawerVisible,
        })}
      >
        <Logo variant="inherit" className={classes.logo} />
        <IconButton
          onClick={toggleDrawer}
          className={clsx(classes.toggler)}
          title={togglerText}
        >
          <SvgIcon component={togglerIcon} />
        </IconButton>
      </Toolbar>
      <SidebarNav className={classes.nav} />
    </aside>
  );
};

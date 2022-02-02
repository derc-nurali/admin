import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@material-ui/core';
import clsx from 'clsx';
import { map, get } from 'lodash';
import React, { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDrawer, useRouter, useWorkflow } from '../../../hooks';
import { dynamicRoute } from '../../../utils/route-utils';
import { SIDEBAR_MENU } from '../../../constants/menus/sidebar-menu-constants';
import useStyles from './styles';

interface SidebarNavProps {
  className?: string;
  variant?: 'short' | 'default';
}

export const SidebarNav: ComponentType<SidebarNavProps> = ({
  className,
  variant = 'default',
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { isDrawerVisible } = useDrawer();
  const { asPath } = useRouter();
  const { flow } = useWorkflow();

  const menu = get(SIDEBAR_MENU, [flow], SIDEBAR_MENU.DEFAULT);

  const items = map(menu, ({ path, labelKey, label, icon, viewBox }, idx) => (
    <ListItem disablePadding className={classes.item} key={idx}>
      <ListItemButton
        to={dynamicRoute(path)}
        component={NavLink}
        className={classes.link}
        selected={asPath === path}
      >
        <ListItemIcon className={classes.media}>
          <SvgIcon
            component={icon}
            className={classes.icon}
            viewBox={viewBox}
          />
        </ListItemIcon>
        <ListItemText primary={t(labelKey, label)} className={classes.body} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <List
      component="nav"
      className={clsx(className, classes.root, {
        [classes[variant]]: variant !== 'default',
        [classes.rootOut]: !isDrawerVisible,
      })}
      aria-label={t('sidebar.nav', 'Навигация по сайту')}
    >
      {items}
    </List>
  );
};

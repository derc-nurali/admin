import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { DRAWER_KEY } from '../constants/app/keys-constants';
import { drawerActions } from '../slices/drawer-slice';

const { toggle, show, hide } = drawerActions;

export const useDrawer = () => {
  const dispatch = useDispatch();
  const isDrawerVisible = useSelector(
    (state: RootStateOrAny) => state.drawer.isVisible
  );

  const toggleDrawer = () => dispatch(toggle());

  const showDrawer = () => dispatch(show());

  const hideDrawer = () => dispatch(hide());

  useEffect(() => {
    if (window.innerWidth < 1200 && isDrawerVisible) {
      hideDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.innerWidth]);

  useEffect(() => {
    localStorage.setItem(DRAWER_KEY, isDrawerVisible);
  }, [isDrawerVisible]);

  return { toggleDrawer, showDrawer, hideDrawer, isDrawerVisible };
};

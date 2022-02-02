import { ROUTES } from '../routes/route-constants';

const { SIGN_OUT } = ROUTES;

export interface UserMenuItemProps {
  path: string;
  label: string;
  labelKey: string;
}

export const USER_MENU: UserMenuItemProps[] = [
  {
    path: SIGN_OUT,
    label: 'Выйти',
    labelKey: 'signOut',
  },
];

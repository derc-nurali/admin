import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { StaffListPage } from './staff-list-page';
import { StaffEditPage } from './staff-edit-page';
import { StaffCreatPage } from './staff-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { STAFF } = ROUTES;

export const StaffPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(STAFF.CREATE)}
        component={StaffCreatPage}
        exact
      />
      <Route path={dynamicRoute(STAFF.EDIT)} component={StaffEditPage} exact />
      <Route component={StaffListPage} />
    </Switch>
  );
};

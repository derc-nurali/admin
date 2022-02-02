import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { OrganizationsListPage } from './organizations-list-page';
import { OrganizationsEditPage } from './organizations-edit-page';
import { OrganizationsCreatPage } from './organizations-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { ORGANIZATIONS } = ROUTES;

export const OrganizationsPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(ORGANIZATIONS.CREATE)}
        component={OrganizationsCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(ORGANIZATIONS.EDIT)}
        component={OrganizationsEditPage}
        exact
      />
      <Route component={OrganizationsListPage} />
    </Switch>
  );
};

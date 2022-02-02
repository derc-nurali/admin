import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SuperusersListPage } from './superusers-list-page';
import { SuperusersEditPage } from './superusers-edit-page';
import { SuperusersCreatPage } from './superusers-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { SUPERUSERS } = ROUTES;

export const SuperusersPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(SUPERUSERS.CREATE)}
        component={SuperusersCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(SUPERUSERS.EDIT)}
        component={SuperusersEditPage}
        exact
      />
      <Route component={SuperusersListPage} />
    </Switch>
  );
};

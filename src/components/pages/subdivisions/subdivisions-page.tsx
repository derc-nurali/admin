import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SubdivisionsListPage } from './subdivisions-list-page';
import { SubdivisionsEditPage } from './subdivisions-edit-page';
import { SubdivisionsCreatPage } from './subdivisions-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { SUBDIVISIONS } = ROUTES;

export const SubdivisionsPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(SUBDIVISIONS.CREATE)}
        component={SubdivisionsCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(SUBDIVISIONS.EDIT)}
        component={SubdivisionsEditPage}
        exact
      />
      <Route component={SubdivisionsListPage} />
    </Switch>
  );
};

import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ServicesListPage } from './services-list-page';
import { ServicesEditPage } from './services-edit-page';
import { ServicesCreatPage } from './services-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { SERVICES } = ROUTES;

export const ServicesPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(SERVICES.CREATE)}
        component={ServicesCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(SERVICES.EDIT)}
        component={ServicesEditPage}
        exact
      />
      <Route component={ServicesListPage} />
    </Switch>
  );
};

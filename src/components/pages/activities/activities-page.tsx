import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ActivitiesListPage } from './activities-list-page';
import { ActivitiesEditPage } from './activities-edit-page';
import { ActivitiesCreatPage } from './activities-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { ACTIVITIES } = ROUTES;

export const ActivitiesPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(ACTIVITIES.CREATE)}
        component={ActivitiesCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(ACTIVITIES.EDIT)}
        component={ActivitiesEditPage}
        exact
      />
      <Route component={ActivitiesListPage} />
    </Switch>
  );
};

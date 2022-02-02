import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AchievementsListPage } from './achievements-list-page';
import { AchievementsEditPage } from './achievements-edit-page';
import { AchievementsCreatPage } from './achievements-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { ACHIEVEMENTS } = ROUTES;

export const AchievementsPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(ACHIEVEMENTS.CREATE)}
        component={AchievementsCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(ACHIEVEMENTS.EDIT)}
        component={AchievementsEditPage}
        exact
      />
      <Route component={AchievementsListPage} />
    </Switch>
  );
};

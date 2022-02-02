import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MedialibListPage } from './medialib-list-page';
import { MedialibEditPage } from './medialib-edit-page';
import { VacanciesCreatPage } from './medialib-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { MEDIALIB } = ROUTES;

export const MedialibPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(MEDIALIB.CREATE)}
        component={VacanciesCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(MEDIALIB.EDIT)}
        component={MedialibEditPage}
        exact
      />
      <Route component={MedialibListPage} />
    </Switch>
  );
};

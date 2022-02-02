import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProjectsListPage } from './projects-list-page';
import { ProjectsEditPage } from './projects-edit-page';
import { ProjectsCreatPage } from './projects-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { PROJECTS } = ROUTES;

export const ProjectsPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(PROJECTS.CREATE)}
        component={ProjectsCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(PROJECTS.EDIT)}
        component={ProjectsEditPage}
        exact
      />
      <Route component={ProjectsListPage} />
    </Switch>
  );
};

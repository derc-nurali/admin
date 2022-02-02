import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { VacanciesListPage } from './vacancies-list-page';
import { VacanciesEditPage } from './vacancies-edit-page';
import { VacanciesCreatPage } from './vacancies-create-page';
import { VacanciesApplicationsPage } from './vacancies-applications-page';
import { VacanciesApplicationsViewPage } from './vacancies-applications-view-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { VACANCIES } = ROUTES;

export const VacanciesPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(VACANCIES.CREATE)}
        component={VacanciesCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(VACANCIES.EDIT)}
        component={VacanciesEditPage}
        exact
      />
      <Route
        path={dynamicRoute(VACANCIES.APPLICATIONS)}
        component={VacanciesApplicationsPage}
        exact
      />
      <Route
        path={dynamicRoute(VACANCIES.APPLICATIONS_VIEW)}
        component={VacanciesApplicationsViewPage}
        exact
      />
      <Route component={VacanciesListPage} />
    </Switch>
  );
};

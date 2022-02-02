import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PortfolioListPage } from './portfolio-list-page';
import { PortfolioEditPage } from './portfolio-edit-page';
import { PortfolioCreatPage } from './portfolio-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { PORTFOLIO } = ROUTES;

export const PortfolioPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(PORTFOLIO.CREATE)}
        component={PortfolioCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(PORTFOLIO.EDIT)}
        component={PortfolioEditPage}
        exact
      />
      <Route component={PortfolioListPage} />
    </Switch>
  );
};

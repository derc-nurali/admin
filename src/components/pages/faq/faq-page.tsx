import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FaqListPage } from './faq-list-page';
import { FaqEditPage } from './faq-edit-page';
import { FaqCreatPage } from './faq-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { FAQ } = ROUTES;

export const FaqPage: ComponentType = () => {
  return (
    <Switch>
      <Route path={dynamicRoute(FAQ.CREATE)} component={FaqCreatPage} exact />
      <Route path={dynamicRoute(FAQ.EDIT)} component={FaqEditPage} exact />
      <Route component={FaqListPage} />
    </Switch>
  );
};

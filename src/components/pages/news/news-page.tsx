import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NewsListPage } from './news-list-page';
import { NewsEditPage } from './news-edit-page';
import { NewsCreatPage } from './news-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { NEWS } = ROUTES;

export const NewsPage: ComponentType = () => {
  return (
    <Switch>
      <Route path={dynamicRoute(NEWS.DRAFTS)} component={NewsListPage} exact />
      <Route path={dynamicRoute(NEWS.CREATE)} component={NewsCreatPage} exact />
      <Route path={dynamicRoute(NEWS.EDIT)} component={NewsEditPage} exact />
      <Route component={NewsListPage} />
    </Switch>
  );
};

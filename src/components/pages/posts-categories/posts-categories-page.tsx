import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PostsCategoriesListPage } from './posts-categories-list-page';
import { PostsCategoriesEditPage } from './posts-categories-edit-page';
import { PostsCategoriesCreatPage } from './posts-categories-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { POSTS_CATEGORIES } = ROUTES;

export const PostsCategoriesPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(POSTS_CATEGORIES.CREATE)}
        component={PostsCategoriesCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(POSTS_CATEGORIES.EDIT)}
        component={PostsCategoriesEditPage}
        exact
      />
      <Route component={PostsCategoriesListPage} />
    </Switch>
  );
};

import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PostsListPage } from './posts-list-page';
import { PostsEditPage } from './posts-edit-page';
import { PostsCreatPage } from './posts-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { POSTS } = ROUTES;

export const PostsPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(POSTS.CREATE)}
        component={PostsCreatPage}
        exact
      />
      <Route path={dynamicRoute(POSTS.EDIT)} component={PostsEditPage} exact />
      <Route component={PostsListPage} />
    </Switch>
  );
};

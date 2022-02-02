import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DocumentsListPage } from './documents-list-page';
import { DocumentsEditPage } from './documents-edit-page';
import { DocumentsCreatPage } from './documents-create-page';
import { ROUTES } from '../../../constants/routes/route-constants';
import { dynamicRoute } from '../../../utils/route-utils';

const { DOCUMENTS } = ROUTES;

export const DocumentsPage: ComponentType = () => {
  return (
    <Switch>
      <Route
        path={dynamicRoute(DOCUMENTS.CREATE)}
        component={DocumentsCreatPage}
        exact
      />
      <Route
        path={dynamicRoute(DOCUMENTS.EDIT)}
        component={DocumentsEditPage}
        exact
      />
      <Route component={DocumentsListPage} />
    </Switch>
  );
};

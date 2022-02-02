import { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FeedbackListPage } from './feedback-list-page';

export const FeedbackPage: ComponentType = () => {
  return (
    <Switch>
      <Route component={FeedbackListPage} />
    </Switch>
  );
};

import { createElement, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  DashboardPage,
  FlowPage,
  HomePage,
  AchievementsPage,
  ActivitiesPage,
  DocumentsPage,
  FaqPage,
  FeedbackPage,
  MedialibPage,
  NewsPage,
  PostsPage,
  ProjectsPage,
  PortfolioPage,
  PostsCategoriesPage,
  OrganizationsPage,
  ServicesPage,
  StaffPage,
  SubdivisionsPage,
  SuperusersPage,
  VacanciesPage,
} from './components/pages';
import { SignoutPage } from './components/pages/signout-page';
import { useAuth, useLanguage, useWorkflow, useRouter } from './hooks';
import { i18nPage } from './components/pages/i18n-page';
import { ROUTES } from './constants/routes/route-constants';
import moment from 'moment';
import 'moment/locale/ru';
import { Loader } from './components/loader';
moment.locale('es');

const {
  SIGN_OUT,
  DASHBOARD,
  ACHIEVEMENTS,
  ACTIVITIES,
  DOCUMENTS,
  FAQ,
  FEEDBACK,
  MEDIALIB,
  NEWS,
  POSTS,
  POSTS_CATEGORIES,
  PORTFOLIO,
  PROJECTS,
  VACANCIES,
  SERVICES,
  STAFF,
  SUBDIVISIONS,
  ORGANIZATIONS,
  SUPERUSERS,
  I18N,
  FLOW,
} = ROUTES;

const Routes = () => {
  const match = useRouteMatch();
  const url = match.url === '/' ? '' : match.url;
  const router = useRouter();
  const { changeStoreLang, getLocales } = useLanguage();
  const { isSignInRequired, isSignedIn, restoreAuth } = useAuth();
  const { flow } = useWorkflow();
  const { currentLocale } = useLanguage();

  useEffect(() => {
    changeStoreLang(currentLocale);
  }, [changeStoreLang, currentLocale]);

  useEffect(() => {
    restoreAuth();
    getLocales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const urly = (p: string) => `${url}${p}`;

  const pathes = {
    root: [
      urly(SIGN_OUT),
      urly(DASHBOARD.ROOT),
      urly(ACHIEVEMENTS.ROOT),
      urly(ACTIVITIES.ROOT),
      urly(DOCUMENTS.ROOT),
      urly(FAQ.ROOT),
      urly(FEEDBACK.ROOT),
      urly(MEDIALIB.ROOT),
      urly(NEWS.ROOT),
      urly(POSTS.ROOT),
      urly(POSTS_CATEGORIES.ROOT),
      urly(PORTFOLIO.ROOT),
      urly(PROJECTS.ROOT),
      urly(PORTFOLIO.ROOT),
      urly(VACANCIES.ROOT),
      urly(SERVICES.ROOT),
      urly(STAFF.ROOT),
      urly(SUBDIVISIONS.ROOT),
      urly(ORGANIZATIONS.ROOT),
      urly(SUPERUSERS.ROOT),
      urly(I18N.ROOT),
    ],
  };

  if (isSignInRequired) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Loader />
      </div>
    );
  }

  if (
    !flow &&
    router.asPath !== '' &&
    router.asPath !== ROUTES.FLOW &&
    isSignedIn
  ) {
    return createElement(Redirect, {
      to: `/${currentLocale}${ROUTES.FLOW}?redirect=${router.pathname}`,
    });
  }

  if (
    !flow &&
    router.asPath !== '' &&
    router.asPath !== ROUTES.FLOW &&
    isSignedIn
  ) {
    return createElement(Redirect, {
      to: `/${currentLocale}${ROUTES.FLOW}?redirect=${router.pathname}`,
    });
  }

  return (
    // #TODO https://stackoverflow.com/questions/33996484/using-multiple-layouts-for-react-router-components
    <Switch>
      <Route path={pathes.root}>
        <Layout variant="default">
          <Switch>
            <Route path={urly(SIGN_OUT)} component={SignoutPage} exact />
            <Route
              path={urly(DASHBOARD.ROOT)}
              component={DashboardPage}
              exact
            />
            <Route
              path={urly(ACHIEVEMENTS.ROOT)}
              component={AchievementsPage}
            />
            <Route path={urly(ACTIVITIES.ROOT)} component={ActivitiesPage} />
            <Route path={urly(NEWS.ROOT)} component={NewsPage} />
            <Route path={urly(DOCUMENTS.ROOT)} component={DocumentsPage} />
            <Route path={urly(FAQ.ROOT)} component={FaqPage} />
            <Route path={urly(FEEDBACK.ROOT)} component={FeedbackPage} />
            <Route path={urly(MEDIALIB.ROOT)} component={MedialibPage} />
            <Route path={urly(POSTS.ROOT)} component={PostsPage} />
            <Route
              path={urly(POSTS_CATEGORIES.ROOT)}
              component={PostsCategoriesPage}
            />
            <Route path={urly(PROJECTS.ROOT)} component={ProjectsPage} />
            <Route path={urly(PORTFOLIO.ROOT)} component={PortfolioPage} />
            <Route
              path={urly(ORGANIZATIONS.ROOT)}
              component={OrganizationsPage}
            />
            <Route path={urly(SERVICES.ROOT)} component={ServicesPage} />
            <Route path={urly(STAFF.ROOT)} component={StaffPage} />
            <Route
              path={urly(SUBDIVISIONS.ROOT)}
              component={SubdivisionsPage}
            />
            <Route path={urly(SUPERUSERS.ROOT)} component={SuperusersPage} />
            <Route path={urly(VACANCIES.ROOT)} component={VacanciesPage} />
            <Route path={urly(I18N.ROOT)} component={i18nPage} exact />
          </Switch>
        </Layout>
      </Route>
      <Route>
        <Layout variant="simple">
          <Switch>
            <Route path={urly(FLOW)} component={FlowPage} exact />
            <Route component={HomePage} exact />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
};

export const App = () => {
  const { currentLocale } = useLanguage();

  return (
    <Switch>
      <Route path={`/${currentLocale}`}>
        <Routes />
      </Route>
      <Route>
        <Routes />
      </Route>
    </Switch>
  );
};

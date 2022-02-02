const renderRouteCrud = (root: string) => ({
  ROOT: `/${root}`,
  DRAFTS: `/${root}/drafts`,
  CREATE: `/${root}/create`,
  EDIT: `/${root}/edit/:id`,
});

export const ROUTES = {
  EMPTY: '',
  HOME: '/',
  SIGN_OUT: '/signout',
  FLOW: '/flow',
  DASHBOARD: {
    ROOT: '/dashboard',
  },
  ACHIEVEMENTS: {
    ...renderRouteCrud('achievements'),
  },
  ACTIVITIES: {
    ...renderRouteCrud('activities'),
  },
  DOCUMENTS: {
    ...renderRouteCrud('documents'),
  },
  FAQ: {
    ...renderRouteCrud('faq'),
  },
  FEEDBACK: {
    ...renderRouteCrud('feedback'),
  },
  MEDIALIB: {
    ...renderRouteCrud('medialib'),
  },
  NEWS: {
    ...renderRouteCrud('news'),
  },
  ORGANIZATIONS: {
    ...renderRouteCrud('organizations'),
  },
  PORTFOLIO: {
    ...renderRouteCrud('portfolio'),
  },
  POSTS: {
    ...renderRouteCrud('posts'),
  },
  POSTS_CATEGORIES: {
    ...renderRouteCrud('posts-categories'),
  },
  PROJECTS: {
    ...renderRouteCrud('projects'),
  },
  SERVICES: {
    ...renderRouteCrud('services'),
  },
  STAFF: {
    ...renderRouteCrud('staff'),
  },
  SUBDIVISIONS: {
    ...renderRouteCrud('subdivisions'),
  },
  SUPERUSERS: {
    ...renderRouteCrud('superusers'),
  },
  VACANCIES: {
    ...renderRouteCrud('vacancies'),
    APPLICATIONS: '/vacancies/applications',
    APPLICATIONS_VIEW: '/vacancies/applications/:id',
  },
  I18N: {
    ROOT: '/i18n',
  },
};

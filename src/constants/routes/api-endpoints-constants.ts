const renderEndpointsCrud = (root: string) => ({
  FIND_ALL: `/api/v1/admin/${root}`,
  FIND_ONE: `/api/v1/admin/${root}/:id`,
  UPDATE_ONE: `/api/v1/admin/${root}/:id`,
  PATCH_ONE: `/api/v1/admin/${root}/:id`,
  DELETE_ONE: `/api/v1/admin/${root}/:id`,
  CREATE_ONE: `/api/v1/admin/${root}`,
});

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/admin/auth/login',
    CODE: '/api/v1/admin/auth/login-one-id',
    ME: '/api/v1/admin/auth/me',
  },
  ACHIEVEMENTS: {
    ...renderEndpointsCrud('achievements'),
  },
  ACTIVITIES: {
    ...renderEndpointsCrud('activities'),
  },
  DOCUMENTS: {
    ...renderEndpointsCrud('documents'),
    FIND_ALL_TAGS: '/api/v1/documents/tags',
  },
  FAQ: {
    ...renderEndpointsCrud('faq'),
  },
  FEEDBACK: {
    ...renderEndpointsCrud('feedback'),
  },
  MEDIA: {
    ...renderEndpointsCrud('media'),
  },
  MEDIALIB: {
    ...renderEndpointsCrud('medialib'),
  },
  NEWS: {
    ...renderEndpointsCrud('news'),
    FIND_ALL_TAGS: '/api/v1/news/tags',
  },
  ORGANIZATIONS: {
    ...renderEndpointsCrud('organizations'),
  },
  POSTS: {
    ...renderEndpointsCrud('posts'),
    FIND_ALL_TAGS: '/api/v1/posts/tags',
  },
  POSTS_CATEGORIES: {
    ...renderEndpointsCrud('posts/categories'),
  },
  PORTFOLIO: {
    ...renderEndpointsCrud('portfolio'),
    FIND_ALL_TAGS: '/api/v1/portfolio/tags',
  },
  PROJECTS: {
    ...renderEndpointsCrud('projects'),
  },
  SERVICES: {
    ...renderEndpointsCrud('services'),
    FIND_ALL_TAGS: '/api/v1/services/tags',
  },
  STAFF: {
    ...renderEndpointsCrud('staff'),
  },
  SUBDIVISIONS: {
    ...renderEndpointsCrud('subdivisions'),
  },
  SUPERUSERS: {
    ...renderEndpointsCrud('superusers'),
  },
  TRANSLATIONS: {
    ...renderEndpointsCrud('translations'),
  },
  VACANCIES: {
    ...renderEndpointsCrud('vacancies'),
    FIND_ALL_APPLICATIONS: '/api/v1/admin/vacancies/applications',
    FIND_ONE_APPLICATION: '/api/v1/admin/vacancies/:id/application',
  },
  LANGUAGES: {
    FIND_ALL: '/api/v1/languages',
    FIND_ONE: '/api/v1/languages/:id',
  },
  LANGUAGE_LINKS: {
    FIND_ONE: '/api/v1/language-links/:entity/:id',
    CREATE_ONE: '/api/v1/language-links',
  },
};

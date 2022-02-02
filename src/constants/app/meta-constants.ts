export const META_HOME = 'META_HOME';
export const META_SIGNOUT = 'META_SIGNOUT';
export const META_DASHBOARD = 'META_DASHBOARD';
export const META_ACHIEVEMENTS = 'META_ACHIEVEMENTS';
export const META_ACTIVITIES = 'META_ACTIVITIES';
export const META_FAQ = 'META_FAQ';
export const META_FEEDBACK = 'META_FEEDBACK';
export const META_DOCUMENTS = 'META_DOCUMENTS';
export const META_MEDIALIB = 'META_MEDIALIB';
export const META_NEWS = 'META_NEWS';
export const META_POSTS = 'META_POSTS';
export const META_POSTS_CATEGORIES = 'META_POSTS_CATEGORIES';
export const META_PORTFOLIO = 'META_PORTFOLIO';
export const META_PROJECTS = 'META_PROJECTS';
export const META_ORGANIZATIONS = 'META_ORGANIZATIONS';
export const META_SERVICE = 'META_SERVICE';
export const META_STAFF = 'META_STAFF';
export const META_SUBDIVISIONS = 'META_SUBDIVISIONS';
export const META_SUPERUSERS = 'META_SUPERUSERS';
export const META_VACANCIES = 'META_VACANCIES';
export const META_I18N = 'META_I18N';

export interface MetaDataProps {
  title?: string;
  titleKey: string;
}

export const META: { [key: string]: MetaDataProps } = {
  [META_HOME]: {
    title: 'Добро пожаловать',
    titleKey: 'welcome',
  },
  [META_SIGNOUT]: {
    title: 'Выйти',
    titleKey: 'signOut',
  },
  [META_DASHBOARD]: {
    title: 'Дашборд',
    titleKey: 'dashboard',
  },
  [META_ACHIEVEMENTS]: {
    title: 'Достижения',
    titleKey: 'achievements',
  },
  [META_ACTIVITIES]: {
    title: 'Деятельность',
    titleKey: 'activities',
  },
  [META_DOCUMENTS]: {
    title: 'Документы',
    titleKey: 'documents',
  },
  [META_FAQ]: {
    title: 'FAQ',
    titleKey: 'faq',
  },
  [META_FEEDBACK]: {
    title: 'Обратная связь',
    titleKey: 'feedback',
  },
  [META_MEDIALIB]: {
    title: 'Медиатека',
    titleKey: 'mediaLibrary',
  },
  [META_NEWS]: {
    title: 'Новости',
    titleKey: 'news',
  },
  [META_POSTS]: {
    title: 'Посты',
    titleKey: 'posts',
  },
  [META_POSTS_CATEGORIES]: {
    title: 'Категории постов',
    titleKey: 'posts.categories',
  },
  [META_PORTFOLIO]: {
    title: 'Портфолию',
    titleKey: 'portfolio',
  },
  [META_PROJECTS]: {
    title: 'Проекты',
    titleKey: 'projects',
  },
  [META_VACANCIES]: {
    title: 'Вакансии',
    titleKey: 'Vacancies',
  },
  [META_SERVICE]: {
    title: 'Услуги',
    titleKey: 'services',
  },
  [META_STAFF]: {
    title: 'Сотрудники',
    titleKey: 'staff',
  },
  [META_SUBDIVISIONS]: {
    title: 'Подразделения',
    titleKey: 'subdivisions',
  },
  [META_ORGANIZATIONS]: {
    title: 'Организации',
    titleKey: 'organizations',
  },
  [META_SUPERUSERS]: {
    title: 'Админы',
    titleKey: 'superuser',
  },
  [META_I18N]: {
    title: 'i18n',
    titleKey: 'i18n',
  },
};

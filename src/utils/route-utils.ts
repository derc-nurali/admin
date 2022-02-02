import { forEach } from 'lodash';
import i18n from 'i18next';
import { ROUTES } from '../constants/routes/route-constants';

const {
  ACHIEVEMENTS,
  ACTIVITIES,
  DOCUMENTS,
  FAQ,
  MEDIALIB,
  NEWS,
  ORGANIZATIONS,
  POSTS,
  POSTS_CATEGORIES,
  PORTFOLIO,
  PROJECTS,
  SERVICES,
  STAFF,
  SUBDIVISIONS,
  SUPERUSERS,
  VACANCIES,
} = ROUTES;

type DynamicRouteProps = Record<string, any>;

export const dynamicRouteGenerator = (
  path: string,
  params: DynamicRouteProps = {},
  locale: string
) => {
  forEach(params, (value, key) => {
    path = path.replace(`:${key}`, value);
  });
  return `/${locale}${path}`;
};

export const dynamicRoute = (path: string, params: DynamicRouteProps = {}) => {
  return dynamicRouteGenerator(path, params, i18n.language);
};

export const newsEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(NEWS.EDIT, params);
};

export const achievementEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(ACHIEVEMENTS.EDIT, params);
};

export const activityEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(ACTIVITIES.EDIT, params);
};

export const projectEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(PROJECTS.EDIT, params);
};

export const portfolioEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(PORTFOLIO.EDIT, params);
};

export const vacancyEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(VACANCIES.EDIT, params);
};

export const vacancyApplicationsViewRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(VACANCIES.APPLICATIONS_VIEW, params);
};

export const medialibEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(MEDIALIB.EDIT, params);
};

export const staffEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(STAFF.EDIT, params);
};

export const subdivisionEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(SUBDIVISIONS.EDIT, params);
};

export const organizationEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(ORGANIZATIONS.EDIT, params);
};

export const documentEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(DOCUMENTS.EDIT, params);
};

export const superuserEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(SUPERUSERS.EDIT, params);
};

export const serviceEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(SERVICES.EDIT, params);
};

export const postEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(POSTS.EDIT, params);
};

export const postCategoryEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(POSTS_CATEGORIES.EDIT, params);
};

export const faqEditRoute = (params: DynamicRouteProps) => {
  return dynamicRoute(FAQ.EDIT, params);
};

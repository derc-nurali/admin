import {
  ENTITY_ACHIEVEMENT,
  ENTITY_ACTIVITY,
  ENTITY_DOCUMENT,
  ENTITY_FAQ,
  ENTITY_FEEDBACK,
  ENTITY_MEDIALIB,
  ENTITY_NEWS,
  ENTITY_ORGANIZATION,
  ENTITY_POST,
  ENTITY_PORTFOLIO,
  ENTITY_PROJECT,
  ENTITY_VACANCY,
  ENTITY_STAFF,
  ENTITY_SUBDIVISION,
  ENTITY_SERVICE,
  ENTITY_SUPERUSER,
  ENTITY_POST_CATEGORY,
} from '../app/entity-constants';
import { ROUTES } from './route-constants';

export const ROUTE_BY_ENTITY: Record<string, any> = {
  [ENTITY_ACHIEVEMENT]: ROUTES.ACHIEVEMENTS,
  [ENTITY_ACTIVITY]: ROUTES.ACTIVITIES,
  [ENTITY_DOCUMENT]: ROUTES.DOCUMENTS,
  [ENTITY_FAQ]: ROUTES.FAQ,
  [ENTITY_FEEDBACK]: ROUTES.FEEDBACK,
  [ENTITY_MEDIALIB]: ROUTES.MEDIALIB,
  [ENTITY_NEWS]: ROUTES.NEWS,
  [ENTITY_POST]: ROUTES.POSTS,
  [ENTITY_POST_CATEGORY]: ROUTES.POSTS_CATEGORIES,
  [ENTITY_PORTFOLIO]: ROUTES.PORTFOLIO,
  [ENTITY_PROJECT]: ROUTES.PROJECTS,
  [ENTITY_VACANCY]: ROUTES.VACANCIES,
  [ENTITY_STAFF]: ROUTES.STAFF,
  [ENTITY_ORGANIZATION]: ROUTES.ORGANIZATIONS,
  [ENTITY_SERVICE]: ROUTES.SERVICES,
  [ENTITY_SUBDIVISION]: ROUTES.SUBDIVISIONS,
  [ENTITY_SUPERUSER]: ROUTES.SUPERUSERS,
};

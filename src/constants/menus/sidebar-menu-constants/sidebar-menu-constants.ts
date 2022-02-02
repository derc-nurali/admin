import {
  SIDEBAR_MENU_ACHIEVEMENTS,
  SIDEBAR_MENU_ACTIVITIES,
  SIDEBAR_MENU_DASHBOARD,
  SIDEBAR_MENU_DOCUMENTS,
  SIDEBAR_MENU_I18N,
  SIDEBAR_MENU_MEDIALIB,
  SIDEBAR_MENU_NEWS,
  SIDEBAR_MENU_ORGANIZATION,
  SIDEBAR_MENU_POSTS,
  SIDEBAR_MENU_PORTFOLIO,
  SIDEBAR_MENU_PROJECTS,
  SIDEBAR_MENU_SERVICES,
  SIDEBAR_MENU_STAFF,
  SIDEBAR_MENU_SUBDIVISIONS,
  SIDEBAR_MENU_SUPERUSERS,
  SIDEBAR_MENU_VACANCIES,
  SIDEBAR_MENU_POSTS_CATEGORIES,
  SIDEBAR_MENU_FAQ,
  SIDEBAR_MENU_FEEDBACK,
  SidebarMenuItemProps,
} from './sidebar-menu-items-constants';
import {
  PROJECT_ATTESTAT,
  PROJECT_DERC,
  PROJECT_EGOV,
} from '../../app/project-codes-constants';

export const SIDEBAR_MENU: Record<string, SidebarMenuItemProps[]> = {
  [PROJECT_EGOV]: [
    SIDEBAR_MENU_DASHBOARD,
    SIDEBAR_MENU_NEWS,
    SIDEBAR_MENU_ACHIEVEMENTS,
    SIDEBAR_MENU_PORTFOLIO,
    SIDEBAR_MENU_VACANCIES,
    SIDEBAR_MENU_ACTIVITIES,
    SIDEBAR_MENU_MEDIALIB,
    SIDEBAR_MENU_STAFF,
    SIDEBAR_MENU_SUBDIVISIONS,
    SIDEBAR_MENU_DOCUMENTS,
    SIDEBAR_MENU_ORGANIZATION,
    SIDEBAR_MENU_SUPERUSERS,
    SIDEBAR_MENU_PROJECTS,
    SIDEBAR_MENU_I18N,
  ],
  [PROJECT_DERC]: [
    SIDEBAR_MENU_DASHBOARD,
    SIDEBAR_MENU_POSTS,
    SIDEBAR_MENU_POSTS_CATEGORIES,
    SIDEBAR_MENU_SERVICES,
    SIDEBAR_MENU_ACHIEVEMENTS,
    SIDEBAR_MENU_VACANCIES,
    SIDEBAR_MENU_ACTIVITIES,
    SIDEBAR_MENU_FEEDBACK,
    SIDEBAR_MENU_STAFF,
    SIDEBAR_MENU_SUBDIVISIONS,
    SIDEBAR_MENU_DOCUMENTS,
  ],
  [PROJECT_ATTESTAT]: [
    SIDEBAR_MENU_NEWS,
    SIDEBAR_MENU_FAQ,
    SIDEBAR_MENU_MEDIALIB,
    SIDEBAR_MENU_I18N,
  ],
  DEFAULT: [
    SIDEBAR_MENU_DASHBOARD,
    SIDEBAR_MENU_NEWS,
    SIDEBAR_MENU_POSTS,
    SIDEBAR_MENU_POSTS_CATEGORIES,
    SIDEBAR_MENU_SERVICES,
    SIDEBAR_MENU_STAFF,
    SIDEBAR_MENU_VACANCIES,
    SIDEBAR_MENU_MEDIALIB,
    SIDEBAR_MENU_I18N,
  ],
};
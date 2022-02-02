import { ComponentType } from 'react';
import {
  IconActivity,
  IconAdmin,
  IconDepartment,
  IconDocument,
  IconMedia,
  IconNews,
  IconOrganization,
  IconPortfolio,
  IconProject,
  IconStatistics,
  IconTranslate,
  IconUsers,
  IconVacancy,
  IconAchievement,
  IconService,
  IconPost,
  IconCategory,
  IconHelp,
  IconFeedback,
} from '../../../components/icons';
import { ROUTES } from '../../routes/route-constants';

const {
  DASHBOARD,
  ACHIEVEMENTS,
  ACTIVITIES,
  FAQ,
  FEEDBACK,
  DOCUMENTS,
  MEDIALIB,
  NEWS,
  POSTS,
  POSTS_CATEGORIES,
  PORTFOLIO,
  PROJECTS,
  ORGANIZATIONS,
  SERVICES,
  STAFF,
  SUBDIVISIONS,
  SUPERUSERS,
  VACANCIES,
  I18N,
} = ROUTES;

export interface SidebarMenuItemProps {
  path: string;
  label: string;
  labelKey: string;
  icon: ComponentType;
  viewBox?: string;
}

export const SIDEBAR_MENU_DASHBOARD: SidebarMenuItemProps = {
  path: DASHBOARD.ROOT,
  label: 'Дашборд',
  labelKey: 'dashboard',
  icon: IconStatistics,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_ACHIEVEMENTS: SidebarMenuItemProps = {
  path: ACHIEVEMENTS.ROOT,
  label: 'Достижения',
  labelKey: 'achievements',
  icon: IconAchievement,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_ACTIVITIES: SidebarMenuItemProps = {
  path: ACTIVITIES.ROOT,
  label: 'Деятельность',
  labelKey: 'activity',
  icon: IconActivity,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_FAQ: SidebarMenuItemProps = {
  path: FAQ.ROOT,
  label: 'FAQ',
  labelKey: 'faq',
  icon: IconHelp,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_FEEDBACK: SidebarMenuItemProps = {
  path: FEEDBACK.ROOT,
  label: 'Обратная связь',
  labelKey: 'feedback',
  icon: IconFeedback,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_DOCUMENTS: SidebarMenuItemProps = {
  path: DOCUMENTS.ROOT,
  label: 'Документы',
  labelKey: 'documents',
  icon: IconDocument,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_MEDIALIB: SidebarMenuItemProps = {
  path: MEDIALIB.ROOT,
  label: 'Медиатека',
  labelKey: 'mediaLibrary',
  icon: IconMedia,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_NEWS: SidebarMenuItemProps = {
  path: NEWS.ROOT,
  label: 'Новости',
  labelKey: 'news',
  icon: IconNews,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_ORGANIZATION: SidebarMenuItemProps = {
  path: ORGANIZATIONS.ROOT,
  label: 'Организации',
  labelKey: 'organizations',
  icon: IconOrganization,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_POSTS: SidebarMenuItemProps = {
  path: POSTS.ROOT,
  label: 'Посты',
  labelKey: 'posts',
  icon: IconPost,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_POSTS_CATEGORIES: SidebarMenuItemProps = {
  path: POSTS_CATEGORIES.ROOT,
  label: 'Категории постов',
  labelKey: 'posts.categories',
  icon: IconCategory,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_PORTFOLIO: SidebarMenuItemProps = {
  path: PORTFOLIO.ROOT,
  label: 'Портфолио',
  labelKey: 'portfolio',
  icon: IconPortfolio,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_PROJECTS: SidebarMenuItemProps = {
  path: PROJECTS.ROOT,
  label: 'Проекты',
  labelKey: 'projects',
  icon: IconProject,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_STAFF: SidebarMenuItemProps = {
  path: STAFF.ROOT,
  label: 'Сотрудники',
  labelKey: 'staff',
  icon: IconUsers,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_SERVICES: SidebarMenuItemProps = {
  path: SERVICES.ROOT,
  label: 'Услуги',
  labelKey: 'services',
  icon: IconService,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_SUBDIVISIONS: SidebarMenuItemProps = {
  path: SUBDIVISIONS.ROOT,
  label: 'Подразделения',
  labelKey: 'subdivisions',
  icon: IconDepartment,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_SUPERUSERS: SidebarMenuItemProps = {
  path: SUPERUSERS.ROOT,
  label: 'Админы',
  labelKey: 'superusers',
  icon: IconAdmin,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_VACANCIES: SidebarMenuItemProps = {
  path: VACANCIES.ROOT,
  label: 'Вакансии',
  labelKey: 'vacancies',
  icon: IconVacancy,
  viewBox: '0 0 24 24',
};

export const SIDEBAR_MENU_I18N: SidebarMenuItemProps = {
  path: I18N.ROOT,
  label: 'i18n',
  labelKey: 'i18n',
  icon: IconTranslate,
  viewBox: '0 0 24 24',
};

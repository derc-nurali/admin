import { combineReducers } from '@reduxjs/toolkit';
import { currentLocaleReducer as currentLocale } from '../slices/current-locale-slice';
import { localeReducer as locale } from '../slices/locale-slice';
import { authReducer as auth } from '../slices/auth-slice';
import { drawerReducer as drawer } from '../slices/drawer-slice';
import { ownerReducer as owner } from '../slices/owner-slice';
import { workflowReducer as workflow } from '../slices/workflow-slice';
import { achievementReducer } from '../slices/achievement-slice';
import { activityReducer } from '../slices/activity-slice';
import { documentReducer } from '../slices/document-slice';
import { faqReducer } from '../slices/faq-slice';
import { feedbackReducer } from '../slices/feedback-slice';
import { medialibReducer } from '../slices/medialib-slice';
import { newsReducer } from '../slices/news-slice';
import { organizationReducer } from '../slices/organization-slice';
import { postReducer } from '../slices/post-slice';
import { postCategoryReducer } from '../slices/post-category-slice';
import { portfolioReducer } from '../slices/portfolio-slice';
import { projectReducer } from '../slices/project-slice';
import { serviceReducer } from '../slices/service-slice';
import { staffReducer } from '../slices/staff-slice';
import { subdivisionReducer } from '../slices/subdivision-slice';
import { superuserReducer } from '../slices/superuser-slice';
import { vacancyReducer } from '../slices/vacancy-slice';
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
  ENTITY_POST_CATEGORY,
  ENTITY_PORTFOLIO,
  ENTITY_PROJECT,
  ENTITY_SERVICE,
  ENTITY_STAFF,
  ENTITY_SUBDIVISION,
  ENTITY_SUPERUSER,
  ENTITY_VACANCY,
} from '../constants/app/entity-constants';

export const rootReducer = combineReducers({
  currentLocale,
  locale,
  auth,
  owner,
  workflow,
  drawer,
  [ENTITY_ACHIEVEMENT]: achievementReducer,
  [ENTITY_ACTIVITY]: activityReducer,
  [ENTITY_DOCUMENT]: documentReducer,
  [ENTITY_FAQ]: faqReducer,
  [ENTITY_FEEDBACK]: feedbackReducer,
  [ENTITY_MEDIALIB]: medialibReducer,
  [ENTITY_NEWS]: newsReducer,
  [ENTITY_POST]: postReducer,
  [ENTITY_POST_CATEGORY]: postCategoryReducer,
  [ENTITY_PORTFOLIO]: portfolioReducer,
  [ENTITY_PROJECT]: projectReducer,
  [ENTITY_VACANCY]: vacancyReducer,
  [ENTITY_SERVICE]: serviceReducer,
  [ENTITY_STAFF]: staffReducer,
  [ENTITY_SUBDIVISION]: subdivisionReducer,
  [ENTITY_ORGANIZATION]: organizationReducer,
  [ENTITY_SUPERUSER]: superuserReducer,
});

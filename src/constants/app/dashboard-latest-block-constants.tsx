import { ReactNode } from 'react';
import { PROJECT_DERC } from './project-codes-constants';
import { ROUTES } from '../routes/route-constants';
import { NewsLatest } from '../../components/news';
import { ActivitiesLatest } from '../../components/activities';
import { VacanciesLatest } from '../../components/vacancies';
import { PortfolioLatest } from '../../components/portfolio';
import { PostsLatest } from '../../components/posts';
import { ServicesLatest } from '../../components/services';

export interface BlockProps {
  title: string;
  titleKey: string;
  component: ReactNode;
  url: string;
  linkText: string;
  linkKey: string;
}

export const DASHBOARD_LATEST_BLOCKS: Record<string, BlockProps[]> = {
  [PROJECT_DERC]: [
    {
      title: 'Последние посты',
      titleKey: 'post.latest',
      component: <PostsLatest />,
      url: ROUTES.POSTS.ROOT,
      linkText: 'Все посты',
      linkKey: 'posts.all',
    },
    {
      title: 'Последние услуги',
      titleKey: 'services.latest',
      component: <ServicesLatest />,
      url: ROUTES.SERVICES.ROOT,
      linkText: 'Все услуги',
      linkKey: 'services.all',
    },
    {
      title: 'Последние вакансии',
      titleKey: 'vacancy.latest',
      component: <ActivitiesLatest />,
      url: ROUTES.VACANCIES.ROOT,
      linkText: 'Все вакансии',
      linkKey: 'vacancy.all',
    },
    {
      title: 'Деятельность',
      titleKey: 'activity',
      component: <VacanciesLatest />,
      url: ROUTES.ACTIVITIES.ROOT,
      linkText: 'Вся деятельность',
      linkKey: 'activities.all',
    },
  ],
  DEFAULT: [
    {
      title: 'Последние новости',
      titleKey: 'news.latest',
      component: <NewsLatest />,
      url: ROUTES.NEWS.ROOT,
      linkText: 'Все новости',
      linkKey: 'news.all',
    },
    {
      title: 'Последнее портфолио',
      titleKey: 'portfolio.latest',
      component: <PortfolioLatest />,
      url: ROUTES.PORTFOLIO.ROOT,
      linkText: 'Все портфолио',
      linkKey: 'portfolio.all',
    },
    {
      title: 'Последние вакансии',
      titleKey: 'vacancy.latest',
      component: <ActivitiesLatest />,
      url: ROUTES.VACANCIES.ROOT,
      linkText: 'Все вакансии',
      linkKey: 'vacancy.all',
    },
    {
      title: 'Деятельность',
      titleKey: 'activity',
      component: <VacanciesLatest />,
      url: ROUTES.ACTIVITIES.ROOT,
      linkText: 'Вся деятельность',
      linkKey: 'activities.all',
    },
  ],
};

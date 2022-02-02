import { ComponentType } from 'react';
import { ROUTE_BY_ENTITY } from '../../../constants/routes/route-by-entity-constants';
import { Button, Hidden, IconButton, SvgIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dynamicRoute } from '../../../utils/route-utils';
import { IconPlus } from '../../icons';
import {
  ENTITY_ACHIEVEMENT,
  ENTITY_ACTIVITY,
  ENTITY_DOCUMENT,
  ENTITY_FAQ,
  ENTITY_MEDIALIB,
  ENTITY_NEWS,
  ENTITY_ORGANIZATION,
  ENTITY_PORTFOLIO,
  ENTITY_POST,
  ENTITY_POST_CATEGORY,
  ENTITY_PROJECT,
  ENTITY_SERVICE,
  ENTITY_STAFF,
  ENTITY_SUBDIVISION,
  ENTITY_SUPERUSER,
  ENTITY_VACANCY,
} from '../../../constants/app/entity-constants';

interface DataTableCreateButtonProps {
  entity: string;
  variant?: 'medium' | 'small';
}

export const DataTableCreateButton: ComponentType<DataTableCreateButtonProps> =
  ({ entity, variant = 'medium' }) => {
    const { t } = useTranslation();
    const href = dynamicRoute(ROUTE_BY_ENTITY[entity]['CREATE']);

    let label;
    switch (entity) {
      case ENTITY_ACHIEVEMENT:
        label = t('add.achievement', 'Добавить достижение');
        break;
      case ENTITY_ACTIVITY:
        label = t('add.activity', 'Добавить деятельность');
        break;
      case ENTITY_DOCUMENT:
        label = t('add.document', 'Добавить документ');
        break;
      case ENTITY_FAQ:
        label = t('add.faq', 'Добавить faq');
        break;
      case ENTITY_MEDIALIB:
        label = t('add.medialib', 'Добавить медиатеку');
        break;
      case ENTITY_NEWS:
        label = t('add.news', 'Добавить новость');
        break;
      case ENTITY_ORGANIZATION:
        label = t('add.organization', 'Добавить организацию');
        break;
      case ENTITY_POST:
        label = t('add.post', 'Добавить пост');
        break;
      case ENTITY_POST_CATEGORY:
        label = t('add.post.category', 'Добавить категорию');
        break;
      case ENTITY_PORTFOLIO:
        label = t('add.portfolio', 'Добавить портфолио');
        break;
      case ENTITY_PROJECT:
        label = t('add.project', 'Добавить проект');
        break;
      case ENTITY_STAFF:
        label = t('add.staff', 'Добавить сотрудника');
        break;
      case ENTITY_SERVICE:
        label = t('add.service', 'Добавить услугу');
        break;
      case ENTITY_SUBDIVISION:
        label = t('add.subdivision', 'Добавить подразделение');
        break;
      case ENTITY_SUPERUSER:
        label = t('add.superuser', 'Добавить админа');
        break;
      case ENTITY_VACANCY:
        label = t('add.vacancy', 'Добавить вакансию');
        break;
      default:
        label = t('add', 'Добавить');
    }

    if (variant === 'small') {
      return (
        <Hidden mdUp>
          <IconButton
            component={Link}
            to={href}
            color="info"
            size="small"
            title={label}
          >
            <SvgIcon
              component={IconPlus}
              viewBox="0 0 16 16"
              fontSize="small"
            />
          </IconButton>
        </Hidden>
      );
    }

    return (
      <Button
        component={Link}
        to={href}
        color="info"
        variant="contained"
        size="small"
        startIcon={
          <SvgIcon component={IconPlus} viewBox="0 0 16 16" fontSize="small" />
        }
      >
        {label}
      </Button>
    );
  };

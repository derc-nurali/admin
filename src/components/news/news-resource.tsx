import { UseCatalogProps } from '../../hooks';
import { map } from 'lodash';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/news-thunks';
import { newsEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
  DataTableTags,
} from '../data-table';
import { store } from '../../common/store';
import { ApiNews } from '../../http';
import { Typography } from '@material-ui/core';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_NEWS } from '../../constants/app/entity-constants';
import {
  FIELD_ACTIVITIES,
  FIELD_CREATED_AT,
  FIELD_CREATED_BY,
  FIELD_TAGS,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy,activities',
  exclude: 'description,shortDescription,isActive,language,updatedAt',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '48%',
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={newsEditRoute({ id })} />
    ),
  },
  {
    label: 'Деятельность',
    labelKey: 'activity',
    dataKey: FIELD_ACTIVITIES,
    width: '20%',
    sortable: false,
    renderItem: ({ activities }: any) => (
      <DataTableTags data={map(activities, (x) => x.shortTitle)} />
    ),
  },
  {
    label: 'Теги',
    labelKey: 'tags',
    dataKey: FIELD_TAGS,
    width: '20%',
    sortable: false,
    renderItem: ({ tags }: any) => (
      <DataTableTags data={map(tags, (tag) => tag)} />
    ),
  },
  {
    label: 'Автор',
    labelKey: 'author',
    dataKey: FIELD_CREATED_BY,
    width: '16%',
    sortable: true,
    renderItem: ({ createdBy }: any) => (
      <Typography
        variant="body3"
        component="span"
        sx={{ whiteSpace: 'nowrap' }}
      >
        {createdBy?.lastName}{' '}
        {createdBy?.firstName ? createdBy?.firstName[0] + '.' : null}
      </Typography>
    ),
  },
  {
    label: 'Дата',
    labelKey: 'date',
    dataKey: FIELD_CREATED_AT,
    sortable: true,
    renderItem: ({ createdAt }: any) => (
      <DataTableDate
        label="Опубликовано"
        labelKey="published"
        date={createdAt}
      />
    ),
  },
];

export const NEWS_RESOURCES: UseCatalogProps = {
  apiService: ApiNews,
  entity: ENTITY_NEWS,
  route: ROUTES.NEWS,
  getCatalog: (params: Record<string, any>) => dispatch(getCatalog(params)),
  getCounts: (locale: string, force = false) => {
    if (force) {
      dispatch(forceGetCounts(locale));
    } else {
      dispatch(getCounts(locale));
    }
  },
  defaultQuery,
  columns,
};

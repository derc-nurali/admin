import { UseCatalogProps } from '../../hooks';
import { map } from 'lodash';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/portfolio-thunks';
import { portfolioEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
  DataTableTags,
} from '../data-table';
import { store } from '../../common/store';
import { ApiPortfolio } from '../../http';
import { Typography } from '@material-ui/core';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_PORTFOLIO } from '../../constants/app/entity-constants';
import {
  FIELD_ACTIVITIES,
  FIELD_CREATED_AT,
  FIELD_CREATED_BY,
  FIELD_TITLE,
  FIELD_WEIGHT,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy,activities',
  exclude:
    'description,shortDescription,colors,isActive,language,tags,updatedAt,url',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '48%',
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={portfolioEditRoute({ id })} />
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
  {
    label: 'Вес',
    labelKey: 'weight',
    dataKey: FIELD_WEIGHT,
    sortable: true,
  },
];

export const PORTFOLIO_RESOURCES: UseCatalogProps = {
  apiService: ApiPortfolio,
  entity: ENTITY_PORTFOLIO,
  route: ROUTES.PORTFOLIO,
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

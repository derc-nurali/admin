import { UseCatalogProps } from '../../hooks';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/vacancy-thunks';
import {
  vacancyApplicationsViewRoute,
  vacancyEditRoute,
} from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
} from '../data-table';
import { store } from '../../common/store';
import { ApiVacancies } from '../../http';
import { Typography } from '@material-ui/core';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_VACANCY } from '../../constants/app/entity-constants';
import {
  FIELD_CREATED_BY,
  FIELD_FEEDBACK,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy',
  exclude: 'description,shortDescription,isActive,language,updatedAt',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '40%',
    sortable: true,
    renderItem: ({ id, title }: any, idx: number) => (
      <DataTableLink label={title} to={vacancyEditRoute({ id })} key={idx} />
    ),
  },
  {
    label: 'Отклики',
    labelKey: 'feedback',
    dataKey: FIELD_FEEDBACK,
    width: '16%',
    sortable: true,
    renderItem: ({ id }: any, idx: number) => (
      <DataTableLink
        label="Показать"
        labelKey="show"
        to={vacancyApplicationsViewRoute({ id })}
        key={idx}
      />
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
    dataKey: 'createdAt',
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

export const VACANCIES_RESOURCES: UseCatalogProps = {
  apiService: ApiVacancies,
  entity: ENTITY_VACANCY,
  route: ROUTES.VACANCIES,
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

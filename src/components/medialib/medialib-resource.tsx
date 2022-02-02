import { UseCatalogProps } from '../../hooks';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/medialib-thunks';
import { medialibEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
  DataTableText,
} from '../data-table';
import { Typography } from '@material-ui/core';
import { store } from '../../common/store';
import { ApiMedialib } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_MEDIALIB } from '../../constants/app/entity-constants';
import {
  FIELD_CATEGORY,
  FIELD_CREATED_AT,
  FIELD_CREATED_BY,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy',
  exclude: 'description,shortDescription,isActive,language,youtubeLink',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '52%',
    sortable: true,
    renderItem: ({ id, title }: any, idx: number) => (
      <DataTableLink label={title} to={medialibEditRoute({ id })} key={idx} />
    ),
  },
  {
    label: 'Категория',
    labelKey: 'category',
    dataKey: FIELD_CATEGORY,
    sortable: true,
    renderItem: ({ category }: any) => (
      <DataTableText label={category} labelKey={category} />
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

export const MEDIALIB_RESOURCES: UseCatalogProps = {
  apiService: ApiMedialib,
  entity: ENTITY_MEDIALIB,
  route: ROUTES.MEDIALIB,
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

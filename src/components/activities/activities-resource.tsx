import { UseCatalogProps } from '../../hooks';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/activity-thunks';
import { activityEditRoute } from '../../utils/route-utils';
import { DataTableColumnsProps, DataTableLink } from '../data-table';
import { Typography } from '@material-ui/core';
import { store } from '../../common/store';
import { ApiActivities } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_ACTIVITY } from '../../constants/app/entity-constants';
import {
  FIELD_CREATED_BY,
  FIELD_ID,
  FIELD_SHORT_TITLE,
  FIELD_TITLE,
  FIELD_WEIGHT,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy',
  exclude:
    'description,shortDescription,stepTitle,steps,isActive,language,updatedAt',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'ID',
    labelKey: 'ID',
    dataKey: FIELD_ID,
    width: '6%',
    sortable: true,
  },
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={activityEditRoute({ id })} />
    ),
  },
  {
    label: 'Краткое название',
    labelKey: 'shortTitle',
    dataKey: FIELD_SHORT_TITLE,
    sortable: true,
    renderItem: ({ id, shortTitle }: any) => (
      <DataTableLink label={shortTitle} to={activityEditRoute({ id })} />
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
    label: 'Вес',
    labelKey: 'weight',
    dataKey: FIELD_WEIGHT,
    sortable: true,
  },
];

export const ACTIVITIES_RESOURCES: UseCatalogProps = {
  apiService: ApiActivities,
  entity: ENTITY_ACTIVITY,
  route: ROUTES.ACTIVITIES,
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

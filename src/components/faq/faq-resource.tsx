import { UseCatalogProps } from '../../hooks';
import { getCatalog, getCounts, forceGetCounts } from '../../thunks/faq-thunks';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
} from '../data-table';
import { faqEditRoute } from '../../utils/route-utils';
import { store } from '../../common/store';
import { ApiFaq } from '../../http';
import { Typography } from '@material-ui/core';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_FAQ } from '../../constants/app/entity-constants';
import {
  FIELD_CREATED_AT,
  FIELD_CREATED_BY,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy',
  exclude: 'description,isActive,language,updatedAt',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '48%',
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={faqEditRoute({ id })} />
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

export const FAQ_RESOURCES: UseCatalogProps = {
  apiService: ApiFaq,
  entity: ENTITY_FAQ,
  route: ROUTES.FAQ,
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

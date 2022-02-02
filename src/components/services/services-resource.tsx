import { UseCatalogProps } from '../../hooks';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/service-thunks';
import { serviceEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
  DataTableTags,
} from '../data-table';
import { store } from '../../common/store';
import { ApiServices } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_SERVICE } from '../../constants/app/entity-constants';
import {
  FIELD_CREATED_AT,
  FIELD_TAGS,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';
import { map } from 'lodash';

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
    width: '48%',
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={serviceEditRoute({ id })} />
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

export const SERVICES_RESOURCES: UseCatalogProps = {
  apiService: ApiServices,
  entity: ENTITY_SERVICE,
  route: ROUTES.SERVICES,
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

import { UseCatalogProps } from '../../hooks';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/organization-thunks';
import { organizationEditRoute } from '../../utils/route-utils';
import { DataTableColumnsProps, DataTableLink } from '../data-table';
import { store } from '../../common/store';
import { ApiOrganizations } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_ORGANIZATION } from '../../constants/app/entity-constants';
import { FIELD_NAME } from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy,activities',
  exclude: 'description,shortDescription',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Название',
    labelKey: 'name',
    dataKey: FIELD_NAME,
    sortable: true,
    renderItem: ({ id, name }: any) => (
      <DataTableLink label={name} to={organizationEditRoute({ id })} />
    ),
  },
];

export const ORGANIZATIONS_RESOURCES: UseCatalogProps = {
  apiService: ApiOrganizations,
  entity: ENTITY_ORGANIZATION,
  route: ROUTES.ORGANIZATIONS,
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

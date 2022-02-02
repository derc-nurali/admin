import { UseCatalogProps } from '../../hooks';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/project-thunks';
import { projectEditRoute } from '../../utils/route-utils';
import { DataTableColumnsProps, DataTableLink } from '../data-table';
import { store } from '../../common/store';
import { ApiProjects } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_PROJECT } from '../../constants/app/entity-constants';
import { FIELD_ID, FIELD_NAME } from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {};

const columns: DataTableColumnsProps[] = [
  {
    label: 'ID',
    labelKey: 'ID',
    dataKey: FIELD_ID,
    width: '6%',
    sortable: true,
  },
  {
    label: 'Название',
    labelKey: 'name',
    dataKey: FIELD_NAME,
    sortable: true,
    renderItem: ({ id, name }: any) => (
      <DataTableLink label={name} to={projectEditRoute({ id })} />
    ),
  },
];

export const PROJECTS_RESOURCES: UseCatalogProps = {
  apiService: ApiProjects,
  entity: ENTITY_PROJECT,
  route: ROUTES.PROJECTS,
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

import { UseCatalogProps } from '../../hooks';
import { isEmpty, map } from 'lodash';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/document-thunks';
import { documentEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableLink,
  DataTableTags,
} from '../data-table';
import { Grid } from '@material-ui/core';
import { store } from '../../common/store';
import { ApiDocuments } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_DOCUMENT } from '../../constants/app/entity-constants';
import {
  FIELD_LEX_ITEMS,
  FIELD_TAGS,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: '',
  exclude: 'description,shortDescription,isActive,language',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '50%',
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={documentEditRoute({ id })} />
    ),
  },
  {
    label: 'Документы',
    labelKey: 'documents',
    dataKey: FIELD_LEX_ITEMS,
    sortable: true,
    renderItem: ({ lexItems }: any) => {
      if (!isEmpty(lexItems)) {
        return (
          <Grid container spacing={2} direction="column">
            {map(lexItems, (item, idx) => (
              <Grid item key={idx}>
                {item.title}
              </Grid>
            ))}
          </Grid>
        );
      }
    },
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
];

export const DOCUMENTS_RESOURCES: UseCatalogProps = {
  apiService: ApiDocuments,
  entity: ENTITY_DOCUMENT,
  route: ROUTES.DOCUMENTS,
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

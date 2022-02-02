import { UseCatalogProps } from '../../hooks';
import { map, get } from 'lodash';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/post-thunks';
import { postEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
  DataTableTags,
} from '../data-table';
import { store } from '../../common/store';
import { ApiPosts } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_POST } from '../../constants/app/entity-constants';
import {
  FIELD_CATEGORIES,
  FIELD_CREATED_AT,
  FIELD_TAGS,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;
const currentLocale = get(store.getState(), ['currentLocale', 'current']);

const defaultQuery: Record<string, any> = {
  embed: 'categories,createdBy',
  exclude: 'description,shortDescription,isActive,language,updatedAt',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '40%',
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={postEditRoute({ id })} />
    ),
  },
  {
    label: 'Категории постов',
    labelKey: 'posts.categories',
    dataKey: FIELD_CATEGORIES,
    width: '20%',
    sortable: false,
    renderItem: ({ categories }: any) => (
      <DataTableTags
        data={map(categories, (category) =>
          get(category, ['title', currentLocale])
        )}
      />
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

export const POSTS_RESOURCES: UseCatalogProps = {
  apiService: ApiPosts,
  entity: ENTITY_POST,
  route: ROUTES.POSTS,
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

import { UseCatalogProps } from '../../hooks';
import { get } from 'lodash';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/post-category-thunks';
import { postCategoryEditRoute } from '../../utils/route-utils';
import { DataTableColumnsProps, DataTableLink } from '../data-table';
import { store } from '../../common/store';
import { ApiPostsCategories } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_POST_CATEGORY } from '../../constants/app/entity-constants';
import {
  FIELD_ID,
  FIELD_TITLE,
  FIELD_WEIGHT,
} from '../../constants/app/fields-constants';
import {
  LOCALE_EN,
  LOCALE_OZ,
  LOCALE_RU,
  LOCALE_UZ,
} from '../../constants/app/locales-constants';

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
    label: 'Русский',
    labelKey: 'russian',
    dataKey: FIELD_TITLE,
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink
        label={get(title, LOCALE_RU)}
        to={postCategoryEditRoute({ id })}
      />
    ),
  },
  {
    label: 'Английский',
    labelKey: 'english',
    dataKey: FIELD_TITLE,
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink
        label={get(title, LOCALE_EN)}
        to={postCategoryEditRoute({ id })}
      />
    ),
  },
  {
    label: 'Узбекский',
    labelKey: 'ozbek',
    dataKey: FIELD_TITLE,
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink
        label={get(title, LOCALE_OZ)}
        to={postCategoryEditRoute({ id })}
      />
    ),
  },
  {
    label: 'Узбекский кириллица',
    labelKey: 'uzbek',
    dataKey: FIELD_TITLE,
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink
        label={get(title, LOCALE_UZ)}
        to={postCategoryEditRoute({ id })}
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

export const POSTS_CATEGORIES_RESOURCES: UseCatalogProps = {
  apiService: ApiPostsCategories,
  entity: ENTITY_POST_CATEGORY,
  route: ROUTES.POSTS_CATEGORIES,
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

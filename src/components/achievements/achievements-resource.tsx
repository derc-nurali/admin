import { UseCatalogProps } from '../../hooks';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/achievement-thunks';
import { achievementEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
  DataTableText,
} from '../data-table';
import { store } from '../../common/store';
import { ApiAchievements } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_ACHIEVEMENT } from '../../constants/app/entity-constants';
import {
  FIELD_COMPLETED,
  FIELD_COMPLETED_AT,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy',
  exclude: 'description,shortDescription,isActive,language',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={achievementEditRoute({ id })} />
    ),
  },
  {
    label: 'Дата',
    labelKey: 'date',
    dataKey: FIELD_COMPLETED_AT,
    sortable: true,
    renderItem: ({ completedAt }: any) => (
      <DataTableDate
        label="Завершение"
        labelKey="completion"
        date={completedAt}
      />
    ),
  },
  {
    label: 'Завершенный',
    labelKey: 'completed',
    dataKey: FIELD_COMPLETED,
    sortable: true,
    renderItem: ({ completed }: any) => (
      <DataTableText
        label={completed ? 'Да' : 'Нет'}
        labelKey={completed ? 'yes' : 'no'}
      />
    ),
  },
];

export const ACHIEVEMENTS_RESOURCES: UseCatalogProps = {
  apiService: ApiAchievements,
  entity: ENTITY_ACHIEVEMENT,
  route: ROUTES.ACHIEVEMENTS,
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

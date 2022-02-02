import { UseCatalogProps } from '../../hooks';
import { IconUser } from '../icons';
import {
  DataTableColumnsProps,
  DataTableLink,
  DataTableText,
} from '../data-table';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/staff-thunks';
import { staffEditRoute } from '../../utils/route-utils';
import { Avatar, Grid, SvgIcon } from '@material-ui/core';
import { store } from '../../common/store';
import { ApiStaff } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_STAFF } from '../../constants/app/entity-constants';
import {
  FIELD_DEPARTMENT,
  FIELD_POSITION,
  FIELD_WEIGHT,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'cover',
  exclude:
    'description,shortDescription,daysOfAdmission,email,phone,facebookLink,instagramLink,telegramLink,isActive,language',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Полное имя',
    labelKey: 'fullName',
    dataKey: 'fullName',
    width: '35%',
    sortable: true,
    renderItem: ({ id, cover, fullName }: any) => (
      <DataTableLink to={staffEditRoute({ id })}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Avatar src={cover?.thumbnails?.small_c?.url}>
              <SvgIcon
                component={IconUser}
                viewBox="0 0 15 16"
                fontSize="small"
              />
            </Avatar>
          </Grid>
          <Grid item>{fullName}</Grid>
        </Grid>
      </DataTableLink>
    ),
  },
  {
    label: 'Должность',
    labelKey: 'position',
    dataKey: FIELD_POSITION,
    sortable: true,
    renderItem: ({ id, position }: any) => (
      <DataTableLink label={position} to={staffEditRoute({ id })} />
    ),
  },
  {
    label: 'Отделение',
    labelKey: 'department',
    dataKey: FIELD_DEPARTMENT,
    sortable: true,
    width: '15%',
    renderItem: ({ department }: any) => (
      <DataTableText label={department} labelKey={department} />
    ),
  },
  {
    label: 'Вес',
    labelKey: 'weight',
    dataKey: FIELD_WEIGHT,
    sortable: true,
  },
];

export const STAFF_RESOURCES: UseCatalogProps = {
  apiService: ApiStaff,
  entity: ENTITY_STAFF,
  route: ROUTES.STAFF,
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

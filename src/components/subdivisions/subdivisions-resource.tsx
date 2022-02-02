import { UseCatalogProps } from '../../hooks';
import { isEmpty, map } from 'lodash';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/subdivision-thunks';
import { staffEditRoute, subdivisionEditRoute } from '../../utils/route-utils';
import { IconUser } from '../icons';
import { DataTableColumnsProps, DataTableLink } from '../data-table';
import { Avatar, Grid, SvgIcon } from '@material-ui/core';
import { store } from '../../common/store';
import { ApiSubdivisions } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_SUBDIVISION } from '../../constants/app/entity-constants';
import {
  FIELD_PARENT,
  FIELD_STAFFS,
  FIELD_TITLE,
  FIELD_WEIGHT,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'createdBy,staffs,staffs.cover,parent',
  exclude: 'description,shortDescription,isActive,language,createdBy,updatedAt',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '35%',
    sortable: true,
    renderItem: ({ id, title }: any) => (
      <DataTableLink label={title} to={subdivisionEditRoute({ id })} />
    ),
  },
  {
    label: 'Сотрудники',
    labelKey: 'staff',
    dataKey: FIELD_STAFFS,
    renderItem: ({ staffs }: any) => (
      <Grid container spacing={1} direction="column" justifyContent="center">
        {map(staffs, ({ id, fullName, cover }, idx) => (
          <DataTableLink to={staffEditRoute({ id })} key={idx}>
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
        ))}
      </Grid>
    ),
  },
  {
    label: 'Родитель',
    labelKey: 'parent',
    dataKey: FIELD_PARENT,
    width: '25%',
    sortable: true,
    renderItem: ({ parent }: any) => {
      if (!isEmpty(parent)) {
        return (
          <DataTableLink
            label={parent.title}
            to={subdivisionEditRoute({ id: parent.id })}
            variant="body3"
          />
        );
      }
      return null;
    },
  },
  {
    label: 'Вес',
    labelKey: 'weight',
    dataKey: FIELD_WEIGHT,
    sortable: true,
  },
];

export const SUBDIVISIONS_RESOURCES: UseCatalogProps = {
  apiService: ApiSubdivisions,
  entity: ENTITY_SUBDIVISION,
  route: ROUTES.SUBDIVISIONS,
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

import { UseCatalogProps } from '../../hooks';
import { get, map } from 'lodash';
import {
  getCatalog,
  getCounts,
  forceGetCounts,
} from '../../thunks/superuser-thunks';
import { superuserEditRoute } from '../../utils/route-utils';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableLink,
  DataTableTags,
} from '../data-table';
import { IconUser } from '../icons';
import { Avatar, Grid, SvgIcon } from '@material-ui/core';
import { store } from '../../common/store';
import { ApiSuperUsers } from '../../http';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_SUPERUSER } from '../../constants/app/entity-constants';
import {
  FIELD_LAST_NAME,
  FIELD_LAST_VISITED_AT,
  FIELD_PROJECTS,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  embed: 'avatar,organization,projects',
  exclude: 'description,shortDescription,createdAt,email,pin',
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Полное имя',
    labelKey: 'fullName',
    dataKey: FIELD_LAST_NAME,
    width: '52%',
    sortable: true,
    renderItem: ({ id, avatar, firstName, lastName, organization }: any) => {
      const fullName = [lastName, firstName].filter(Boolean).join(' ');
      const orgName = get(organization, 'name');
      return (
        <DataTableLink to={superuserEditRoute({ id })}>
          <Grid container spacing={1}>
            <Grid item>
              <Avatar src={avatar?.thumbnails?.small_c?.url}>
                <SvgIcon
                  component={IconUser}
                  viewBox="0 0 15 16"
                  fontSize="small"
                />
              </Avatar>
            </Grid>
            <Grid item>
              {fullName}
              {orgName && (
                <div style={{ fontSize: 14, color: 'rgba(34, 34, 34, 0.6)' }}>
                  {orgName}
                </div>
              )}
            </Grid>
          </Grid>
        </DataTableLink>
      );
    },
  },
  {
    label: 'Доступ к проектам и роли',
    labelKey: 'accessProjectsRoles',
    dataKey: FIELD_PROJECTS,
    width: '20%',
    renderItem: ({ projects }: any) => (
      <DataTableTags data={map(projects, (x) => x.name)} />
    ),
  },
  {
    label: 'Последний визит',
    labelKey: 'lastSeen',
    dataKey: FIELD_LAST_VISITED_AT,
    sortable: true,
    renderItem: ({ lastVisitedAt }: any) => {
      if (lastVisitedAt) return <DataTableDate date={lastVisitedAt} />;
      else return <small>Давно не заходил</small>;
    },
  },
];

export const SUPER_USERS_RESOURCES: UseCatalogProps = {
  apiService: ApiSuperUsers,
  entity: ENTITY_SUPERUSER,
  route: ROUTES.SUPERUSERS,
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

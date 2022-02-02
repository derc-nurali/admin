import { ComponentType, useCallback, useEffect, useState } from 'react';
import { useLanguage, useResponsive, useRouter } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { get, set } from 'lodash';
import { FormikValues } from 'formik/dist/types';
import moment from 'moment';
import { TabNav, TabNavItemsProps } from '../tab-nav';
import { DataTable, DataTableBrim } from '../data-table';
import { Loader } from '../loader';
import {
  Button,
  Container,
  Grid,
  Hidden,
  IconButton,
  SvgIcon,
} from '@material-ui/core';
import { IconCalendar, IconPlus, IconSettings, IconSort } from '../icons';
import { BackButton } from '../back-button';
import { PageTitle } from '../page-title';
import { ActionsForm, SearchForm, SelectForm } from '../forms';
import { Pagination } from '../pagiation';
import { dynamicRoute } from '../../utils/route-utils';
import {
  DATE_FORMAT,
  OPTIONS_ACTIONS,
  OPTIONS_PER_PAGE,
  OPTIONS_PERIODS,
} from '../../constants/app/action-options-constants';

type Resource = {
  columns: any[];
};

type TableViewProps = {
  routes: any;
  api: any;
  resource: Resource;
};

const PAGE = 1;
const TAKE = 5;

const DEFAULT_QUERY = {
  page: PAGE,
  take: TAKE,
};

type ParamsProps = Record<string, any>;

export const TableView: ComponentType<TableViewProps> = ({
  api,
  routes,
  resource,
}) => {
  const r = useResponsive();
  const router = useRouter();
  const { t } = useTranslation();
  const { currentLocale } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hits, setHits] = useState<any[]>([]);
  const [query, setQuery] = useState<ParamsProps>(DEFAULT_QUERY);
  const [total, setTotal] = useState<number>(0);
  const [otherCounter, setOtherCounter] = useState<number>(0);

  const queryPage = parseInt(get(query, 'page', PAGE));
  const queryTake = parseInt(get(query, 'take', TAKE));
  const queryCount = Math.ceil(total / queryTake);
  const queryCreatedAtFrom = get(query, 'createdAtFrom', '');

  const handleInit = async () => {
    const params = { ...router.query };
    const isActive = router.asPath === routes.DRAFTS ? 0 : 1;
    await handleFetchCounter(isActive ? 0 : 1);
    await handleFetch({ ...params, isActive });
    setIsLoading(false);
  };

  const handleFetchCounter = (isActive: number = 0) => {
    return new Promise((resolve) => {
      api
        .fetchAll({ isActive, take: 1 })
        .then(({ total }: any) => {
          setOtherCounter(total);
          resolve(total);
        })
        .catch(() => resolve(0));
    });
  };

  const handleFetch = async (params: ParamsProps = {}) => {
    setQuery(params);
    const page = get(params, 'page', PAGE);
    const take = get(params, 'take', TAKE);
    const skip = (page - 1) * take;

    const fetchQuery = {
      language: currentLocale,
      embed: 'createdBy',
      skip,
      ...params,
    };
    return api.fetchAll(fetchQuery).then(({ hits, total }: any) => {
      setHits(hits);
      setTotal(total);
    });
  };

  const handleRouterPush = (params: ParamsProps) => {
    router.push({
      pathname: router.pathname,
      search: '?' + new URLSearchParams(params),
    });
  };

  const handleSearch = ({ query: keyword }: FormikValues) => {
    const params = {};
    if (keyword) {
      set(params, [keyword], keyword);
    }
    handleRouterPush(params);
  };

  const handleAction = () => {};

  const handlePageChange = (e: any, page: number) => {
    const params = { ...query };
    set(params, 'page', page);
    handleRouterPush(params);
  };

  const handleTakeChange = (take: number) => {
    const params = { ...query };
    set(params, 'page', 1);
    set(params, 'take', take);
    handleRouterPush(params);
  };

  const handlePeriodChange = (createdAtFrom: string) => {
    const params = { ...query };
    set(params, 'page', 1);
    if (createdAtFrom) {
      const createdAtTo = moment(createdAtFrom, DATE_FORMAT)
        .endOf('month')
        .format(DATE_FORMAT);
      set(params, 'createdAtFrom', createdAtFrom);
      set(params, 'createdAtTo', createdAtTo);
    } else {
      delete params['createdAtFrom'];
      delete params['createdAtTo'];
    }
    handleRouterPush(params);
  };

  const handleFoo = () => {};

  const handleSelect = useCallback(() => {}, []);

  useEffect(() => {
    handleInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const navigation: TabNavItemsProps[] = [
    {
      label: t('all', 'Все'),
      path: dynamicRoute(routes.ROOT),
      counter: router.asPath === routes.DRAFTS ? otherCounter : total,
    },
    {
      label: t('drafts', 'Черновики'),
      path: dynamicRoute(routes.DRAFTS),
      counter: router.asPath === routes.DRAFTS ? total : otherCounter,
    },
  ];

  if (isLoading) return <Loader />;

  const title = get(resource, 'title'),
    titleKey = get(resource, 'titleKey'),
    moduleName = get(resource, 'moduleName');

  return (
    <Container>
      <BackButton />
      <PageTitle title={t(titleKey, title)} />
      <Grid container mb={2} columnSpacing={2}>
        <Grid item>
          <TabNav items={navigation} />
        </Grid>
        <Grid
          item
          sx={{ marginLeft: 'auto' }}
          hidden={r({ xs: true, sm: true, md: false })}
        >
          <Button
            href={dynamicRoute(routes.CREATE)}
            color="info"
            variant="contained"
            size="small"
            startIcon={
              <SvgIcon
                component={IconPlus}
                viewBox="0 0 16 16"
                fontSize="small"
              />
            }
          >
            {t(`add.${moduleName}`)}
          </Button>
        </Grid>
      </Grid>
      <DataTableBrim
        actions={[
          <Hidden mdUp>
            <IconButton
              href={dynamicRoute(routes.CREATE)}
              color="info"
              size="small"
            >
              <SvgIcon
                component={IconPlus}
                viewBox="0 0 16 16"
                fontSize="small"
              />
            </IconButton>
          </Hidden>,
          <SelectForm
            onChange={handlePeriodChange}
            data={OPTIONS_PERIODS}
            value={queryCreatedAtFrom}
            label={t('period', 'Период')}
            prompt={t('choose', 'Выберите')}
            name="periods"
            icon={
              <SvgIcon
                component={IconCalendar}
                viewBox="0 0 16 16"
                fontSize="small"
              />
            }
          />,
          <SelectForm
            onChange={handleFoo}
            data={[]}
            name="projects"
            label={t('project', 'Проект')}
            icon={
              <SvgIcon
                component={IconSort}
                viewBox="0 0 16 12"
                fontSize="small"
              />
            }
          />,
        ]}
      >
        <SearchForm onSubmit={handleSearch} />
      </DataTableBrim>
      <DataTable
        onSelect={handleSelect}
        data={hits}
        columns={resource.columns}
        selectable
      />
      <DataTableBrim
        usage="footer"
        actions={[
          <SelectForm
            onChange={handleTakeChange}
            data={OPTIONS_PER_PAGE}
            value={queryTake}
            name="perPage"
            label={t('perPage', 'На странице')}
            icon={
              <SvgIcon
                component={IconSettings}
                viewBox="0 0 16 16"
                fontSize="small"
              />
            }
          />,
        ]}
      >
        <ActionsForm onSubmit={handleAction} data={OPTIONS_ACTIONS} />
      </DataTableBrim>

      {queryCount > 1 && hits?.length > 0 && (
        <Pagination
          onChange={handlePageChange}
          page={queryPage}
          count={queryCount}
          showFirstButton={r({ xs: false, sm: false, md: true })}
          showLastButton={r({ xs: false, sm: false, md: true })}
        />
      )}
    </Container>
  );
};

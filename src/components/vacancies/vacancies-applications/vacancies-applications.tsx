import { ComponentType, useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { get, set } from 'lodash';
import { Container, Grid } from '@material-ui/core';
import { PageTitle } from '../../page-title';
import { useTranslation } from 'react-i18next';
import { BackButton } from '../../back-button';
import { DataTable } from '../../data-table';
import { useLanguage, useResponsive, useRouter } from '../../../hooks';
import { Pagination } from '../../pagiation';
import { TabNav, TabNavItemsProps } from '../../tab-nav';
import { DataTableCreateButton } from '../../data-table/data-table-create-button';
import { dynamicRoute } from '../../../utils/route-utils';
import { ROUTES } from '../../../constants/routes/route-constants';
import { ApiVacancies } from '../../../http';
import { VACANCIES_APPLICATIONS_COLUMNS_RESOURCE } from './vacancies-applications-columns-resource';
import {
  API_DEFAULT_PAGE,
  API_DEFAULT_TAKE,
} from '../../../constants/app/size-constants';
import { ENTITY_VACANCY } from '../../../constants/app/entity-constants';

export const VacanciesApplications: ComponentType = () => {
  const router = useRouter();
  const r = useResponsive();
  const { t } = useTranslation();
  const { currentLocale } = useLanguage();
  const [hits, setHits] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { counts } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_VACANCY]
  );

  const queryPage = parseInt(get(router.query, 'page', API_DEFAULT_PAGE));
  const queryTake = parseInt(get(router.query, 'take', API_DEFAULT_TAKE));
  const queryCount = Math.ceil(total / queryTake);

  const handleFetch = (params: Record<string, any>) => {
    setIsLoading(true);
    ApiVacancies.fetchAllApplications({
      embed: 'resume,vacancy',
      ...params,
    })
      .then(({ hits, total }: any) => {
        setHits(hits);
        setTotal(total);
      })
      .finally(() => setIsLoading(false));
  };

  const handlePageChange = (e: any, page: number) => {
    const params = { ...router.query };
    set(params, 'page', page);
    router.push({
      pathname: router.pathname,
      search: '?' + new URLSearchParams(params),
    });
  };

  useEffect(() => {
    const page = get(router.query, 'page', API_DEFAULT_PAGE);
    const take = get(router.query, 'take', API_DEFAULT_TAKE);
    const skip = (page - 1) * take;

    handleFetch({ page, take, skip });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const navigation: TabNavItemsProps[] = [
    {
      label: t('all', 'Все'),
      path: dynamicRoute(ROUTES.VACANCIES.ROOT),
      counter: get(counts, [currentLocale, 'total'], 0),
    },
    {
      label: t('drafts', 'Черновики'),
      path: dynamicRoute(ROUTES.VACANCIES.DRAFTS),
      counter: get(counts, [currentLocale, 'drafts'], 0),
    },
    {
      label: t('feedbacks', 'Отклики'),
      path: dynamicRoute(ROUTES.VACANCIES.APPLICATIONS),
      counter: get(counts, [currentLocale, 'applications'], 0),
    },
  ];

  return (
    <Container>
      <BackButton />
      <PageTitle title={t('feedbacks', 'Отклики')} />
      <Grid container mb={2} columnSpacing={2}>
        <Grid item>
          <TabNav items={navigation} />
        </Grid>
        <Grid
          item
          sx={{ marginLeft: 'auto' }}
          hidden={r({ xs: true, sm: true, md: false })}
        >
          <DataTableCreateButton entity={ENTITY_VACANCY} />
        </Grid>
      </Grid>
      <DataTable
        data={hits}
        columns={VACANCIES_APPLICATIONS_COLUMNS_RESOURCE}
        loading={isLoading}
      />
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

import { ComponentType } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { useResponsive, useCatalog, useLanguage } from '../../hooks';
import { BackButton } from '../back-button';
import { DataTable, DataTableBrim } from '../data-table';
import { PageTitle } from '../page-title';
import { TabNav, TabNavItemsProps } from '../tab-nav';
import {
  ActionsForm,
  PeriodsSelectForm,
  PerPageSelectForm,
  SearchForm,
} from '../forms';
import { Pagination } from '../pagiation';
import { DataTableCreateButton } from '../data-table/data-table-create-button';
import { dynamicRoute } from '../../utils/route-utils';
import { OPTIONS_ACTIONS } from '../../constants/app/action-options-constants';
import { ENTITY_VACANCY } from '../../constants/app/entity-constants';
import { ROUTES } from '../../constants/routes/route-constants';
import { VACANCIES_RESOURCES } from './vacancies-resource';

export const Vacancies: ComponentType = () => {
  const r = useResponsive();
  const { t } = useTranslation();
  const { currentLocale } = useLanguage();
  const {
    handleSelect,
    handleOrder,
    handleSearch,
    handleAction,
    handlePageChange,
    handleTakeChange,
    handlePeriodChange,
    selectedItems,
    hits,
    counts,
    total,
    drafts,
    isLoading,
    queryPage,
    queryTake,
    queryCount,
    queryKeyword,
    queryCreatedAtFrom,
    columns,
  }: any = useCatalog(VACANCIES_RESOURCES);

  const navigation: TabNavItemsProps[] = [
    {
      label: t('all', 'Все'),
      path: dynamicRoute(ROUTES.VACANCIES.ROOT),
      counter: total,
    },
    {
      label: t('drafts', 'Черновики'),
      path: dynamicRoute(ROUTES.VACANCIES.DRAFTS),
      counter: drafts,
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
      <PageTitle title={t('vacancies', 'Вакансии')} />
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
      <DataTableBrim
        actions={[
          <DataTableCreateButton entity={ENTITY_VACANCY} variant="small" />,
          <PeriodsSelectForm
            onChange={handlePeriodChange}
            value={queryCreatedAtFrom}
          />,
        ]}
      >
        <SearchForm onSubmit={handleSearch} value={queryKeyword} />
      </DataTableBrim>
      <DataTable
        onSelect={handleSelect}
        onOrder={handleOrder}
        data={hits}
        selectedItems={selectedItems}
        columns={columns}
        loading={isLoading}
        selectable
      />
      <DataTableBrim
        usage="footer"
        actions={[
          <PerPageSelectForm onChange={handleTakeChange} value={queryTake} />,
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

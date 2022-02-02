import { ComponentType } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../hooks';
import { BackButton } from '../back-button';
import { DataTable, DataTableBrim } from '../data-table';
import { PageTitle } from '../page-title';
import { TabNav, TabNavItemsProps } from '../tab-nav';
import {
  ActionsForm,
  SearchForm,
  PeriodsSelectForm,
  PerPageSelectForm,
} from '../forms';
import { Pagination } from '../pagiation';
import { DataTableCreateButton } from '../data-table/data-table-create-button';
import { useCatalog } from '../../hooks';
import { dynamicRoute } from '../../utils/route-utils';
import { OPTIONS_ACTIONS } from '../../constants/app/action-options-constants';
import { ENTITY_NEWS } from '../../constants/app/entity-constants';
import { NEWS_RESOURCES } from './news-resource';
import { ROUTES } from '../../constants/routes/route-constants';

export const News: ComponentType = () => {
  const r = useResponsive();
  const { t } = useTranslation();
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
    total,
    drafts,
    isLoading,
    queryPage,
    queryTake,
    queryCount,
    queryKeyword,
    queryCreatedAtFrom,
    columns,
  } = useCatalog(NEWS_RESOURCES);

  const navigation: TabNavItemsProps[] = [
    {
      label: t('all', 'Все'),
      path: dynamicRoute(ROUTES.NEWS.ROOT),
      counter: total,
    },
    {
      label: t('drafts', 'Черновики'),
      path: dynamicRoute(ROUTES.NEWS.DRAFTS),
      counter: drafts,
    },
  ];

  return (
    <Container>
      <BackButton />
      <PageTitle title={t('news', 'Новости')} />
      <Grid container mb={2} columnSpacing={2}>
        <Grid item>
          <TabNav items={navigation} />
        </Grid>
        <Grid
          item
          sx={{ marginLeft: 'auto' }}
          hidden={r({ xs: true, sm: true, md: false })}
        >
          <DataTableCreateButton entity={ENTITY_NEWS} />
        </Grid>
      </Grid>
      <DataTableBrim
        actions={[
          <DataTableCreateButton entity={ENTITY_NEWS} variant="small" />,
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

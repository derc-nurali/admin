import { ComponentType } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useResponsive, useCatalog } from '../../hooks';
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
import { MedialibCategorySelectForm } from './medialib-category-select-form';
import { OPTIONS_ACTIONS } from '../../constants/app/action-options-constants';
import { ENTITY_MEDIALIB } from '../../constants/app/entity-constants';
import { MEDIALIB_RESOURCES } from './medialib-resource';
import { dynamicRoute } from '../../utils/route-utils';
import { ROUTES } from '../../constants/routes/route-constants';

export const Medialib: ComponentType = () => {
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
    handleCategoryChange,
    selectedItems,
    hits,
    total,
    drafts,
    isLoading,
    queryPage,
    queryTake,
    queryCount,
    queryCategory,
    queryKeyword,
    queryCreatedAtFrom,
    columns,
  }: any = useCatalog(MEDIALIB_RESOURCES);

  const navigation: TabNavItemsProps[] = [
    {
      label: t('all', 'Все'),
      path: dynamicRoute(ROUTES.MEDIALIB.ROOT),
      counter: total,
    },
    {
      label: t('drafts', 'Черновики'),
      path: dynamicRoute(ROUTES.MEDIALIB.DRAFTS),
      counter: drafts,
    },
  ];

  return (
    <Container>
      <BackButton />
      <PageTitle title={t('mediaLibrary', 'Медиатека')} />
      <Grid container mb={2} columnSpacing={2}>
        <Grid item>
          <TabNav items={navigation} />
        </Grid>
        <Grid
          item
          sx={{ marginLeft: 'auto' }}
          hidden={r({ xs: true, sm: true, md: false })}
        >
          <DataTableCreateButton entity={ENTITY_MEDIALIB} />
        </Grid>
      </Grid>
      <DataTableBrim
        actions={[
          <DataTableCreateButton entity={ENTITY_MEDIALIB} variant="small" />,
          <MedialibCategorySelectForm
            onChange={handleCategoryChange}
            value={queryCategory}
          />,
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

import { ComponentType } from 'react';
import { Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../hooks';
import { BackButton } from '../back-button';
import { DataTable, DataTableBrim } from '../data-table';
import { PageTitle } from '../page-title';
import {
  SearchForm,
  PeriodsSelectForm,
  PerPageSelectForm,
  ActionsForm,
} from '../forms';
import { Pagination } from '../pagiation';
import { useCatalog } from '../../hooks';
import { FEEDBACK_RESOURCES } from './feedback-resource';
import { OPTIONS_ACTIONS } from '../../constants/app/action-options-constants';
import { TabNav, TabNavItemsProps } from '../tab-nav';
import { dynamicRoute } from '../../utils/route-utils';
import { ROUTES } from '../../constants/routes/route-constants';

export const Feedback: ComponentType = () => {
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
    isLoading,
    queryPage,
    queryTake,
    queryCount,
    queryKeyword,
    queryCreatedAtFrom,
    columns,
  } = useCatalog(FEEDBACK_RESOURCES);

  const navigation: TabNavItemsProps[] = [
    {
      label: t('all', 'Все'),
      path: dynamicRoute(ROUTES.NEWS.ROOT),
      counter: total,
    },
  ];

  return (
    <Container>
      <BackButton />
      <PageTitle title={t('feedback', 'Обратная связь')} />
      <TabNav items={navigation} />
      <DataTableBrim
        actions={[
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

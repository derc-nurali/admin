import { ComponentType } from 'react';
import { PageTitle } from '../page-title';
import {
  Button,
  Container,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../hooks';
import { useTrans } from './useTrans';
import { AppCheckbox, AppInput } from '../inputs';
import { get, map } from 'lodash';
import { SearchForm } from '../forms';
import { DataTableBrim } from '../data-table';
import { Pagination } from '../pagiation';
import { BackButton } from '../back-button';
import { IconPlus } from '../icons';
import clsx from 'clsx';
import useStyles from './styles';

export const Translations: ComponentType = () => {
  const classes = useStyles();
  const r = useResponsive();
  const { t } = useTranslation();
  const {
    locales,
    hits,
    queryPage,
    queryCount,
    selectedItems,
    handleDelete,
    handleAdd,
    handleSelectAll,
    handleSelectOne,
    handleChange,
    handleBlur,
    handlePageChange,
  } = useTrans();

  const tableHead = () => {
    const selector = (
      <TableCell padding="checkbox" key="selectAll" width="1%">
        <AppCheckbox
          onChange={handleSelectAll}
          checked={selectedItems.length === hits.length}
          size={r({ xs: 'small', sm: 'small', md: 'medium' })}
        />
      </TableCell>
    );
    const key = <TableCell key="row-key">{t('key', 'Ключ')}</TableCell>;

    const cols = [
      selector,
      key,
      ...map(locales, ({ name }, idx) => (
        <TableCell key={idx}>{name}</TableCell>
      )),
    ];

    return (
      <TableHead classes={{ root: classes.head }}>
        <TableRow classes={{ root: classes.row }}>{cols}</TableRow>
      </TableHead>
    );
  };

  const renderInput = (
    row: Record<string, string>,
    rowx: number,
    key: string
  ) => (
    <AppInput
      onBlur={(e: any) => handleBlur(row, key, e.target.value)}
      onChange={(e: any) => handleChange(rowx, key, e.target.value)}
      value={get(row, key, '')}
      variant="standard"
    />
  );

  const renderLocalesCell = (row: Record<string, string>, rowx: number) =>
    map(locales, ({ code }, idx) => {
      const key = `name${code.toUpperCase()}`;
      return (
        <TableCell key={`${rowx}-${idx}`}>
          {renderInput(row, rowx, key)}
        </TableCell>
      );
    });

  const tableBody = () => {
    const rows = map(hits, (row: Record<string, any>, idx: number) => {
      let cols: any[] = [
        <TableCell padding="checkbox" key={`select-${idx}`} width="1%">
          <AppCheckbox
            onChange={() => handleSelectOne(idx)}
            checked={selectedItems.includes(idx)}
            size={r({ xs: 'small', sm: 'small', md: 'medium' })}
          />
        </TableCell>,
        <TableCell key={`key-${idx}`}>
          {renderInput(row, idx, 'key')}
        </TableCell>,
        ...renderLocalesCell(row, idx),
      ];
      return (
        <TableRow classes={{ root: classes.row }} key={idx}>
          {cols}
        </TableRow>
      );
    });

    return <TableBody classes={{ root: classes.body }}>{rows}</TableBody>;
  };

  const header = (
    <DataTableBrim
      actions={[
        <Button
          onClick={handleAdd}
          variant="contained"
          color="info"
          size="small"
          startIcon={
            <SvgIcon
              component={IconPlus}
              viewBox="0 0 16 16"
              fontSize="small"
            />
          }
        >
          {t('add', 'Добавить')}
        </Button>,
      ]}
    >
      <SearchForm />
    </DataTableBrim>
  );

  const footer = (
    <DataTableBrim usage="footer">
      <Button
        onClick={handleDelete}
        variant="contained"
        color="error"
        size="small"
        disabled={!selectedItems.length}
      >
        {t('action.delete', 'Удалить')}
      </Button>
    </DataTableBrim>
  );

  return (
    <Container className={clsx(classes.root)}>
      <BackButton />
      <PageTitle title={t('i18n', 'Переводы')} />
      <div className={clsx(classes.view)}>
        {header}
        <Table classes={{ root: classes.table }} padding="checkbox">
          {tableHead()}
          {tableBody()}
        </Table>
        {footer}
        {queryCount > 1 && hits?.length > 0 && (
          <Pagination
            onChange={handlePageChange}
            page={queryPage}
            count={queryCount}
            showFirstButton={r({ xs: false, sm: false, md: true })}
            showLastButton={r({ xs: false, sm: false, md: true })}
          />
        )}
      </div>
    </Container>
  );
};

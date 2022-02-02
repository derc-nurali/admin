import {
  Grid,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { isEmpty, map, get } from 'lodash';
import { ComponentType, ReactNode, useEffect, useState } from 'react';
import useStyles from './styles';
import { AppCheckbox } from '../inputs';
import clsx from 'clsx';
import { useResponsive } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { Loader } from '../loader';
import { IconSort } from '../icons';

export interface DataTableColumnsProps {
  label: string;
  labelKey: string;
  dataKey: string;
  width?: string | number;
  sortable?: boolean;
  renderItem?: (item: any, idx: number) => ReactNode | string | number;
}

interface DataTableProps {
  className?: string;
  data: any[];
  columns?: DataTableColumnsProps[];
  selectable?: boolean;
  selectedItems?: any[];
  loading?: boolean;
  onSelect?: (idxs: number[]) => void;
  onOrder?: (field: string) => void;
}

export const DataTable: ComponentType<DataTableProps> = ({
  className,
  data = [],
  columns,
  selectable = false,
  selectedItems = [],
  loading = false,
  onSelect,
  onOrder,
}) => {
  const classes = useStyles();
  const r = useResponsive();
  const { t } = useTranslation();
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedItems.length) setIsAllSelected(false);
  }, [selectedItems]);

  const handleOrder = (field: string) => {
    if (onOrder) onOrder(field);
  };

  const handleSelect = (idx: number) => {
    const selected = [...selectedItems];
    if (selected.includes(idx)) {
      const index = selected.findIndex((x) => x === idx);
      selected.splice(index, 1);
    } else {
      selected.push(idx);
    }

    if (selected.length !== data.length) setIsAllSelected(false);
    if (onSelect) onSelect(selected);
  };

  const handleSelectAll = (e: any) => {
    setIsAllSelected(e.target.checked);
    let selected: number[] = [];
    if (e.target.checked) {
      selected = map(data, (item, idx) => idx);
    }
    if (onSelect) onSelect(selected);
  };

  const tablePlaceholder = (status: string) => {
    let colSpan = columns?.length ? columns?.length : 1;
    if (selectable) colSpan++;

    return (
      <TableBody classes={{ root: classes.body }}>
        <TableRow>
          <TableCell colSpan={colSpan} className={clsx(classes.placeholder)}>
            {status === 'loading' && <Loader />}
            {status === 'empty' && (
              <Typography variant="subtitle1" component="div">
                {t('noResults', 'По вашему запросу ничего не найдено')}
              </Typography>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  const tableHead = () => {
    if (isEmpty(columns)) return null;

    let cols: any[] = [];
    if (selectable) {
      cols = [
        <TableCell padding="checkbox" key="selectAll">
          <AppCheckbox
            onChange={handleSelectAll}
            checked={isAllSelected}
            size={r({ xs: 'small', sm: 'small', md: 'medium' })}
          />
        </TableCell>,
      ];
    }
    cols = [
      ...cols,
      ...map(columns, ({ label, labelKey, width, sortable, dataKey }, idx) => {
        const th = t(labelKey, label);
        return (
          <TableCell width={width} key={idx}>
            {sortable ? (
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                flexWrap="nowrap"
              >
                <Grid item>{th}</Grid>
                <Grid item>
                  <IconButton onClick={() => handleOrder(dataKey)} color="info">
                    <SvgIcon
                      component={IconSort}
                      viewBox="0 0 16 12"
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              th
            )}
          </TableCell>
        );
      }),
    ];

    return (
      <TableHead classes={{ root: classes.head }}>
        <TableRow classes={{ root: classes.row }}>{cols}</TableRow>
      </TableHead>
    );
  };

  const tableBody = () => {
    if (isEmpty(columns) || !columns?.length) return null;

    const rows = map(data, (item, idx) => {
      let cols: any[] = [];
      if (selectable) {
        cols = [
          <TableCell padding="checkbox" key={`select-${idx}`}>
            <AppCheckbox
              onChange={() => handleSelect(idx)}
              checked={selectedItems.includes(idx)}
              size={r({ xs: 'small', sm: 'small', md: 'medium' })}
            />
          </TableCell>,
        ];
      }

      const items = map(columns, ({ dataKey, renderItem }, colx) => {
        if (renderItem) {
          return <TableCell key={colx}>{renderItem(item, idx)}</TableCell>;
        }
        return <TableCell key={colx}>{get(item, dataKey, null)}</TableCell>;
      });

      cols = [...cols, ...items];

      return (
        <TableRow classes={{ root: classes.row }} key={idx}>
          {cols}
        </TableRow>
      );
    });

    return <TableBody classes={{ root: classes.body }}>{rows}</TableBody>;
  };

  if (loading) {
    return (
      <Table classes={{ root: classes.root }} className={clsx(className)}>
        {tableHead()}
        {tablePlaceholder('loading')}
      </Table>
    );
  }

  if (isEmpty(data)) {
    return (
      <Table classes={{ root: classes.root }} className={clsx(className)}>
        {tableHead()}
        {tablePlaceholder('empty')}
      </Table>
    );
  }

  return (
    <div className={clsx(classes.root)}>
      <Table classes={{ root: classes.table }} className={clsx(className)}>
        {tableHead()}
        {tableBody()}
      </Table>
    </div>
  );
};

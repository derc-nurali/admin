import { ComponentType, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import { findIndex, get, map } from 'lodash';
import { Button, Grid, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';
import { IconCheckboxChecked } from '../icons';
import useStyles from './styles';
import { useLanguage } from '../../hooks';

interface NodeArchiveProps {
  apiService: any;
  displayField: string;
  className?: string;
  selectable?: boolean;
  single?: boolean;
  locale?: string;
  onSelect?: (ids: any) => void;
}

export const Archive: ComponentType<NodeArchiveProps> = ({
  apiService,
  displayField,
  className,
  selectable = false,
  single = false,
  locale,
  onSelect,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { currentLocale } = useLanguage();
  const [hits, setHits] = useState<any[]>([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<string[]>([]);

  const handleFetch = (page: any = 1) => {
    setPage(page);
    setSelected([]);
    const take = 24;
    const skip = (page - 1) * take;
    const embed = 'cover';
    const language = locale ? locale : currentLocale;
    const params: Record<string, any> = { take, skip, embed, language };
    apiService.fetchAll(params).then(({ hits, total }: any) => {
      setTotal(total);
      setHits((prev) => {
        return [...prev, ...hits];
      });
    });
  };

  const handleSelect = (id: string) => {
    if (!selectable) return;
    let newSelected = [...selected];

    if (selected.includes(id)) {
      const idx = findIndex(selected, (x) => x === id);
      newSelected.splice(idx, 1);
    } else {
      if (single) {
        newSelected = [id];
      } else {
        newSelected = [...newSelected, id];
      }
    }
    setSelected(newSelected);
  };

  const handleSubmit = () => {
    setSelected([]);
    if (onSelect) {
      if (single) {
        onSelect(get(selected, [0], null));
      } else {
        onSelect(selected);
      }
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = map(hits, ({ id, ...item }: any, idx: number) => {
    const cover = get(item, 'cover.thumbnails.medium_c.url', null);
    const title = get(item, displayField, 'Неверное поле displayField');

    return (
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={idx}>
        <div
          onClick={() => handleSelect(id)}
          className={clsx(classes.node, {
            [classes.nodeSelected]: selected.includes(id),
          })}
          role={selectable ? 'button' : 'none'}
        >
          {cover && <img src={cover} alt="" />}
          {selected.includes(id) && (
            <SvgIcon
              className={clsx(classes.icon)}
              component={IconCheckboxChecked}
              viewBox="0 0 24 24"
              color="info"
            />
          )}
          <div className={clsx(classes.footer)}>{title}</div>
        </div>
      </Grid>
    );
  });

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.rootSelectable]: selectable,
      })}
    >
      <div className={clsx(classes.brim)}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="info"
          size="small"
        >
          {t('choose', 'Выбрать')}
        </Button>
      </div>
      <div id="scrollableDiv" className={clsx(classes.container)}>
        <InfiniteScroll
          dataLength={hits?.length}
          next={() => handleFetch(page + 1)}
          hasMore={hits?.length > 0 && total !== hits.length}
          loader="..."
          scrollableTarget="scrollableDiv"
        >
          <Grid container spacing={2}>
            {items}
          </Grid>
        </InfiniteScroll>
      </div>
      <div className={clsx(classes.brim)}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="info"
          size="small"
        >
          {t('choose', 'Выбрать')}
        </Button>
      </div>
    </div>
  );
};

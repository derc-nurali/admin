import { ComponentType, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import { map, findIndex, get } from 'lodash';
import { Button, Grid, SvgIcon } from '@material-ui/core';
import { ApiMedia } from '../../../http';
import { IconCheckboxChecked } from '../../icons';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

interface MedialibArchiveProps {
  className?: string;
  selectable?: boolean;
  single?: boolean;
  onSelect?: (ids: any) => void;
}

export const MedialibArchive: ComponentType<MedialibArchiveProps> = ({
  className,
  selectable = false,
  single = false,
  onSelect,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [hits, setHits] = useState<any[]>([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<string[]>([]);

  const handleFetch = (page: any = 1) => {
    setPage(page);
    setSelected([]);
    const take = 24;
    const skip = (page - 1) * take;
    const mimetype = 'application/octet-stream';
    const params = { take, skip, mimetype };
    ApiMedia.fetchAll(params).then(({ hits, total }: any) => {
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

  const items = map(hits, ({ id, thumbnails }: any, idx: number) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
      <div
        onClick={() => handleSelect(id)}
        className={clsx(classes.preview, {
          [classes.previewSelected]: selected.includes(id),
        })}
        role={selectable ? 'button' : 'none'}
      >
        <img src={thumbnails?.medium_c?.url} alt="" />
        {selected.includes(id) && (
          <SvgIcon
            className={clsx(classes.icon)}
            component={IconCheckboxChecked}
            viewBox="0 0 24 24"
            color="info"
          />
        )}
      </div>
    </Grid>
  ));

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

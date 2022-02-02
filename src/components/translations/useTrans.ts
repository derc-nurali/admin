import { useDialog, useLanguage, useRouter } from '../../hooks';
import { ConfirmDialog, TranslationKeyDialog } from '../dialogs';
import { useTranslation } from 'react-i18next';
import { ApiTranslations } from '../../http';
import { useEffect, useState } from 'react';
import { set, get, map, isEmpty } from 'lodash';

const API_DEFAULT_PAGE = 1;
const API_DEFAULT_TAKE = 20;

export const useTrans = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { locales } = useLanguage();
  const [openAdd] = useDialog(TranslationKeyDialog);
  const [openConfirmation] = useDialog(ConfirmDialog);
  const [hits, setHits] = useState<any[]>([]);
  const [isHitsFetching, setIsHitsFetching] = useState<boolean>(false);
  const [total, setTotal] = useState<any>(0);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const queryPage = parseInt(get(router.query, 'page', API_DEFAULT_PAGE));
  const queryTake = parseInt(get(router.query, 'take', API_DEFAULT_TAKE));
  const queryCount = Math.ceil(total / queryTake);

  const handleFetch = () => {
    const page = get(router.query, 'page', API_DEFAULT_PAGE);
    const take = get(router.query, 'take', API_DEFAULT_TAKE);
    const skip = (page - 1) * take;
    const order = 'id';

    const params = {
      page,
      take,
      skip,
      order,
      ...router.query,
    };

    setIsHitsFetching(true);
    ApiTranslations.fetchAll(params)
      .then(({ hits, total }) => {
        setTotal(total);
        setHits(hits);
      })
      .finally(() => {
        setIsHitsFetching(false);
      });
  };

  const handleCreate = (key: string, type = 'common') => {
    ApiTranslations.createOne({ key, type }).then(() => handleFetch());
  };

  const handleUpdate = (id: string, hit: Record<string, any>) => {
    ApiTranslations.updateOne(id, hit);
  };

  const handleDelete = () => {
    if (isEmpty(selectedItems)) return;

    let ids: any[] = [];
    openConfirmation({
      resolve: () => {
        Promise.all(
          map(selectedItems, async (idx) => {
            const id = get(hits[idx], 'id', null);
            ids = [...ids, id];
            return await ApiTranslations.deleteOne(id);
          })
        ).then(() => {
          handleFetch();
          setSelectedItems([]);
        });
      },
    });
  };

  const handleAdd = () => {
    openAdd({
      title: t('key.new', 'Новый ключ'),
      onSubmit: handleCreate,
    });
  };

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      const idxs = map(hits, (item, idx) => idx);
      setSelectedItems(idxs);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectOne = (idx: number) => {
    const selected = [...selectedItems];
    if (selected.includes(idx)) {
      const index = selected.findIndex((x) => x === idx);
      selected.splice(index, 1);
    } else {
      selected.push(idx);
    }
    setSelectedItems(selected);
  };

  const handleChange = (idx: number, key: string, value: string) => {
    setHits((prev: any[]) => {
      const hits = { ...prev };
      set(hits, [idx, key], value);
      return hits;
    });
  };

  const handleBlur = (row: Record<string, any>, key: string, value: string) => {
    const hit = { ...row, [key]: value };
    handleUpdate(hit.id, hit);
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
    if (!isHitsFetching) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return {
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
  };
};

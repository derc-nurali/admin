import moment from 'moment';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { ConfirmDialog } from '../components/dialogs';
import { useLanguage } from './useLanguage';
import { useRouter } from './useRouter';
import { useSnackbar } from './useSnackbar';
import { useDialog } from './useDialog';
import { get, set, map, isEmpty, findIndex } from 'lodash';
import { FormikValues } from 'formik/dist/types';
import { EntityProps } from '../constants/app/entity-constants';
import { DataTableColumnsProps } from '../components/data-table';
import { ApiLanguageLinks } from '../http';
import {
  API_DEFAULT_PAGE,
  API_DEFAULT_TAKE,
} from '../constants/app/size-constants';
import { DATE_FORMAT } from '../constants/app/action-options-constants';
import {
  CONTROL_ACTION_DELETE,
  CONTROL_ACTION_DRAFTS,
  CONTROL_ACTION_PUBLISH,
} from '../constants/app/control-actions-constants';

export interface UseCatalogProps {
  apiService: any;
  entity: EntityProps;
  route: Record<string, any>;
  defaultQuery: Record<string, any>;
  getCatalog: (params: Record<string, any>) => void;
  getCounts: (locale: string, force?: boolean) => void;
  columns: DataTableColumnsProps[];
}

export const useCatalog = ({
  apiService,
  entity,
  route,
  getCatalog,
  getCounts,
  defaultQuery,
  columns,
}: UseCatalogProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentLocale } = useLanguage();
  const { showMessage } = useSnackbar();
  const [openConfirmation] = useDialog(ConfirmDialog);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const { catalog, counts } = useSelector(
    (state: RootStateOrAny) => state[entity]
  );

  const hits = get(catalog, 'hits', []);
  const isLoading = get(catalog, 'isLoading', false);
  const total = get(counts, [currentLocale, 'total'], 0);
  const drafts = get(counts, [currentLocale, 'drafts'], 0);

  const queryPage = parseInt(get(router.query, 'page', API_DEFAULT_PAGE));
  const queryTake = parseInt(get(router.query, 'take', API_DEFAULT_TAKE));
  const queryCount = Math.ceil(total / queryTake);
  const queryCategory = get(router.query, 'category', '');
  const queryKeyword = get(router.query, 'search', '');
  const queryCreatedAtFrom = get(router.query, 'createdAtFrom', '');

  const handleFetch = () => {
    const page = get(router.query, 'page', API_DEFAULT_PAGE);
    const take = get(router.query, 'take', API_DEFAULT_TAKE);
    const skip = (page - 1) * take;
    const isActive = router.asPath === route.DRAFTS ? 0 : 1;
    const language = currentLocale;

    const params = {
      page,
      take,
      skip,
      isActive,
      language,
      ...defaultQuery,
      ...router.query,
    };
    getCatalog(params);
  };

  const init = useCallback(() => {
    if (!isLoading) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const reveal = useCallback(() => {
    getCounts(currentLocale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentLocale]);

  const request = useCallback((params: Record<string, any>) => {
    router.push({
      pathname: router.pathname,
      search: '?' + new URLSearchParams(params),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (idxs: number[]) => {
    setSelectedItems(idxs);
  };

  const handleOrder = (field: string) => {
    const params = { ...router.query };
    const orderedField = get(params, 'order', null);
    if (field === orderedField) {
      set(params, 'order', `-${field}`);
    } else {
      set(params, 'order', field);
    }
    request(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleSearch = ({ search }: FormikValues) => {
    if (search) {
      request({ search });
    } else {
      request({});
    }
  };

  const handlePageChange = (e: any, page: number) => {
    const params = { ...router.query };
    set(params, 'page', page);
    request(params);
  };

  const handleTakeChange = (take: number) => {
    const params = { ...router.query };
    set(params, 'page', API_DEFAULT_PAGE);
    set(params, 'take', take);
    request(params);
  };

  const handlePeriodChange = (createdAtFrom: string) => {
    const params: any = { ...router.query };
    set(params, 'page', API_DEFAULT_PAGE);
    if (createdAtFrom) {
      const createdAtTo = moment(createdAtFrom, DATE_FORMAT)
        .endOf('month')
        .format(DATE_FORMAT);
      set(params, 'createdAtFrom', createdAtFrom);
      set(params, 'createdAtTo', createdAtTo);
    } else {
      delete params['createdAtFrom'];
      delete params['createdAtTo'];
    }
    request(params);
  };

  const handleCategoryChange = (value: string) => {
    const params: any = { ...router.query };
    set(params, 'page', API_DEFAULT_PAGE);
    set(params, 'category', value);
    request(params);
  };

  const handleUnlink = (ids: any[]) => {
    for (const id of ids) {
      ApiLanguageLinks.fetchOne(entity, id).then(({ links }) => {
        const idx = findIndex(Object.values(links), (x) => x === id);
        const locale = Object.keys(links)[idx];
        if (locale && links[locale]) {
          delete links[locale];
          if (!isEmpty(links)) ApiLanguageLinks.createOne({ entity, links });
        }
      });
    }
  };

  const handleAfterAction = () => {
    setSelectedItems([]);
    handleFetch();
    getCounts(currentLocale, true);
  };

  const handleDelete = (idxs: any[]) => {
    if (isEmpty(idxs)) return;

    let ids: any[] = [];
    openConfirmation({
      resolve: () => {
        Promise.all(
          map(idxs, async (idx) => {
            const id = get(hits[idx], 'id', null);
            ids = [...ids, id];
            return await apiService.deleteOne(id);
          })
        ).then(() => {
          handleAfterAction();
          handleUnlink(ids);
        });
      },
    });
  };

  const handlePublishStatus = (idxs: any[], isActive: boolean = false) => {
    if (isEmpty(idxs)) return;

    openConfirmation({
      resolve: () => {
        Promise.all(
          map(idxs, async (idx) => {
            return await apiService.patchOne(hits[idx]['id'], { isActive });
          })
        ).then(handleAfterAction);
      },
    });
  };

  const handleAction = ({ action }: FormikValues) => {
    switch (action) {
      case CONTROL_ACTION_DELETE:
        handleDelete(selectedItems);
        break;
      case CONTROL_ACTION_DRAFTS:
        handlePublishStatus(selectedItems, false);
        break;
      case CONTROL_ACTION_PUBLISH:
        handlePublishStatus(selectedItems, true);
        break;
      default:
        showMessage(`${action} действие не выбрано`);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    reveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    init,
    reveal,
    request,
    handleOrder,
    handleSelect,
    handleSearch,
    handleAction,
    handlePageChange,
    handleTakeChange,
    handlePeriodChange,
    handleCategoryChange,
    selectedItems,
    hits,
    isLoading,
    counts,
    total,
    drafts,
    queryPage,
    queryTake,
    queryCount,
    queryCategory,
    queryKeyword,
    queryCreatedAtFrom,
    columns,
  };
};

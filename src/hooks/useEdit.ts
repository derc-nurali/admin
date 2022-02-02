import { useEffect, useState } from 'react';
import { set, get, forEach, isEmpty, map, omitBy, findIndex } from 'lodash';
import { TabNavItemsProps } from '../components/tab-nav';
import { EntityProps } from '../constants/app/entity-constants';
import { useRouter } from './useRouter';
import { useSnackbar } from './useSnackbar';
import { useLanguage } from './useLanguage';
import { ApiLanguageLinks } from '../http';
import { DEFAULT_LOCALE } from '../constants/app/locales-constants';
import {
  FIELD_COLOR_START,
  FIELD_COLORS,
  FIELD_DESCRIPTION,
  FIELD_LEX_ITEMS,
} from '../constants/app/fields-constants';
import { dynamicRoute } from '../utils/route-utils';
import { useDialog } from './useDialog';
import { ConfirmDialog } from '../components/dialogs';

export interface UseEditProps {
  apiService: any;
  entity: EntityProps;
  route: Record<string, any>;
  getCounts: (locale: string, force?: boolean) => void;
}

export const useEdit = ({
  apiService,
  entity,
  route,
  getCounts,
}: UseEditProps) => {
  const router: any = useRouter();
  const { currentLocale, locales } = useLanguage();
  const { showMessage } = useSnackbar();
  const [openConfirmation] = useDialog(ConfirmDialog);
  const [payload, setPayload] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [activeLangIdx, setActiveLangIdx] = useState(2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [langLinks, setLangLinks] = useState<any>({});

  const activeLangCode = get(locales, [activeLangIdx, 'code'], DEFAULT_LOCALE);
  const activePayload = get(payload, activeLangCode, {});
  const activeErrors = get(errors, activeLangCode, {});

  const getErrors = (field: string) => {
    if (field === FIELD_LEX_ITEMS) {
      return (
        get(activeErrors, [`${field}.0.id`, 0], '') ||
        get(activeErrors, [field, 0], '')
      );
    }
    return get(activeErrors, [field, 0], '');
  };

  const baseFieldProps = (field: string) => ({
    error: !!getErrors(field),
    helperText: getErrors(field),
    key: activeLangIdx,
  });

  const inputProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(activePayload, field, ''),
    onChange: (e: any) => handleFieldChange(field, e.target.value),
  });

  const numberProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(activePayload, field, ''),
    type: 'number',
    onChange: (e: any) => {
      const val = e.target.value;
      if (Number.isInteger(parseInt(val))) {
        handleFieldChange(field, parseInt(val));
      } else {
        handleFieldChange(field, val);
      }
    },
  });

  const booleanProps = (field: string) => ({
    checked: get(activePayload, field, false),
    key: activeLangIdx,
    onChange: (e: any) => {
      handleFieldChange(field, e.target.checked);
    },
  });

  const dateProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(activePayload, field, ''),
    onChange: (value: any) => {
      if (value) {
        handleFieldChange(field, new Date(value).toISOString());
      } else {
        handleFieldChange(field, null);
      }
    },
  });

  const selectProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(activePayload, field, ''),
    onChange: (value: any) => handleFieldChange(field, value),
  });

  const tagsProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(activePayload, field, []),
    onChange: (value: any) => handleFieldChange(field, value),
  });

  const repeaterProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(activePayload, field, []),
    onChange: (value: any) => handleFieldChange(field, value),
  });

  const colorsProps = (field: string, defaultColor: string = '#2A5298') => ({
    ...baseFieldProps(field),
    value:
      field === FIELD_COLOR_START
        ? get(activePayload, [FIELD_COLORS, 0], defaultColor)
        : get(activePayload, [FIELD_COLORS, 1], defaultColor),
    onChange: (e: any) => {
      const value = e.target.value;
      setPayload((prev) => {
        const langPayload: any = get(prev, activeLangCode, {});
        const idx = field === FIELD_COLOR_START ? 0 : 1;
        set(langPayload, ['colors', idx], value);
        return { ...prev, [activeLangCode]: langPayload };
      });
    },
  });

  const handleFieldChange = (field: string, value: any) => {
    if (activeLangCode) {
      setPayload((prev) => {
        const langPayload: any = get(prev, activeLangCode, {});
        langPayload[field] = value;
        return { ...prev, [activeLangCode]: langPayload };
      });

      setErrors((prev) => {
        const localeErrors = { ...prev[activeLangCode] };
        if (field === FIELD_LEX_ITEMS) {
          delete localeErrors['lexItems.0.id'];
          delete localeErrors[field];
        } else {
          delete localeErrors[field];
        }
        return { ...prev, [activeLangCode]: localeErrors };
      });
    }
  };

  const handleFetch = (id: string | number) => {
    return new Promise((resolve, reject) => {
      apiService
        .fetchOne(id)
        .then((res: any) => {
          setPayload((prev) => {
            return { ...prev, [res.language]: res };
          });
          resolve(res);
        })
        .catch(reject);
    });
  };

  const handleEdit = (id: string | number, values: any, locale: string) => {
    return new Promise((resolve, reject) => {
      apiService
        .updateOne(id, values)
        .then((res: any) => {
          setPayload((prev) => {
            return { ...prev, [locale]: res };
          });
          resolve(res);
        })
        .catch((e: any) => {
          const { statusCode, message } = e;
          const body =
            statusCode !== 413 ? message : { [FIELD_DESCRIPTION]: [message] };
          setErrors((prev) => {
            return { ...prev, [locale]: body };
          });
          reject({ ...e, locale });
        });
    });
  };

  const handleCreate = (values: any, locale: string) => {
    values.language = locale;
    return new Promise((resolve, reject) => {
      apiService
        .createOne(values)
        .then(async (res: any) => {
          setPayload((prev) => {
            return { ...prev, [locale]: res };
          });
          resolve(res);
        })
        .catch((e: any) => {
          const { statusCode, message } = e;
          const body =
            statusCode !== 413 ? message : { [FIELD_DESCRIPTION]: [message] };
          setErrors((prev) => {
            return { ...prev, [locale]: body };
          });
          reject({ ...e, locale });
        });
    });
  };

  const handleDelete = (id: string | number) => {
    openConfirmation({
      resolve: () => {
        setIsSubmitting(true);
        setErrors({});
        apiService
          .deleteOne(id)
          .then(() => handleUnlink(id))
          .finally(() => {
            showMessage('Данные успешно удалены');
            setIsSubmitting(false);
            getCounts(currentLocale, true);
            router.push(dynamicRoute(route.ROOT));
          });
      },
    });
  };

  const handleUnlink = (id: string | number) => {
    ApiLanguageLinks.fetchOne(entity, id).then(({ links }) => {
      const idx = findIndex(Object.values(links), (x) => x === Number(id));
      const locale = Object.keys(links)[idx];
      if (locale && links[locale]) {
        delete links[locale];
        if (!isEmpty(links)) ApiLanguageLinks.createOne({ entity, links });
      }
    });
  };

  const handleLangSelect = (idx: number) => {
    if (idx === activeLangIdx) return;
    setErrors({});
    const omittedPayload = omitBy(activePayload, (a) => !a);

    if (isEmpty(omittedPayload)) {
      setActiveLangIdx(idx);
      return;
    }

    const { id } = activePayload;
    if (!langLinks[activeLangCode] && activePayload.id) {
      handleEdit(id, activePayload, activeLangCode).then((res: any) => {
        handleSetAndSaveLinks(res.id, activeLangCode);
        setActiveLangIdx(idx);
      });
    } else if (!langLinks[activeLangCode]) {
      handleCreate(activePayload, activeLangCode).then((res: any) => {
        handleSetAndSaveLinks(res.id, activeLangCode);
        setActiveLangIdx(idx);
      });
    } else {
      handleEdit(id, activePayload, activeLangCode).then(() => {
        setActiveLangIdx(idx);
      });
    }
  };

  const handleCreateLinks = (links: any) => {
    return new Promise((resolve, reject) => {
      ApiLanguageLinks.createOne({ entity, links }).then(resolve).catch(reject);
    });
  };

  const handleSetAndSaveLinks = (id: string | number, locale: string) => {
    const links = set(langLinks, [locale], id);
    setLangLinks(links);
    return handleCreateLinks(links);
  };

  const handleFetchLinks = (id: string | number) => {
    return new Promise((resolve, reject) => {
      ApiLanguageLinks.fetchOne(entity, id)
        .then((res) => {
          setLangLinks(res.links);
          resolve(res);
        })
        .catch(reject);
    });
  };

  const handleFetchLinksPayload = (links: any) => {
    const locales = Object.keys(links);
    return Promise.all(
      map(locales, async (locale: string) => await handleFetch(links[locale]))
    );
  };

  const handlePayloadByLang = (values: any, locale: string) => {
    setPayload((prev) => {
      return { ...prev, [locale]: values };
    });
  };

  const handleSubmit = (isActive: boolean = false) => {
    setIsSubmitting(true);
    setErrors({});
    const locales = Object.keys(payload);

    Promise.all(
      map(locales, async (locale) => {
        const p = set(payload[locale], 'isActive', isActive);
        const { id } = p;
        if (id) {
          return await handleEdit(id, p, locale);
        } else {
          return await handleCreate(p, locale);
        }
      })
    )
      .then((res) => {
        let links: any = {};
        forEach(res, (p: any) => {
          const { id, language } = p;
          if (id && language) links[language] = id;
        });
        handleCreateLinks(links).finally(() => {
          showMessage('Данные успешно сохранены');
          setIsSubmitting(false);
          router.push(dynamicRoute(route.ROOT));
        });
        getCounts(currentLocale, true);
      })
      .catch(() => {
        showMessage('Ошибка валидации');
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const values = get(payload, activeLangCode, {});
    const id = langLinks[activeLangCode];
    if (id && isEmpty(values)) {
      handleFetch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLangIdx]);

  useEffect(() => {
    const landIdx = findIndex(locales, (x: any) => x.code === currentLocale);
    setActiveLangIdx(landIdx);
  }, [currentLocale, locales]);

  useEffect(() => {
    if (router?.query?.id) {
      const { id } = router.query;
      handleFetchLinks(id).then(async ({ links }: any) => {
        if (!isEmpty(links)) {
          try {
            await handleFetchLinksPayload(links);
          } catch (e) {}
        } else {
          try {
            await handleFetch(id);
          } catch (e) {}
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const langsNavigation: TabNavItemsProps[] = map(locales, (locale) => ({
    label: get(locale, 'name', 'Не ивестный язык'),
    onClick: handleLangSelect,
  }));

  return {
    payload,
    activePayload,
    errors,
    activeErrors,
    activeLangIdx,
    activeLangCode,
    langLinks,
    isLoading,
    isSubmitting,
    langsNavigation,
    baseFieldProps,
    inputProps,
    booleanProps,
    numberProps,
    dateProps,
    selectProps,
    tagsProps,
    repeaterProps,
    colorsProps,
    handleFieldChange,
    handleFetch,
    handleEdit,
    handleCreate,
    handleDelete,
    handleLangSelect,
    handleFetchLinksPayload,
    handlePayloadByLang,
    handleSubmit,
  };
};

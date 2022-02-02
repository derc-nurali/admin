import { useRouter } from './useRouter';
import { useSnackbar } from './useSnackbar';
import { useEffect, useState } from 'react';
import { get, set, cloneDeep } from 'lodash';
import { dynamicRoute } from '../utils/route-utils';
import { FIELD_DESCRIPTION } from '../constants/app/fields-constants';
import { ROUTE_BY_ENTITY } from '../constants/routes/route-by-entity-constants';
import { useDialog } from './useDialog';
import { ConfirmDialog } from '../components/dialogs';

export const useDetails = (entity: string, ApiService: any) => {
  const router: any = useRouter();
  const { showMessage } = useSnackbar();
  const [openConfirmation] = useDialog(ConfirmDialog);
  const [payload, setPayload] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const route = ROUTE_BY_ENTITY[entity];

  const getErrors = (field: string) => {
    return get(errors, [field, 0], '');
  };

  const baseFieldProps = (field: string) => ({
    error: !!getErrors(field),
    helperText: getErrors(field),
  });

  const inputProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(payload, field, ''),
    onChange: (e: any) => handleFieldChange(field, e.target.value),
  });

  const numberProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(payload, field, ''),
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

  const selectProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(payload, field, ''),
    onChange: (value: any) => handleFieldChange(field, value),
  });

  const tagsProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(payload, field, []),
    onChange: (value: any) => handleFieldChange(field, value),
  });

  const repeaterProps = (field: string) => ({
    ...baseFieldProps(field),
    value: get(payload, field, []),
    onChange: (value: any) => handleFieldChange(field, value),
  });

  const handleFieldChange = (field: string, value: any) => {
    setPayload((prev) => {
      const p = cloneDeep(prev);
      set(p, field, value);
      return p;
    });
    setErrors((prev) => {
      const err = cloneDeep(prev);
      set(err, field, null);
      return err;
    });
  };

  const handleFetch = (id: string | number) => {
    return new Promise((resolve, reject) => {
      ApiService.fetchOne(id)
        .then((res: any) => {
          setPayload(res);
          resolve(res);
        })
        .catch(reject);
    });
  };

  const handleEdit = (id: string | number, values: any) => {
    return new Promise((resolve, reject) => {
      ApiService.updateOne(id, values)
        .then(resolve)
        .catch((e: any) => {
          const { statusCode, message } = e;
          const body =
            statusCode !== 413 ? message : { [FIELD_DESCRIPTION]: [message] };
          setErrors(body);
          reject(e);
        });
    });
  };

  const handleCreate = (values: any) => {
    return new Promise((resolve, reject) => {
      ApiService.createOne(values)
        .then(resolve)
        .catch((e: any) => {
          const { statusCode, message } = e;
          const body =
            statusCode !== 413 ? message : { [FIELD_DESCRIPTION]: [message] };
          setErrors(body);
          reject(e);
        });
    });
  };

  const handleDelete = (id: string | number) => {
    openConfirmation({
      resolve: () => {
        setIsSubmitting(true);
        setErrors({});
        ApiService.deleteOne(id).finally(() => {
          showMessage('Данные успешно удалены');
          setIsSubmitting(false);
          router.push(dynamicRoute(route.ROOT));
        });
      },
    });
  };

  const handleSuccess = () => {
    showMessage('Данные успешно сохранены');
    setIsSubmitting(false);
    router.push(dynamicRoute(route.ROOT));
  };

  const handleError = () => {
    showMessage('Ошибка валидации');
    setIsSubmitting(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setErrors({});

    if (payload.id) {
      handleEdit(payload.id, payload).then(handleSuccess).catch(handleError);
    } else {
      handleCreate(payload).then(handleSuccess).catch(handleError);
    }
  };

  useEffect(() => {
    if (router?.query?.id) {
      handleFetch(router.query.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query?.id]);

  return {
    payload,
    errors,
    isSubmitting,
    inputProps,
    numberProps,
    selectProps,
    tagsProps,
    repeaterProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  };
};

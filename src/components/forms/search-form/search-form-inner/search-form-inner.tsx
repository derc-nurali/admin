import { ComponentType } from 'react';
import clsx from 'clsx';
import { AppFieldControlProps, AppInput } from '../../../inputs';
import { InputProps, SvgIcon } from '@material-ui/core';
import { IconSearch } from '../../../icons';
import { FormikValues } from 'formik/dist/types';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { FIELD_SEARCH } from '../../../../constants/app/fields-constants';

export interface SearchFormInnerProps {
  className?: string;
  inputProps?: InputProps & AppFieldControlProps;
  value?: any;
  onSubmit?: (values: FormikValues) => void;
}

const VALIDATION_SCHEMA = yup.object().shape({
  [FIELD_SEARCH]: yup.string().trim(),
});

export const SearchFormInner: ComponentType<SearchFormInnerProps> = ({
  className,
  inputProps,
  value = '',
  onSubmit,
}) => {
  const { t } = useTranslation();

  const handleSubmit = (values: FormikValues) => {
    if (onSubmit) onSubmit(values);
  };

  const formik = useFormik({
    initialValues: {
      [FIELD_SEARCH]: value,
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={clsx(className)}>
      <AppInput
        size="small"
        placeholder={t('search', 'Поиск')}
        endAdornment={<SvgIcon component={IconSearch} viewBox="0 0 16 16" />}
        {...{ ...inputProps, ...formik.getFieldProps(FIELD_SEARCH) }}
      />
      <button style={{ display: 'none' }} type="submit" aria-label="hidden">
        {t('action.search', 'Искать')}
      </button>
    </form>
  );
};

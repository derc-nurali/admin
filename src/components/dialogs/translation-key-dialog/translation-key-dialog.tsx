import { ComponentType } from 'react';
import { Button, Grid } from '@material-ui/core';
import { AppDialog, DialogProps } from '../app-dialog';
import { FormikValues } from 'formik/dist/types';
import { useFormik } from 'formik';
import { AppInput } from '../../inputs';
import { useTranslation } from 'react-i18next';
import {
  FIELD_KEY,
  FIELD_SEARCH,
} from '../../../constants/app/fields-constants';
import * as yup from 'yup';
import clsx from 'clsx';

interface TranslationKeyDialogProps extends DialogProps {
  className?: string;
  onSubmit?: (e: any) => void;
}

const VALIDATION_SCHEMA = yup.object().shape({
  [FIELD_KEY]: yup.string().required().trim(),
});

export const TranslationKeyDialog: ComponentType<TranslationKeyDialogProps> = ({
  className,
  onSubmit,
  popDialog,
  ...props
}) => {
  const { t } = useTranslation();

  const handleSubmit = (values: FormikValues) => {
    if (onSubmit) onSubmit(values[FIELD_KEY]);
    popDialog();
  };

  const formik = useFormik({
    initialValues: {
      [FIELD_SEARCH]: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit,
  });

  return (
    <AppDialog {...{ ...props, popDialog }}>
      <form onSubmit={formik.handleSubmit} className={clsx(className)}>
        <AppInput
          size="small"
          placeholder={t('key', 'Ключ')}
          {...formik.getFieldProps(FIELD_KEY)}
        />
        <Grid container justifyContent="flex-end" spacing={2} mt={0.5}>
          <Grid item>
            <Button type="button" size="small">
              {t('action.cancel', 'Отменить')}
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="info" size="small">
              {t('add', 'submit')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </AppDialog>
  );
};

import { ComponentType } from 'react';
import * as yup from 'yup';
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  InputProps,
  SvgIcon,
} from '@material-ui/core';
import {
  AppSelect,
  AppFieldControlProps,
  AppSelectOptionProps,
} from '../../inputs';
import { FormikValues } from 'formik/dist/types';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import clsx from 'clsx';
import { IconCheck } from '../../icons';
import { FIELD_ACTION } from '../../../constants/app/fields-constants';

const VALIDATION_SCHEMA = yup.object().shape({
  [FIELD_ACTION]: yup.string().trim(),
});

interface ActionsFormProps {
  className?: string;
  data: AppSelectOptionProps[];
  value?: string | number;
  inputProps?: InputProps & AppFieldControlProps;
  onSubmit?: (values: FormikValues) => void;
}

export const ActionsForm: ComponentType<ActionsFormProps> = ({
  className,
  data,
  value = '',
  inputProps,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      [FIELD_ACTION]: value,
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: onSubmit ? onSubmit : () => {},
  });

  const fieldSize = inputProps?.size ? inputProps.size : 'small';

  return (
    <form onSubmit={formik.handleSubmit} className={clsx(className)}>
      <Grid container columnSpacing={0.5}>
        <Grid item>
          <AppSelect
            data={data}
            size={fieldSize}
            placeholder={t('action', 'Действие')}
            prompt
            {...{ ...inputProps, ...formik.getFieldProps(FIELD_ACTION) }}
          />
        </Grid>
        <Grid item>
          <Hidden mdDown>
            <Button
              variant="contained"
              color="info"
              size={fieldSize}
              type="submit"
            >
              {t('action.apply', 'Применить')}
            </Button>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              size="small"
              type="submit"
              style={{
                background: '#2F80ED',
                borderRadius: 4,
                width: 32,
                height: 32,
                color: '#ffffff',
              }}
            >
              <SvgIcon
                component={IconCheck}
                viewBox="0 0 16 12"
                fontSize="small"
              />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
    </form>
  );
};

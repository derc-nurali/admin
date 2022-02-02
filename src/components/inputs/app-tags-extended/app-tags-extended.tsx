import { ComponentType, useEffect, useState } from 'react';
import * as yup from 'yup';
import { FormikValues } from 'formik/dist/types';
import { AppFieldControlProps } from '../app-field-control';
import clsx from 'clsx';
import { Button, Grid, InputProps } from '@material-ui/core';
import { AppTags, AppTagsProps } from '../app-tags';
import { useFormik } from 'formik';
import { AppInput } from '../app-input';
import { useTranslation } from 'react-i18next';
import { find, isEmpty, uniq } from 'lodash';
import { FIELD_TAG } from '../../../constants/app/fields-constants';

export interface AppTagsExtendedProps extends AppTagsProps {
  inputProps?: InputProps & AppFieldControlProps;
}

const VALIDATION_SCHEMA = yup.object().shape({
  [FIELD_TAG]: yup.string().trim(),
});

export const AppTagsExtended: ComponentType<AppTagsExtendedProps> = ({
  className,
  data,
  value = [],
  inputProps,
  onChange,
}) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  const handleSubmit = ({ tag }: FormikValues) => {
    if (!tag) return;
    tag = tag.trim();

    let listItems = [...items];
    let selectedList = [...selected];

    const isExist = find(listItems, (x) => x.value === tag);
    if (!isExist) {
      listItems = [...listItems, { label: tag, value: tag }];
      setItems(listItems);
    }

    if (!selectedList.includes(tag)) {
      selectedList = [...selectedList, tag];
      setSelected(selectedList);
    }

    formik.resetForm();
    if (onChange) onChange(selectedList);
  };

  const handleChange = (values: string[]) => {
    setSelected(values);
    if (onChange) onChange(values);
  };

  const formik = useFormik({
    initialValues: {
      [FIELD_TAG]: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!isEmpty(data)) setItems(data);
  }, [data]);

  useEffect(() => {
    setSelected(uniq([...(value || []), ...selected]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <form onSubmit={formik.handleSubmit} className={clsx(className)}>
      <AppTags data={items} value={selected} onChange={handleChange} />
      <Grid container columnSpacing={1} mt={2}>
        <Grid item>
          <AppInput
            size="small"
            placeholder={t('new', 'Новый')}
            {...{ ...inputProps, ...formik.getFieldProps(FIELD_TAG) }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="info"
            size="small"
            type="submit"
            fullWidth
          >
            {t('add', 'Добавить')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

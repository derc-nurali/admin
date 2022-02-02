import { ComponentType } from 'react';
import { SelectForm, SelectFormProps } from '../../forms';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@material-ui/core';
import { IconMedia } from '../../icons';
import { OPTIONS_MEDIALIB_CATEGORY } from '../../../constants/app/action-options-constants';

export const MedialibCategorySelectForm: ComponentType<SelectFormProps> = (
  props
) => {
  const { t } = useTranslation();

  return (
    <SelectForm
      {...props}
      data={OPTIONS_MEDIALIB_CATEGORY}
      name="projects"
      label={t('category', 'Категория')}
      icon={
        <SvgIcon component={IconMedia} viewBox="0 0 16 14" fontSize="small" />
      }
    />
  );
};

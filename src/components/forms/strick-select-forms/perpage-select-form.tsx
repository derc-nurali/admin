import { ComponentType } from 'react';
import { SelectForm, SelectFormProps } from '../../forms';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@material-ui/core';
import { IconSettings } from '../../icons';
import { OPTIONS_PER_PAGE } from '../../../constants/app/action-options-constants';

export const PerPageSelectForm: ComponentType<SelectFormProps> = (props) => {
  const { t } = useTranslation();

  return (
    <SelectForm
      {...props}
      data={OPTIONS_PER_PAGE}
      label={t('perPage', 'На странице')}
      name="perPage"
      icon={
        <SvgIcon
          component={IconSettings}
          viewBox="0 0 16 16"
          fontSize="small"
        />
      }
    />
  );
};

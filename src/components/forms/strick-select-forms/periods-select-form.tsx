import { ComponentType } from 'react';
import { SelectForm, SelectFormProps } from '../../forms';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@material-ui/core';
import { IconCalendar } from '../../icons';
import { OPTIONS_PERIODS } from '../../../constants/app/action-options-constants';

export const PeriodsSelectForm: ComponentType<SelectFormProps> = (props) => {
  const { t } = useTranslation();

  return (
    <SelectForm
      {...props}
      data={OPTIONS_PERIODS}
      label={t('period', 'Период')}
      prompt={t('choose', 'Выберите')}
      name="periods"
      icon={
        <SvgIcon
          component={IconCalendar}
          viewBox="0 0 16 16"
          fontSize="small"
        />
      }
    />
  );
};

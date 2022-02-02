import { ComponentType } from 'react';
import { SelectDialog } from '../select-dialog';
import { map, get } from 'lodash';
import { LOCALES, LOCALES_MAP } from '../../../constants/app/locales-constants';
import { DialogProps } from '../app-dialog';

interface LanguageDialogProps extends DialogProps {
  onChange?: (e: any) => void;
}

export const LanguageDialog: ComponentType<LanguageDialogProps> = ({
  onChange,
  ...props
}) => {
  const langOptions = map(LOCALES, (locale) => ({
    label: get(LOCALES_MAP, [locale, 'name']),
    value: locale,
  }));
  return <SelectDialog onChange={onChange} data={langOptions} {...props} />;
};

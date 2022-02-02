import { ComponentType } from 'react';
import { Checkbox, SvgIcon } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';
import { IconCheckboxChecked, IconCheckboxDefault } from '../../icons';

export const AppCheckbox: ComponentType<CheckboxProps> = (props) => {
  return (
    <Checkbox
      color="info"
      {...props}
      icon={
        <SvgIcon
          component={IconCheckboxDefault}
          viewBox="0 0 24 24"
          sx={{ fill: 'white' }}
        />
      }
      checkedIcon={
        <SvgIcon component={IconCheckboxChecked} viewBox="0 0 24 24" />
      }
    />
  );
};

import { ComponentType } from 'react';
import { AppSelectOptionProps } from '../../inputs';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { map } from 'lodash';
import { AppDialog, DialogProps } from '../app-dialog';
import { useResponsive } from '../../../hooks';

export interface SelectDialogProps extends DialogProps {
  data: AppSelectOptionProps[];
  value?: string | number | null | undefined;
  name?: string;
  onChange?: (e: any) => void;
}

export const SelectDialog: ComponentType<SelectDialogProps> = ({
  data,
  value,
  name,
  onChange,
  popDialog,
  ...props
}) => {
  const r = useResponsive();

  const items = map(data, ({ label, value }, idx) => (
    <FormControlLabel
      value={value}
      control={<Radio color="info" size={r({ xs: 'small', md: 'medium' })} />}
      label={label}
      key={idx}
      componentsProps={{ typography: { variant: 'body2' } }}
    />
  ));

  return (
    <AppDialog {...{ ...props, popDialog }}>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {items}
      </RadioGroup>
    </AppDialog>
  );
};

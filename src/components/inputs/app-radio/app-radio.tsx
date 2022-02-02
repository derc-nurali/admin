import { ComponentType } from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  SelectProps,
} from '@material-ui/core';
import { AppFieldControl, AppFieldControlProps } from '../app-field-control';
import { map } from 'lodash';

export interface AppRadioOptionProps {
  label: string;
  value: string | number;
}

interface AppRadioProps {
  data?: AppRadioOptionProps[];
  label?: string;
  prompt?: string | boolean;
}

export const AppRadio: ComponentType<
  SelectProps & AppFieldControlProps & AppRadioProps
> = ({
  className,
  variant = 'outlined',
  size = 'medium',
  color,
  disabled,
  fullWidth = true,
  required,
  error = false,
  helperText,
  errorAppearance = 'collapse',
  data,
  label,
  prompt,
  value = '',
  ...props
}) => {
  const controlProps = {
    className,
    variant,
    size,
    color,
    label,
    disabled,
    fullWidth,
    required,
    error,
    helperText,
    errorAppearance,
  };

  const items = map(data, (item, idx) => (
    <FormControlLabel {...item} control={<Radio />} key={idx} />
  ));

  return (
    <AppFieldControl {...controlProps}>
      <RadioGroup value={value} {...props}>
        {items}
      </RadioGroup>
    </AppFieldControl>
  );
};

import { ComponentType } from 'react';
import { Input, InputProps } from '@material-ui/core';
import clsx from 'clsx';
import { AppFieldControl, AppFieldControlProps } from '../app-field-control';
import useStyles from './styles';

export const AppInput: ComponentType<InputProps & AppFieldControlProps> = ({
  className,
  variant = 'outlined',
  size = 'medium',
  color,
  label,
  disabled,
  fullWidth = true,
  required,
  error = false,
  helperText,
  errorAppearance = 'collapse',
  value = '',
  ...props
}) => {
  const classes = useStyles();
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

  return (
    <AppFieldControl {...controlProps}>
      <Input
        classes={{
          root: classes.root,
          input: classes.input,
        }}
        className={clsx(classes[variant], classes[size])}
        autoComplete="off"
        fullWidth
        disableUnderline
        size={size}
        {...props}
        value={value ? value : value === 0 ? 0 : ''}
      />
    </AppFieldControl>
  );
};

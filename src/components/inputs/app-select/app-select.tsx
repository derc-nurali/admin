import { SelectProps, MenuItem, Select, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ComponentType } from 'react';
import { map } from 'lodash';
import useStyles from './styles';
import { AppFieldControl, AppFieldControlProps } from '../app-field-control';
import { IconCaret } from '../../icons';
import { useTranslation } from 'react-i18next';

export interface AppSelectOptionProps {
  label: string;
  value: string | number;
}

interface AppSelectProps {
  data?: AppSelectOptionProps[];
  label?: string;
  prompt?: string | boolean;
}

export const AppSelect: ComponentType<
  SelectProps & AppFieldControlProps & AppSelectProps
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
  const classes = useStyles();
  const { t } = useTranslation();
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

  const renderItem = ({ label, value }: AppSelectOptionProps, idx: any) => (
    <MenuItem value={value} key={idx}>
      <Typography variant="body3" component="span">
        {label}
      </Typography>
    </MenuItem>
  );

  const items = map(data, ({ label, value }, idx) => (
    <MenuItem value={value} key={idx}>
      <Typography variant="body3" component="span">
        {label}
      </Typography>
    </MenuItem>
  ));

  const options = map(data, ({ label, value }, idx) => (
    <option value={value} key={idx}>
      {label}
    </option>
  ));

  if (prompt) {
    const label = typeof prompt !== 'boolean' ? prompt : t('choose', 'Выбрать');
    const value = '';
    items.unshift(renderItem({ label, value }, 'prompt'));
  }

  return (
    <AppFieldControl {...controlProps}>
      <Select
        classes={{
          root: classes.root,
          select: classes.input,
          filled: classes.filled,
          outlined: classes.outlined,
          standard: classes.standard,
          icon: classes.icon,
          iconOpen: classes.iconOpen,
        }}
        value={value ? value : value === 0 ? 0 : ''}
        className={clsx(classes[size])}
        IconComponent={IconCaret}
        size={size}
        fullWidth
        displayEmpty
        {...props}
      >
        {props.native ? options : items}
      </Select>
    </AppFieldControl>
  );
};

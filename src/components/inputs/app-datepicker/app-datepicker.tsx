import { ComponentType } from 'react';
import { LocalizationProvider, MobileDateTimePicker } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { InputProps, SvgIcon } from '@material-ui/core';
import { AppFieldControl, AppFieldControlProps } from '../app-field-control';
import { useLanguage } from '../../../hooks';
import { ru, enGB } from 'date-fns/locale';
import { IconCalendar } from '../../icons';
import useStyles from './styles';
import clsx from 'clsx';

export const AppDatepicker: ComponentType<InputProps & AppFieldControlProps> =
  ({
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
    value,
    onChange,
  }) => {
    const classes = useStyles();
    const { currentLocale } = useLanguage();
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

    const handleChange = (value: any) => {
      if (onChange) onChange(value);
    };

    return (
      <AppFieldControl {...controlProps}>
        <LocalizationProvider
          locale={currentLocale === 'en' ? enGB : ru}
          dateAdapter={AdapterDateFns}
        >
          <MobileDateTimePicker
            onChange={handleChange}
            value={value || new Date().toISOString()}
            disabled={disabled}
            mask="__.__.____ __:__"
            renderInput={({ inputRef, inputProps }) => (
              <div className={clsx(classes.root)}>
                <input
                  ref={inputRef}
                  className={clsx(
                    classes.input,
                    classes[variant],
                    classes[size]
                  )}
                  {...inputProps}
                />
                <SvgIcon component={IconCalendar} viewBox="0 0 16 16" />
              </div>
            )}
          />
        </LocalizationProvider>
      </AppFieldControl>
    );
  };

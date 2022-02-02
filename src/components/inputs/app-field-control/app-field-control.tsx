import {
  Collapse,
  Fade,
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';
import clsx from 'clsx';
import { ComponentType } from 'react';
import useStyles from './styles';

export interface AppFieldControlProps extends FormControlProps {
  className?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  label?: string;
  helperText?: string;
  errorAppearance?: 'collapse' | 'fade';
}

export const AppFieldControl: ComponentType<AppFieldControlProps> = ({
  className,
  label,
  error = false,
  helperText,
  errorAppearance = 'collapse',
  children,
  ...props
}) => {
  const classes = useStyles();

  const inputLabel = () => {
    if (!label) return null;

    return <InputLabel shrink>{label}</InputLabel>;
  };

  const helper = () => {
    const text = (
      <FormHelperText
        error={error}
        component="div"
        classes={{ root: classes.helper }}
      >
        {helperText}
      </FormHelperText>
    );

    if (errorAppearance === 'fade') {
      return <Fade in={!!helperText}>{text}</Fade>;
    }

    return <Collapse in={!!helperText}>{text}</Collapse>;
  };

  return (
    <FormControl
      className={clsx(className)}
      classes={{ root: classes.root }}
      variant="standard"
      fullWidth
      {...props}
    >
      {inputLabel()}
      {children}
      {helper()}
    </FormControl>
  );
};

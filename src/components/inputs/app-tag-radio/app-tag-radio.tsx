import { ComponentType } from 'react';
import { map } from 'lodash';
import {
  Button,
  Collapse,
  Fade,
  FormHelperText,
  Grid,
} from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './styles';

interface AppTagsOptionProps {
  label: string;
  value: any;
}

export interface AppTagRadioProps {
  className?: string;
  data: AppTagsOptionProps[];
  value?: any;
  error?: boolean;
  helperText?: string;
  errorAppearance?: 'collapse' | 'fade';
  onChange?: (value: any) => void;
}

export const AppTagRadio: ComponentType<AppTagRadioProps> = ({
  className,
  data,
  value: selectedValue,
  error = false,
  helperText,
  errorAppearance = 'collapse',
  onChange,
}) => {
  const classes = useStyles();

  const handleTag = (val: any) => {
    const newVal = val !== selectedValue ? val : null;
    if (onChange) onChange(newVal);
  };

  const items = map(data, ({ label, value }, idx) => (
    <Grid item key={idx}>
      <Button
        onClick={() => handleTag(value)}
        variant={selectedValue === value ? 'contained' : 'tag'}
        color="info"
        size="small"
      >
        {label}
      </Button>
    </Grid>
  ));

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
    <div className={clsx(className)}>
      <Grid container spacing={0.5}>
        {items}
      </Grid>
      {helper()}
    </div>
  );
};

import { ComponentType, ReactNode } from 'react';
import { AppSelect, AppSelectOptionProps } from '../../inputs';
import clsx from 'clsx';
import {
  Grid,
  Hidden,
  IconButton,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import { IconCaret } from '../../icons';
import { SelectDialog } from '../../dialogs';
import { useDialog } from '../../../hooks';

export interface SelectFormProps {
  className?: string;
  value?: string | number;
  label?: string;
  prompt?: any;
  name?: string;
  icon?: ReactNode;
  variant?: 'standard' | 'outlined' | 'filled';
  horizontal?: boolean;
  onChange?: (val: any, e: any) => void;
}

interface SelectFormDataProps extends SelectFormProps {
  data: AppSelectOptionProps[];
}

export const SelectForm: ComponentType<SelectFormDataProps> = ({
  className,
  onChange,
  icon,
  label,
  horizontal,
  value = '',
  ...props
}) => {
  const [openDialog, closeDialog] = useDialog(SelectDialog);
  const defaultIcon = (
    <SvgIcon component={IconCaret} viewBox="0 0 10 6" fontSize="small" />
  );

  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
    closeDialog();
  };

  const handleOpenDialog = () => {
    openDialog({
      data: props?.data,
      value: value,
      name: props?.name,
      title: label,
      onChange: handleChange,
    });
  };

  const select = (
    <AppSelect
      onChange={handleChange}
      size="small"
      variant="outlined"
      prompt
      className={clsx(className)}
      value={value}
      {...props}
    />
  );

  const renderView = () => {
    if (!label) return select;

    return (
      <Grid container columnSpacing={1}>
        <Grid item xs={horizontal ? 12 : 'auto'}>
          <Typography variant="body3" component="div" mt={0.75} mb={0.75}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={horizontal ? 12 : 'auto'}>
          {select}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Hidden mdUp>
        <IconButton
          onClick={handleOpenDialog}
          size="small"
          color="info"
          component="label"
          style={{ verticalAlign: 'top' }}
        >
          {icon ? icon : defaultIcon}
        </IconButton>
      </Hidden>
      <Hidden mdDown>{renderView()}</Hidden>
    </>
  );
};

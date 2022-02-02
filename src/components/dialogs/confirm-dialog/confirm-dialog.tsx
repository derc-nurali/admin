import { ComponentType, ReactNode } from 'react';
import {
  Button,
  Dialog as MaterialDialog,
  DialogActions as MaterialDialogActions,
  DialogContent as MaterialDialogContent,
  DialogTitle as MaterialDialogTitle,
  Grid,
  IconButton,
  SvgIcon,
} from '@material-ui/core';
import useStyles from './../app-dialog/styles';
import clsx from 'clsx';
import { IconClose } from '../../icons';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  title?: string;
  text?: ReactNode;
  positive?: string;
  negative?: string;
  resolve?: () => void;
  reject?: () => void;
  popDialog?: any;
}

export const ConfirmDialog: ComponentType<ConfirmDialogProps> = ({
  title,
  text,
  positive,
  negative,
  resolve,
  reject,
  popDialog,
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const dialogTitle = title ? title : t('confirmation', 'Подтверждение');
  const dialogPositive = positive ? positive : t('yes', 'Да');
  const dialogNegative = negative ? negative : t('no', 'Нет');
  const dialogText = text ? text : t('areYouSure', 'Вы уверены?');

  const handleReject = () => {
    if (reject) reject();
    if (popDialog) popDialog();
  };

  const handleResolve = () => {
    if (resolve) resolve();
    if (popDialog) popDialog();
  };

  return (
    <MaterialDialog
      open
      onClose={handleReject}
      classes={{ root: classes.root }}
      {...props}
    >
      <Grid container columnSpacing={2} className={clsx(classes.header)}>
        <Grid item>
          <MaterialDialogTitle className={clsx(classes.title)}>
            {dialogTitle}
          </MaterialDialogTitle>
        </Grid>
        <Grid item style={{ marginLeft: 'auto' }}>
          <IconButton onClick={handleReject} size="small">
            <SvgIcon
              component={IconClose}
              viewBox="0 0 16 16"
              fontSize="small"
              color="info"
            />
          </IconButton>
        </Grid>
      </Grid>
      <MaterialDialogContent className={clsx(classes.content)}>
        {dialogText}
      </MaterialDialogContent>
      <MaterialDialogActions className={clsx(classes.actions)}>
        <Button
          onClick={handleReject}
          variant="contained"
          color="error"
          size="small"
        >
          {dialogNegative}
        </Button>
        <Button
          onClick={handleResolve}
          variant="contained"
          color="info"
          size="small"
        >
          {dialogPositive}
        </Button>
      </MaterialDialogActions>
    </MaterialDialog>
  );
};

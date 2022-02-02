import { ComponentType, forwardRef, ReactElement, ReactNode, Ref } from 'react';
import {
  Dialog as MaterialDialog,
  DialogActions as MaterialDialogActions,
  DialogContent as MaterialDialogContent,
  DialogTitle as MaterialDialogTitle,
  Grid,
  IconButton,
  Slide,
  SvgIcon,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import useStyles from './styles';
import clsx from 'clsx';
import { IconClose } from '../../icons';

export interface DialogProps {
  children?: ReactNode;
  title?: string;
  actions?: ReactNode;
  popDialog?: any;
  closeButton?: boolean;
  maxWidth?: any;
}
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AppDialog: ComponentType<DialogProps> = ({
  children,
  title,
  actions,
  closeButton = true,
  popDialog,
  ...props
}) => {
  const classes = useStyles();

  return (
    <MaterialDialog
      open
      onClose={popDialog}
      TransitionComponent={Transition}
      classes={{ root: classes.root }}
      {...props}
    >
      {(title || closeButton) && (
        <Grid container columnSpacing={2} className={clsx(classes.header)}>
          <Grid item>
            {title && (
              <MaterialDialogTitle className={clsx(classes.title)}>
                {title}
              </MaterialDialogTitle>
            )}
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            {closeButton && (
              <IconButton onClick={popDialog} size="small">
                <SvgIcon
                  component={IconClose}
                  viewBox="0 0 16 16"
                  fontSize="small"
                  color="info"
                />
              </IconButton>
            )}
          </Grid>
        </Grid>
      )}
      {children && (
        <MaterialDialogContent className={clsx(classes.content)}>
          {children}
        </MaterialDialogContent>
      )}
      {actions && (
        <MaterialDialogActions className={clsx(classes.actions)}>
          {actions}
        </MaterialDialogActions>
      )}
    </MaterialDialog>
  );
};

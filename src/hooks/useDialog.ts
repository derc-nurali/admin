import React, { useCallback, useContext } from 'react';
import DialogContext from '../contexts/dialog-context';

export const useDialog = (Component: React.ReactNode) => {
  const { pushDialog, popDialog } = useContext(DialogContext);

  const openDialog = useCallback(
    (props: any = null) => {
      return new Promise((resolve, reject) =>
        pushDialog([Component, props, resolve, reject])
      );
    },
    [Component, pushDialog]
  );

  const closeDialog = useCallback(() => {
    popDialog();
  }, [popDialog]);

  return [openDialog, closeDialog];
};

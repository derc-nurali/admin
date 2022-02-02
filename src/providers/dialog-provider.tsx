import React, {
  ComponentClass,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import DialogContext from '../contexts/dialog-context';

type DialogProps = [
  Component: FunctionComponent | ComponentClass,
  props: any,
  resolve: any,
  reject: any
];

type DialogsState = DialogProps[];

export const DialogProvider: React.FC = ({ children }) => {
  const [dialogs, setComponents] = useState<DialogsState>([]);

  const pushDialog = useCallback(
    (dialog: DialogProps) => {
      setComponents([...dialogs, dialog]);
    },
    [dialogs]
  );

  const popDialog = useCallback(
    (e, result) => {
      const dialog = dialogs.pop();

      if (dialog && Array.isArray(dialog)) {
        const [, , resolve] = dialog;
        resolve(result);
      }

      setComponents([...dialogs]);
    },
    [dialogs]
  );

  const dialogContext = useMemo(() => {
    return { pushDialog, popDialog };
  }, [pushDialog, popDialog]);

  return (
    <DialogContext.Provider value={dialogContext}>
      {React.Children.only(children)}
      {dialogs.map(([component, componentProps], index) => {
        return React.createElement(component, {
          key: index,
          popDialog,
          ...componentProps,
        });
      })}
    </DialogContext.Provider>
  );
};

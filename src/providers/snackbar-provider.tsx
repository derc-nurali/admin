import React, { useState } from 'react';
import SnackbarContext from '../contexts/snackbar-context';
import { IconButton, Snackbar, SvgIcon } from '@material-ui/core';
import { IconClose } from '../components/icons';

export const SnackbarProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        action={
          <IconButton onClick={handleClose} size="small" color="info">
            <SvgIcon
              component={IconClose}
              viewBox="0 0 16 16"
              fontSize="small"
            />
          </IconButton>
        }
      />
    </SnackbarContext.Provider>
  );
};

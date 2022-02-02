import { useContext } from 'react';
import SnackbarContext from '../contexts/snackbar-context';

export const useSnackbar = () => {
  const { showMessage } = useContext(SnackbarContext);

  return { showMessage };
};

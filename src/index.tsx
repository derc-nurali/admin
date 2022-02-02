import { Suspense } from 'react';
import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import './common/i18next';
import { store } from './common/store';
import { ThemeProvider } from './components/theme';
import { DialogProvider } from './providers/dialog-provider';
import { SnackbarProvider } from './providers/snackbar-provider';

render(
  <StoreProvider store={store}>
    <Suspense fallback={`Loader`}>
      <BrowserRouter>
        <ThemeProvider>
          <DialogProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </DialogProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  </StoreProvider>,
  document.getElementById('root')
);

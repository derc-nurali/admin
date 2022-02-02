import { ComponentType, createElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth, useLanguage } from '../hooks';

export const authorized =
  () =>
  <T>(Component: ComponentType<T>) => {
    const EnhancedComponent: ComponentType<T> = (props) => {
      const { isSignedIn } = useAuth();
      const { currentLocale } = useLanguage();

      if (!isSignedIn) {
        return createElement(Redirect, { to: `/${currentLocale}` });
      }

      return createElement(Component, props);
    };

    return EnhancedComponent;
  };

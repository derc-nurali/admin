import { alpha } from '@material-ui/core/styles';

export const lightPalette = {
  type: 'light',
  primary: {
    light: '#222222',
    main: '#222222',
    dark: '#222222',
    contrastText: '#FFFFFF',
  },
  secondary: {
    light: '#2F80ED',
    main: '#2F80ED',
    dark: '#2666BE',
    contrastText: '#FFFFFF',
  },
  info: {
    light: '#2F80ED',
    main: '#2F80ED',
    dark: '#2666BE',
    contrastText: '#FFFFFF',
  },
  success: {
    light: '#65CD88',
    main: '#27AE60',
    dark: '#BC4646',
    contrastText: '#FFFFFF',
  },
  error: {
    light: '#EF7979',
    main: '#EB5757',
    dark: '#BC4646',
    contrastText: '#FFFFFF',
  },
  warning: {
    light: '#F5AD6E',
    main: '#F2994A',
    dark: '#C27A3B',
    contrastText: '#FFFFFF',
  },
  grey: {
    100: alpha('#FFFFFF', 0.4),
    200: alpha('#FFFFFF', 0.2),
    300: alpha('#FFFFFF', 0.05),
    400: alpha('#222222', 0.05),
    500: alpha('#222222', 0.2),
    600: alpha('#222222', 0.4),
    700: alpha('#222222', 0.6),
    800: alpha('#222222', 0.8),
    900: '#222222',
  },
  text: {
    primary: alpha('#222222', 1),
    secondary: alpha('#222222', 0.8),
    disabled: alpha('#222222', 0.2),
    hint: alpha('#222222', 0.4),
  },
  background: {
    default: '#EAEAEA',
  },
};

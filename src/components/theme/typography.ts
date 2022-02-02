import { TypographyOptions } from '@material-ui/core/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: [
    "'Open Sans'",
    'system-ui',
    '-apple-system',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    '"Liberation Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ].join(','),
  h1: {
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  h2: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  h3: {
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  h4: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h5: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  h6: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  subtitle1: {
    fontSize: 18,
    lineHeight: 1.35,
  },
  subtitle2: {
    fontSize: 16,
    lineHeight: 1.35,
  },
  subtitle3: {
    fontSize: 14,
    lineHeight: 1.35,
  },
  body1: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.4,
  },
  body2: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.4,
  },
  body3: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.4,
  },
  caption: {
    lineHeight: 1.5,
    fontSize: 14,
    fontWeight: 400,
  },
  button: {
    fontSize: 16,
    lineHeight: 1,
    textTransform: 'none',
  },
  button1: {
    fontSize: 16,
    lineHeight: 1,
    textTransform: 'none',
  },
  button2: {
    fontSize: 14,
    lineHeight: 1,
    textTransform: 'none',
  },
  button3: {
    fontSize: 12,
    lineHeight: 1,
    textTransform: 'none',
  },
};

import { Components } from '@material-ui/core/styles/components';
import { createBreakpoints } from '@material-ui/system';
import { lightPalette } from './palettes/light';
import { typography } from './typography';

declare module '@material-ui/core/Button' {
  interface ButtonPropsVariantOverrides {
    lever: true;
    tag: true;
  }
}

const breakpoints = createBreakpoints({});

export const components: Components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        minHeight: '100vh',
        height: '100%',
      },
      body: {
        minHeight: '100vh',
        height: '100%',
      },
      '#root': {
        minHeight: '100vh',
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        maxWidth: '100%',
        [breakpoints.up('sm')]: {
          paddingLeft: 16,
          paddingRight: 16,
        },
        [breakpoints.up('lg')]: {
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: '100%',
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        position: 'static',
        maxWidth: '100%',
        fontSize: 16,
        transform: 'none',
        '& + .MuiInputBase-root': {
          marginTop: 4,
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        padding: 0,
      },
      underline: {
        '&:before, &:after': {
          display: 'none',
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 24,
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: 16,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true, // No more ripple, on the whole application!
    },
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          borderWidth: 1,
          '&:hover, &:hover:focus': {
            borderWidth: 1,
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'primary' },
        style: {
          borderColor: lightPalette.primary.main,
          '&:hover, &:focus:hover': {
            borderColor: lightPalette.primary.dark,
            color: lightPalette.primary.contrastText,
            backgroundColor: lightPalette.primary.dark,
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'secondary' },
        style: {
          borderColor: lightPalette.secondary.main,
          '&:hover, &:focus:hover': {
            borderColor: lightPalette.secondary.dark,
            color: lightPalette.secondary.contrastText,
            backgroundColor: lightPalette.secondary.dark,
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'success' },
        style: {
          borderColor: lightPalette.success.main,
          '&:hover, &:focus:hover': {
            borderColor: lightPalette.success.dark,
            color: lightPalette.success.contrastText,
            backgroundColor: lightPalette.success.dark,
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'error' },
        style: {
          borderColor: lightPalette.error.main,
          '&:hover, &:focus:hover': {
            borderColor: lightPalette.error.dark,
            color: lightPalette.error.contrastText,
            backgroundColor: lightPalette.error.dark,
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'info' },
        style: {
          borderColor: lightPalette.info.main,
          '&:hover, &:focus:hover': {
            borderColor: lightPalette.info.dark,
            color: lightPalette.info.contrastText,
            backgroundColor: lightPalette.info.dark,
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'warning' },
        style: {
          borderColor: lightPalette.warning.main,
          '&:hover, &:focus:hover': {
            borderColor: lightPalette.warning.dark,
            color: lightPalette.warning.contrastText,
            backgroundColor: lightPalette.warning.dark,
          },
        },
      },
      {
        props: { variant: 'outlined', size: 'medium' },
        style: {
          borderWidth: 2,
          '&:hover, &:focus:hover': {
            borderWidth: 2,
          },
        },
      },
      {
        props: { variant: 'lever' },
        style: {
          fontWeight: 400,
          '&.MuiButton-root': {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: 'inherit',
          },
        },
      },
      {
        props: { variant: 'lever', color: 'primary' },
        style: {
          color: lightPalette.primary.main,
          '&:hover': {
            color: lightPalette.primary.light,
          },
          '&:focus, &:active': {
            color: lightPalette.primary.dark,
          },
        },
      },
      {
        props: { variant: 'lever', color: 'secondary' },
        style: {
          color: lightPalette.secondary.main,
          '&:hover': {
            color: lightPalette.secondary.light,
          },
          '&:focus, &:active': {
            color: lightPalette.secondary.dark,
          },
        },
      },
      {
        props: { variant: 'lever', color: 'success' },
        style: {
          color: lightPalette.success.main,
          '&:hover': {
            color: lightPalette.success.light,
          },
          '&:focus, &:active': {
            color: lightPalette.success.dark,
          },
        },
      },
      {
        props: { variant: 'lever', color: 'error' },
        style: {
          color: lightPalette.error.main,
          '&:hover': {
            color: lightPalette.error.light,
          },
          '&:focus, &:active': {
            color: lightPalette.error.dark,
          },
        },
      },
      {
        props: { variant: 'lever', color: 'info' },
        style: {
          color: lightPalette.info.main,
          '&:hover': {
            color: lightPalette.info.light,
          },
          '&:focus, &:active': {
            color: lightPalette.info.dark,
          },
        },
      },
      {
        props: { variant: 'lever', color: 'warning' },
        style: {
          color: lightPalette.warning.main,
          '&:hover': {
            color: lightPalette.warning.light,
          },
          '&:focus, &:active': {
            color: lightPalette.warning.dark,
          },
        },
      },
      {
        props: { variant: 'tag' },
        style: {
          color: lightPalette.primary.main,
          fontWeight: 400,
          backgroundColor: lightPalette.grey[400],
          '&.MuiButton-root': {
            '&:hover': {
              backgroundColor: lightPalette.grey[400],
            },
          },
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: 'inherit',
          },
        },
      },
      {
        props: { variant: 'tag', color: 'info' },
        style: {
          color: lightPalette.info.main,
        },
      },
      {
        props: { variant: 'tag', color: 'success' },
        style: {
          color: lightPalette.success.main,
        },
      },
      {
        props: { variant: 'tag', color: 'error' },
        style: {
          color: lightPalette.error.main,
        },
      },
      {
        props: { variant: 'tag', color: 'warning' },
        style: {
          color: lightPalette.warning.main,
        },
      },
    ],
    styleOverrides: {
      sizeSmall: {
        ...typography.button2,
        height: 32,
        padding: '9px 12px',
      },
      sizeMedium: {
        ...typography.button1,
        height: 48,
        padding: '16px 22px',
      },
      startIcon: {
        '&>*:nth-of-type(1):not(.MuiSvgIcon-fontSizeSmall)': {
          fontSize: 24,
        },
        '&>*.MuiSvgIcon-fontSizeSmall': {
          fontSize: 16,
        },
      },
      endIcon: {
        '&>*:nth-of-type(1):not(.MuiSvgIcon-fontSizeSmall)': {
          fontSize: 24,
        },
        '&>*.MuiSvgIcon-fontSizeSmall': {
          fontSize: 16,
        },
      },
      iconSizeSmall: {
        '&.MuiButton-startIcon': {
          '&>*:nth-of-type(1)': {
            fontSize: 'inherit',
          },
        },
        '&.MuiButton-endIcon': {
          '&>*:nth-of-type(1)': {
            fontSize: 'inherit',
          },
        },
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      fontSizeSmall: {
        fontSize: 16,
      },
      fontSizeLarge: {
        fontSize: 24,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      sizeMedium: {
        padding: '12px 16px',
      },
      sizeSmall: {
        padding: '8px 12px',
      },
      paddingCheckbox: {
        padding: 0,
        width: 'auto',
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        background: lightPalette.grey[500],
        '& svg': {
          color: '#ffffff',
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: 16,
        borderRadius: 8,
        boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        boxShadow: 'none',
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        fontSize: 20,
        '& + .MuiCardContent-root': {
          paddingTop: 0,
        },
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        '&:last-child': {
          paddingBottom: 16,
        },
      },
    },
  },
};

import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'app-input',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '&.MuiInputBase-adornedEnd': {
        position: 'relative',
        '& $input': {
          paddingRight: theme.spacing(4),
        },
        '& svg': {
          position: 'absolute',
          top: '50%',
          right: theme.spacing(1),
          color: theme.palette.info.main,
          transform: 'translateY(-50%)',
        },
      },
    },
    input: {
      borderRadius: 4,
      border: '1px solid transparent',
      transition: 'all 200ms ease-in 0ms',
      '&.MuiInputBase-inputMultiline': {
        resize: 'vertical',
        transition: 'none',
      },
    },
    outlined: {
      '& $input': {
        borderColor: theme.palette.grey[500],
        background: theme.palette.common.white,
      },
    },
    filled: {
      '& $input': {
        borderColor: theme.palette.grey[400],
        background: theme.palette.grey[400],
        '&:focus': {
          borderColor: theme.palette.grey[500],
          background: theme.palette.common.white,
        },
        '&::placeholder': {
          color: theme.palette.grey[600],
          opacity: 1,
        },
      },
    },
    standard: {
      background: 'transparent',
      '& $input': {
        borderRadius: 0,
        '&:focus': {
          borderColor: theme.palette.primary.main,
          background: theme.palette.common.white,
        },
      },
    },
    medium: {
      '& $input': {
        padding: theme.spacing(1, 1.5, 1),
        '&:not(.MuiInputBase-inputMultiline)': {
          height: 30,
          lineHeight: '30px',
        },
      },
      '&.MuiInputBase-adornedEnd': {
        '& svg': {
          fontSize: 20,
        },
      },
    },
    small: {
      '& $input': {
        padding: theme.spacing(0.5, 1.25),
        fontSize: 14,
        '&:not(.MuiInputBase-inputMultiline)': {
          height: 22,
          lineHeight: '22px',
        },
      },
      '&.MuiInputBase-adornedEnd': {
        '& svg': {
          fontSize: 16,
        },
      },
    },
  }),
  options
);

export default useStyles;

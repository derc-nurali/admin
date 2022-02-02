import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'app-datepckker',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      '& input': {
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
    input: {
      display: 'block',
      width: '100%',
      borderRadius: 4,
      cursor: 'pointer',
      border: '1px solid transparent',
      transition: 'all 200ms ease-in 0ms',
      outline: 'none',
    },
    outlined: {
      borderColor: theme.palette.grey[500],
      background: theme.palette.common.white,
    },
    filled: {
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
    standard: {
      background: 'transparent',
    },
    medium: {
      height: 48,
      lineHeight: '48px',
      padding: theme.spacing(1, 1.5, 1),
      fontSize: 16,
      '& + svg': {
        fontSize: 20,
      },
    },
    small: {
      height: 32,
      lineHeight: '22px',
      padding: theme.spacing(0.5, 1.25),
      fontSize: 14,
      '& + svg': {
        fontSize: 16,
      },
    },
  }),
  options
);

export default useStyles;

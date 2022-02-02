import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'app-select',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: 'transparent',
      '& fieldset': {
        border: 'none',
      },
    },
    input: {
      borderRadius: 4,
      border: '1px solid transparent',
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
    },
    standard: {
      background: 'transparent',
    },
    medium: {
      '& $input': {
        height: 30,
        lineHeight: '30px',
        padding: theme.spacing(1, 1.5, 1),
      },
    },
    small: {
      '& $input': {
        height: 22,
        lineHeight: '22px',
        padding: theme.spacing(0.5, 1.25),
        fontSize: 14,
      },
    },
    icon: {
      top: '50%',
      right: 9,
      transition: 'all 200ms ease-in 0ms',
      transform: 'translateY(-50%)',
      fill: theme.palette.info.main,
    },
    iconOpen: {
      transform: 'translateY(-50%) rotate(180deg)',
    },
  }),
  options
);

export default useStyles;

import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'workflow-dropdown',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    toggler: {
      minWidth: 0,
      padding: theme.spacing(1.125),
      fontWeight: theme.typography.fontWeightRegular,
    },
    caret: {
      marginLeft: theme.spacing(1.25),
      fontSize: 10,
      color: theme.palette.info.main,
      transition: 'all 200ms ease-in 0ms',
    },
    caretInverse: {
      transform: 'rotate(180deg)',
    },
    menuItem: {
      color: theme.palette.info.main,
      '&.active': {
        cursor: 'auto',
        color: 'inherit',
      },
    },
    active: {
      pointerEvents: 'none',
      color: 'inherit',
      cursor: 'inherit',
    },
  }),
  options
);

export default useStyles;

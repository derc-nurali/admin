import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'header-owner',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    toggler: {
      minWidth: 0,
      padding: theme.spacing(1.125),
      fontWeight: theme.typography.fontWeightRegular,
    },
    avatar: {
      flex: '0 0 32px',
      width: 32,
      height: 32,
      '&:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
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
    item: {
      padding: 0,
      cursor: 'auto',
    },
    link: {
      padding: theme.spacing(1, 2),
      color: theme.palette.info.main,
      textDecoration: 'none',
    },
  }),
  options
);

export default useStyles;

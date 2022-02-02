import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'header',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: theme.palette.common.white,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(1.75, 0),
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
      },
    },
    search: {
      [theme.breakpoints.up('lg')]: {
        width: 312,
      },
    },
    action: {
      marginLeft: theme.spacing(1.5),
    },
  }),
  options
);

export default useStyles;

import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import {
  DRAWER_MAX_WIDTH,
  DRAWER_MIN_WIDTH,
} from '../../../constants/app/size-constants';

const options = {
  name: 'layout-default',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      paddingLeft: DRAWER_MIN_WIDTH,
      transition: 'all 200ms ease-in 0ms',
    },
    drawerOpened: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: DRAWER_MAX_WIDTH,
      },
    },
    main: {
      flexGrow: 2,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(4.5, 0),
    },
  }),
  options
);

export default useStyles;

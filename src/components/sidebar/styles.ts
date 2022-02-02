import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';
import { DRAWER_MAX_WIDTH } from '../../constants/app/size-constants';

const options = {
  name: 'sidebar',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: DRAWER_MAX_WIDTH,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 0,
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2, 1, 2, 5),
      transition: 'all 200ms ease-in 0ms',
    },
    headerOut: {
      transform: 'translateX(-200px)',
    },
    logo: {
      maxWidth: 128,
    },
    toggler: {
      marginLeft: 'auto',
      color: 'inherit',
    },
    nav: {},
  }),
  options
);

export default useStyles;

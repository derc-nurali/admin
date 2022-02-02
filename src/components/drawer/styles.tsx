import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'drawer',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 9,
      color: theme.palette.common.white,
      background: theme.palette.primary.main,
      '-webkit-backface-visibility': 'hidden',
    },
    content: {
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  }),
  options
);

export default useStyles;

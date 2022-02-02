import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'layout-simple',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    container: {
      display: 'flex !important',
      flexDirection: 'column',
      flex: '1 0 auto',
    },
  }),
  options
);

export default useStyles;

import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'loader',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'inline-flex',
      margin: 'auto',
    },
  }),
  options
);

export default useStyles;

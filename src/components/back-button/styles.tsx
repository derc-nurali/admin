import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'back-button',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacing(2),
    },
  }),
  options
);

export default useStyles;

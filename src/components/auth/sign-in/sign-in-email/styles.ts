import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'sign-in-email',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    form: {},
  }),
  options
);

export default useStyles;

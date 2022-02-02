import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'layout',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    default: {},
    simple: {},
  }),
  options
);

export default useStyles;

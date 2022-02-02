import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'app-tag-radio',
};

const useStyles = makeStyles(
  () => ({
    root: {},
    helper: {
      fontSize: 12,
      textAlign: 'right',
      margin: 0,
    },
  }),
  options
);

export default useStyles;

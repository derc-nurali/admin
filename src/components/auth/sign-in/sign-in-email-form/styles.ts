import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'sign-in-email-form',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    text: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
    col: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: theme.spacing(2),
    },
    back: {
      marginBottom: theme.spacing(3),
      '&.MuiButton-sizeSmall': {
        marginTop: -6,
        marginLeft: -10,
      },
    },
    errorPlaceholder: {
      height: 18,
    },
  }),
  options
);

export default useStyles;

import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'app-dialog',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    title: {
      padding: 0,
      fontSize: 16,
      fontWeight: theme.typography.fontWeightBold,
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    content: {
      padding: 0,
      '&:not(:last-child)': {
        paddingBottom: theme.spacing(3),
      },
      '& .MuiFormControlLabel-labelPlacementEnd': {
        marginLeft: -10,
      },
    },
    actions: {
      padding: 0,
    },
  }),
  options
);

export default useStyles;

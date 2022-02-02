import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'documents-repeater',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    document: {
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
    },
    footer: {
      textAlign: 'center',
    },
    helper: {
      fontSize: 12,
      textAlign: 'right',
      margin: 0,
    },
  }),
  options
);

export default useStyles;

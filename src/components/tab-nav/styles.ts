import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'tab-nav',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
    link: {
      display: 'inline-flex',
      minWidth: 0,
      marginRight: theme.spacing(2),
      padding: theme.spacing(0, 0, 0.75),
      fontSize: 16,
      color: theme.palette.text.primary,
      textDecoration: 'none',
      borderBottom: '3px solid transparent',
      borderRadius: 0,
      '&:hover': {
        background: 'transparent',
      },
    },
    active: {
      borderBottomColor: theme.palette.primary.main,
      '& $text': {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
      },
    },
    text: {
      marginRight: theme.spacing(0.25),
      color: theme.palette.info.main,
    },
    counter: {
      color: theme.palette.grey[600],
    },
  }),
  options
);

export default useStyles;

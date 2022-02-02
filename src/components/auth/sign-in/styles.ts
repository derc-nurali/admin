import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'sign',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: 'auto',
      maxWidth: theme.spacing(58.5),
      width: '100%',
    },
    card: {},
    content: {},
    header: {
      padding: theme.spacing(3),
      '& + $body': {
        paddingTop: 0,
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4.5),
        '& + $body': {
          paddingTop: 0,
        },
      },
    },
    body: {
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4.5),
      },
    },
    logo: {
      color: theme.palette.text.primary,
      maxWidth: 200,
      [theme.breakpoints.up('md')]: {
        maxWidth: 250,
      },
    },
    sso: {
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(4.5),
      },
    },
    login: {
      margin: theme.spacing(0, -3, -3),
      padding: theme.spacing(3),
      background: theme.palette.grey[400],
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, -4.5, -4.5),
        padding: theme.spacing(4.5),
      },
    },
    lang: {
      justifyContent: 'flex-end',
      marginBottom: theme.spacing(4.5),
    },
    text: {},
  }),
  options
);

export default useStyles;

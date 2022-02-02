import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'pagination',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginTop: theme.spacing(2),
    },
    list: {
      display: 'flex',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    item: {
      '&:not(:last-child)': {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
          marginRight: theme.spacing(2),
        },
      },
    },
    button: {
      cursor: 'pointer',
    },
    buttonText: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'inline',
      },
    },
    page: {
      width: 32,
      height: 32,
      fontSize: 14,
    },
    pageSelected: {
      color: theme.palette.common.white,
      background: theme.palette.info.main,
      '&:hover': {
        background: theme.palette.info.main,
      },
    },
  }),
  options
);

export default useStyles;

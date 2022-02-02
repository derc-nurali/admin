import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'data-table-filter',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(1),
      background: theme.palette.grey[100],
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-start',
      },
    },
    header: {
      borderRadius: '4px 4px 0 0',
    },
    footer: {
      borderRadius: '0 0 4px 4px',
    },
    actions: {
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: 'auto',
      marginLeft: 0,
    },
  }),
  options
);

export default useStyles;

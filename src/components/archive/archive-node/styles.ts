import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'archive-node',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: 4,
      minHeight: 256,
      boxShadow: '0 12px 12px rgba(0, 0, 0, 0.1)',
      '& img': {
        borderRadius: '4px 4px 0 0',
        maxWidth: '100%',
        verticalAlign: 'middle',
      },
      '& .MuiIconButton-root': {
        position: 'absolute',
        top: 8,
        right: 8,
        color: theme.palette.common.white,
        background: theme.palette.error.main,
      },
    },
    footer: {
      padding: theme.spacing(1),
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
    },
    loader: {
      margin: 'auto',
    },
  }),
  options
);

export default useStyles;

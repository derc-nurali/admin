import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'archive',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    rootSelectable: {
      '& $node': {
        cursor: 'pointer',
        border: '2px solid transparent',
        opacity: 0.7,
        '&:hover': {
          opacity: 1,
          boxShadow: '0 12px 12px rgba(0, 0, 0, 0.1)',
        },
      },
      '& $nodeSelected': {
        opacity: 1,
        borderColor: theme.palette.info.main,
      },
    },
    container: {
      overflowY: 'scroll',
      maxHeight: '65vh',
    },
    node: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 100%',
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: 4,
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '& img': {
        maxWidth: '100%',
        verticalAlign: 'middle',
        borderRadius: '2px 2px 0 0',
      },
    },
    nodeSelected: {},
    icon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    brim: {
      margin: theme.spacing(2, 0),
      textAlign: 'right',
    },
    footer: {
      margin: 'auto',
      padding: theme.spacing(0.5, 1),
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 13,
    },
  }),
  options
);

export default useStyles;

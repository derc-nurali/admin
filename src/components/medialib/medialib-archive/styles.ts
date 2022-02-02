import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'medialib-archive',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    rootSelectable: {
      '& $preview': {
        overflow: 'hidden',
        cursor: 'pointer',
        border: '2px solid transparent',
        opacity: 0.7,
        '&:hover': {
          opacity: 1,
          boxShadow: '0 12px 12px rgba(0, 0, 0, 0.1)',
        },
      },
      '& $previewSelected': {
        opacity: 1,
        borderColor: theme.palette.info.main,
      },
    },
    container: {
      overflowY: 'scroll',
      maxHeight: '65vh',
    },
    preview: {
      position: 'relative',
      flex: '1 1 100%',
      width: '100%',
      borderRadius: 4,
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '& img': {
        maxWidth: '100%',
        verticalAlign: 'middle',
      },
    },
    previewSelected: {},
    icon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    brim: {
      margin: theme.spacing(2, 0),
      textAlign: 'right',
    },
  }),
  options
);

export default useStyles;

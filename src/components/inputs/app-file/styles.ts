import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'app-file',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      alignItem: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      border: `1px dotted ${theme.palette.grey[500]}`,
      borderRadius: 4,
      cursor: 'pointer',
    },
    rootOver: {
      borderColor: theme.palette.grey[700],
      background: theme.palette.grey[400],
    },
    label: {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginRight: theme.spacing(1),
    },
    error: {
      color: theme.palette.error.main,
    },
  }),
  options
);

export default useStyles;

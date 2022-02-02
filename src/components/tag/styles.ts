import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'tag',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'inline-flex',
      margin: theme.spacing(0.25),
      padding: theme.spacing(0.375, 1),
      fontSize: 12,
      borderRadius: 4,
      border: `1px solid ${theme.palette.grey[400]}`,
      background: theme.palette.grey[400],
    },
  }),
  options
);

export default useStyles;

import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'data-table-link',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.info.main,
      },
    },
  }),
  options
);

export default useStyles;

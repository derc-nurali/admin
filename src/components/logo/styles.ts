import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'logo',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'inline-block',
      textDecoration: 'none',
      maxWidth: theme.spacing(20),
      whiteSpace: 'initial',
      fontSize: 'inherit',
      '& $img': {
        width: '100%',
        height: 'auto',
      },
    },
    primary: {
      color: theme.palette.text.primary,
    },
    inherit: {
      color: 'inherit',
    },
    img: {
      verticalAlign: 'text-bottom',
    },
  }),
  options
);

export default useStyles;

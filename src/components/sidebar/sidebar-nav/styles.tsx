import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'sidebar-nav',
};

const transition = 'all 180ms ease-in 0ms';

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      transition: transition,
    },
    rootOut: {
      transform: 'translateX(-24px)',
      '& $media': {
        marginRight: theme.spacing(8),
      },
    },
    item: {},
    link: {
      paddingLeft: theme.spacing(5),
      '&:hover': {
        '& $media': {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      '&.active, &.active:hover': {
        background: theme.palette.grey[300],
        '& $media': {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
    media: {
      minWidth: 24,
      marginRight: theme.spacing(1),
      color: theme.palette.grey[200],
      transition: transition,
    },
    icon: {},
    body: {
      '& span': {
        whiteSpace: 'nowrap',
      },
    },
    text: {},
    extended: {},
    // variants
    short: {},
    default: {},
  }),
  options
);

export default useStyles;

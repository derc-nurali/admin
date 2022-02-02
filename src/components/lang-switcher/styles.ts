import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'language',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    toggler: {
      minWidth: 0,
      padding: theme.spacing(1.125),
      fontWeight: theme.typography.fontWeightRegular,
    },
    caret: {
      marginLeft: theme.spacing(1.25),
      fontSize: 10,
      color: theme.palette.info.main,
      transition: 'all 200ms ease-in 0ms',
    },
    caretInverse: {
      transform: 'rotate(180deg)',
    },
    menuItem: {
      color: theme.palette.info.main,
      '&.active': {
        cursor: 'auto',
        color: 'inherit',
      },
    },
    list: {
      display: 'flex',
    },
    item: {
      position: 'relative',
      marginRight: theme.spacing(4.75),
      color: theme.palette.info.main,
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover, &:focus:hover': {
        color: theme.palette.info.main,
      },
      '&:last-child': {
        marginRight: 0,
        '&::before': {
          content: 'none',
        },
      },
      '&::before': {
        position: 'absolute',
        top: '50%',
        right: theme.spacing(-2.75),
        transform: 'translate(0, -50%)',
        content: '""',
        display: 'block',
        borderRadius: 6,
        width: 6,
        height: 6,
        background: theme.palette.text.disabled,
      },
    },
    active: {
      pointerEvents: 'none',
      color: 'inherit',
      cursor: 'inherit',
    },
    text: {},
    select: {},
  }),
  options
);

export default useStyles;

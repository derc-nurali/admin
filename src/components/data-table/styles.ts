import { Theme } from '@material-ui/core/styles/createTheme';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'data-table',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      overflowX: 'auto',
    },
    table: {
      background: theme.palette.common.white,
      '& th, & td': {
        border: `1px solid ${theme.palette.grey[400]}`,
        '&.MuiTableCell-paddingCheckbox': {
          '&:first-child': {
            width: 42,
            paddingRight: 0,
            borderRight: 0,
            '& + th, & + td': {
              borderLeft: 0,
              paddingLeft: theme.spacing(1),
            },
          },
        },
      },
    },
    head: {
      '& $row': {
        '& th': {
          fontWeight: theme.typography.fontWeightBold,
          background: 'rgba(255, 255, 255, 0.8);',
        },
      },
    },
    body: {
      '& $row': {
        '&:nth-child(even)': {
          '& td': {
            background: theme.palette.grey[400],
          },
        },
      },
    },
    row: {},
    placeholder: {
      padding: theme.spacing(3, 0),
      textAlign: 'center',
      background: theme.palette.common.white,
    },
  }),
  options
);

export default useStyles;

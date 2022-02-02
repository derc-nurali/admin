import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'data-table-date',
};

const useStyles = makeStyles(
  () => ({
    root: {},
    date: {
      whiteSpace: 'nowrap',
    },
  }),
  options
);

export default useStyles;

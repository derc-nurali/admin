import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'data-table-tags',
};

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
  options
);

export default useStyles;

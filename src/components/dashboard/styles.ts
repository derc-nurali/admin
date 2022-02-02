import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'вфырищфкв',
};

const useStyles = makeStyles(
  () => ({
    root: {},
    card: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      '& .MuiPaper-root ': {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 'auto',
      },
    },
    actions: {
      justifyContent: 'flex-end',
      marginTop: 'auto',
    },
  }),
  options
);

export default useStyles;

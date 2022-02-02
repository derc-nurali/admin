import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'ckeditor',
};

const useStyles = makeStyles(
  () => ({
    root: {
      width: '100%',
      overflow: 'hidden',
      '& .ck-toolbar': {
        borderRadius: '8px 8px 0 0 !important',
      },
      '& .ck-content ': {
        minHeight: 256,
        maxHeight: 512,
        fontSize: 16,
        borderRadius: '0 0 8px 8px !important',
      },
      '& .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items': {
        flexWrap: 'wrap !important',
      },
    },
  }),
  options
);

export default useStyles;

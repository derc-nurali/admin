import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const options = {
  name: 'app-gallery-uploader',
};

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: theme.palette.grey[700],
      textAlign: 'center',
      '& .MuiTypography-body3': {
        fontSize: 12,
      },
      '& .MuiButton-root': {
        minWidth: 168,
      },
    },
    area: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 160,
      marginBottom: theme.spacing(1),
      fontSize: 12,
      color: theme.palette.grey[600],
      cursor: 'pointer',
      borderRadius: 4,
      border: `1px dashed ${theme.palette.grey[500]}`,
      background: theme.palette.common.white,
    },
    areaOver: {
      borderColor: theme.palette.grey[700],
      background: theme.palette.grey[400],
    },
    preview: {
      position: 'relative',
      '& img': {
        maxWidth: '100%',
        borderRadius: 4,
      },
      '& .MuiIconButton-root': {
        position: 'absolute',
        top: 8,
        right: 8,
        color: theme.palette.common.white,
        background: theme.palette.error.main,
      },
    },
    helper: {
      fontSize: 12,
      textAlign: 'center',
      margin: 0,
    },
    error: {
      color: theme.palette.error.main,
    },
  }),
  options
);

export default useStyles;

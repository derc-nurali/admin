import { Button, styled } from '@material-ui/core';

export const OneIdButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(`#4825C2`),
  backgroundColor: '#4825C2',
  '&:hover': {
    backgroundColor: '#4024A2',
  },
}));

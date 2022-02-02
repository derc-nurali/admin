import { IconButton, SvgIcon } from '@material-ui/core';
import { ComponentType } from 'react';
import { IconNotification } from '../../icons';

export const HeaderNotification: ComponentType = () => {
  return (
    <IconButton>
      <SvgIcon
        component={IconNotification}
        viewBox="0 0 16 16"
        fontSize="small"
      />
    </IconButton>
  );
};

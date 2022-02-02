import {
  Avatar,
  Button,
  Hidden,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { map } from 'lodash';
import { ComponentType, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { USER_MENU } from '../../../constants/menus/user-menu-constants';
import { useOwner } from '../../../hooks';
import { IconCaret, IconUser } from '../../icons';
import { dynamicRoute } from '../../../utils/route-utils';
import useStyles from './styles';

export const HeaderOwner: ComponentType = () => {
  const classes = useStyles();
  const { ownerInfo } = useOwner();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleToggleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const items = map(USER_MENU, ({ path, label, labelKey }, idx) => (
    <MenuItem className={clsx(classes.item)} key={idx}>
      <Link to={dynamicRoute(path)} className={clsx(classes.link)}>
        <Typography component="span" variant="body3">
          {t(labelKey, label)}
        </Typography>
      </Link>
    </MenuItem>
  ));

  return (
    <>
      <Button
        onClick={handleToggleClick}
        className={clsx(classes.toggler)}
        size="small"
      >
        <Avatar
          className={clsx(classes.avatar)}
          src={ownerInfo?.avatar?.thumbnails?.small_c?.url}
        >
          <SvgIcon component={IconUser} viewBox="0 0 15 16" fontSize="small" />
        </Avatar>
        <Hidden mdDown>
          <Typography component="span" variant="body2">
            {ownerInfo?.displayName}
          </Typography>
          <SvgIcon
            className={clsx(classes.caret, { [classes.caretInverse]: open })}
            component={IconCaret}
            viewBox="0 0 10 6"
          />
        </Hidden>
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {items}
      </Menu>
    </>
  );
};

import { ComponentType, useState } from 'react';
import { map } from 'lodash';
import { useWorkflow } from '../../../hooks';
import { IconCaret } from '../../icons';
import { Button, Menu, MenuItem, SvgIcon, Typography } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './styles';

interface ProjectsDropdownProps {
  className?: string;
}

export const WorkflowDropdown: ComponentType<ProjectsDropdownProps> = ({
  className,
}) => {
  const classes = useStyles();
  const { data, id, name, updateById } = useWorkflow();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleToggleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (id: string | number) => {
    updateById(id);
    handleClose();
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Button
        onClick={handleToggleClick}
        className={clsx(classes.toggler)}
        size="small"
      >
        <Typography component="span" variant="body2">
          {name}
        </Typography>
        <SvgIcon
          className={clsx(classes.caret, { [classes.caretInverse]: open })}
          component={IconCaret}
          viewBox="0 0 10 6"
        />
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {map(data, ({ label, value }, idx) => (
          <MenuItem
            onClick={() => handleChange(value)}
            className={clsx(classes.menuItem, {
              [classes.active]: id === value,
            })}
            key={idx}
          >
            <Typography component="span" variant="body3">
              {label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

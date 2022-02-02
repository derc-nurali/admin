import { Button, Menu, MenuItem, SvgIcon, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { get, map, filter } from 'lodash';
import { ComponentType, useEffect, useState } from 'react';
import { useLanguage } from '../../hooks';
import { IconCaret } from '../icons';
import useStyles from './styles';

interface LangSwitcherProps {
  className?: string;
  variant?: 'list' | 'select';
}

export const LangSwitcher: ComponentType<LangSwitcherProps> = ({
  className,
  variant = 'list',
}) => {
  const classes = useStyles();
  const { currentLocale, locales, changeLang, getLocales } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const activeLocale = get(
    filter(locales, (x) => x.code === currentLocale),
    [0],
    null
  );
  const activeShortName = get(activeLocale, 'shortName', null);

  const handleToggleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLang = (locale: string) => {
    setAnchorEl(null);
    changeLang(locale);
  };

  useEffect(() => {
    getLocales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (variant === 'select') {
    return (
      <div className={clsx(classes.root, classes[variant], className)}>
        <Button
          onClick={handleToggleClick}
          className={clsx(classes.toggler)}
          size="small"
        >
          <Typography component="span" variant="body2">
            {activeShortName}
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
            horizontal: 27,
          }}
        >
          {map(locales, ({ code, shortName, name }, idx) => (
            <MenuItem
              onClick={() => handleChangeLang(code)}
              className={clsx(classes.menuItem, {
                [classes.active]: currentLocale === code,
              })}
              key={idx}
            >
              <Typography component="span" variant="body3">
                {shortName}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  return (
    <div className={clsx(classes.root, classes[variant], className)}>
      {map(locales, ({ code, shortName }, idx) => (
        <div
          onClick={() => changeLang(code)}
          className={clsx(classes.item, {
            [classes.active]: currentLocale === code,
          })}
          key={idx}
        >
          <Typography component="span" variant="body2">
            {shortName}
          </Typography>
        </div>
      ))}
    </div>
  );
};

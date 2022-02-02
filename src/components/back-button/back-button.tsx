import { Button, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '../../hooks';
import { IconArrowLeft } from '../icons';
import useStyles from './styles';

export const BackButton: ComponentType = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { history } = useRouter();

  const handleClick = () => history.go(-1);

  return (
    <div className={clsx(classes.root)}>
      <Button
        onClick={handleClick}
        variant="lever"
        color="info"
        size="small"
        startIcon={
          <SvgIcon
            component={IconArrowLeft}
            viewBox="0 0 9 16"
            color="info"
            sx={{ color: 'inherit' }}
          />
        }
        sx={{ marginLeft: -1 }}
      >
        {t('action.back', 'Назад')}
      </Button>
    </div>
  );
};

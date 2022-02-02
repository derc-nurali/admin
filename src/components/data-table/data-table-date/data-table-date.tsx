import { ComponentType } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface DataTableDateProps {
  date: string;
  label?: string;
  labelKey?: string;
  className?: string;
}

export const DataTableDate: ComponentType<DataTableDateProps> = ({
  date,
  label,
  labelKey,
  className,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const beforeTime = t('atTime', 'в');

  return (
    <div className={clsx(classes.root, className)}>
      {label && (
        <Typography component="span" variant="body3">
          {labelKey ? t(labelKey, label) : label}
        </Typography>
      )}{' '}
      <Typography
        component="span"
        variant="body3"
        className={clsx(classes.date)}
      >
        {moment(date).format(`D MMMM, ${beforeTime} HH:mm`)}
      </Typography>
    </div>
  );
};

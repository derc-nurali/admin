import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

interface DataTableTextProps {
  label: string;
  labelKey?: string;
}

export const DataTableText: ComponentType<DataTableTextProps> = ({
  label,
  labelKey,
}) => {
  const { t } = useTranslation();
  const text = labelKey ? t(labelKey, label) : label;

  return (
    <Typography variant="body2" component="span">
      {text}
    </Typography>
  );
};

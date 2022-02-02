import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

export const ErrorIndicator: ComponentType = () => {
  const { t } = useTranslation();

  return <div>{t('error')}</div>;
};

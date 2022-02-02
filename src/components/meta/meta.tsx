import { ComponentType } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { MetaDataProps } from '../../constants/app/meta-constants';

interface MetaProps {
  data: MetaDataProps;
}

export const Meta: ComponentType<MetaProps> = ({ data }) => {
  const { t } = useTranslation();
  const { title, titleKey } = data;

  return (
    <Helmet>
      <title>
        {t(titleKey, title)} | {t('app.title', 'Панель Администратора')}
      </title>
      {/* <meta name="description" content="Some description." /> */}
    </Helmet>
  );
};

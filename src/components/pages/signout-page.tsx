import { Container } from '@material-ui/core';
import { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { META_SIGNOUT } from '../../constants/app/meta-constants';
import { useAuth, useLanguage, useRouter } from '../../hooks';
import { useMeta } from '../../hooks/useMeta';
import { Meta } from '../meta';
import { PageTitle } from '../page-title';

export const SignoutPage: ComponentType = () => {
  const { t } = useTranslation();
  const { meta } = useMeta(META_SIGNOUT);
  const { logoutAuth, isSignedIn } = useAuth();
  const { currentLocale } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) logoutAuth();
  }, [logoutAuth, isSignedIn]);

  useEffect(() => {
    if (!isSignedIn) router.push(`/${currentLocale}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <>
      <Meta data={meta} />
      <Container>
        <PageTitle title={t('signOut', 'Выйти')} />
      </Container>
    </>
  );
};

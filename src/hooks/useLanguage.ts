import { useTranslation } from 'react-i18next';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useRouter } from './useRouter';
import { getHits } from '../thunks/locale-thunks';
import { currentLocaleActions } from '../slices/current-locale-slice';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const router = useRouter();
  const { hits: locales } = useSelector(
    (state: RootStateOrAny) => state.locale
  );

  const currentLocale = i18n.language;

  const changeLang = (locale: string) => {
    i18n.changeLanguage(locale).then(() => {
      changeStoreLang(locale);
      router.replace(`/${locale}${router.asPath}`);
    });
  };

  const changeStoreLang = (locale: string) => {
    dispatch(currentLocaleActions.setCurrentLocale(locale));
  };

  const getLocales = () => dispatch(getHits());

  return { currentLocale, locales, changeLang, changeStoreLang, getLocales };
};

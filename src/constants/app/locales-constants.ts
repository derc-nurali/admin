export const LOCALE_RU = 'ru';
export const LOCALE_EN = 'en';
export const LOCALE_OZ = 'oz';
export const LOCALE_UZ = 'uz';

export const LOCALES_MAP: Record<string, any> = {
  [LOCALE_OZ]: { shortName: "O'zb", name: "O'zbekcha" },
  [LOCALE_UZ]: { shortName: 'Ўзб', name: 'Ўзбекча' },
  [LOCALE_RU]: { shortName: 'Рус', name: 'Русский' },
  [LOCALE_EN]: { shortName: 'Eng', name: 'English' },
};

export type LocaleProps = keyof typeof LOCALES_MAP;

export const LOCALES = Object.keys(LOCALES_MAP) as LocaleProps[];

export const DEFAULT_LOCALE: LocaleProps = LOCALE_RU;

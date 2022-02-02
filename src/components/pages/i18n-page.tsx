import { ComponentType } from 'react';
import { META_I18N } from '../../constants/app/meta-constants';
import { authorized } from '../../hocs';
import { useMeta } from '../../hooks/useMeta';
import { Meta } from '../meta';
import { Translations } from '../translations';

export const i18nPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_I18N);

  return (
    <>
      <Meta data={meta} />
      <Translations />
    </>
  );
});

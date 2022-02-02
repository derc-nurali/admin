import { ComponentType } from 'react';
import { META_FAQ } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { FaqEdit } from '../../faq';

export const FaqCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_FAQ);

  return (
    <>
      <Meta data={meta} />
      <FaqEdit />
    </>
  );
});

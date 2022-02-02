import { ComponentType } from 'react';
import { META_VACANCIES } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { FaqEdit } from '../../faq';

export const FaqEditPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_VACANCIES);

  return (
    <>
      <Meta data={meta} />
      <FaqEdit />
    </>
  );
});

import { ComponentType } from 'react';
import { META_FEEDBACK } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { Feedback } from '../../feedback';

export const FeedbackListPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_FEEDBACK);

  return (
    <>
      <Meta data={meta} />
      <Feedback />
    </>
  );
});

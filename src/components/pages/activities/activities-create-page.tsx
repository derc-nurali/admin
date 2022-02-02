import { ComponentType } from 'react';
import { META_ACTIVITIES } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { ActivitiesEdit } from '../../activities';

export const ActivitiesCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_ACTIVITIES);

  return (
    <>
      <Meta data={meta} />
      <ActivitiesEdit />
    </>
  );
});

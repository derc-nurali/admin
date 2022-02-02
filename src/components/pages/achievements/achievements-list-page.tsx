import { ComponentType } from 'react';
import { META_ACHIEVEMENTS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { Achievements } from '../../achievements';

export const AchievementsListPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_ACHIEVEMENTS);

  return (
    <>
      <Meta data={meta} />
      <Achievements />
    </>
  );
});

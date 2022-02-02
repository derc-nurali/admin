import { ComponentType } from 'react';
import { META_SUBDIVISIONS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { Subdivisions } from '../../subdivisions';

export const SubdivisionsListPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_SUBDIVISIONS);

  return (
    <>
      <Meta data={meta} />
      <Subdivisions />
    </>
  );
});

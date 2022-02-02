import { ComponentType } from 'react';
import { META_MEDIALIB } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { Medialib } from '../../medialib';

export const MedialibListPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_MEDIALIB);

  return (
    <>
      <Meta data={meta} />
      <Medialib />
    </>
  );
});

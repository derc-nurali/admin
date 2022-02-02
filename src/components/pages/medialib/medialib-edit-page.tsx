import { ComponentType } from 'react';
import { META_MEDIALIB } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { MedialibEdit } from '../../medialib';

export const MedialibEditPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_MEDIALIB);

  return (
    <>
      <Meta data={meta} />
      <MedialibEdit />
    </>
  );
});

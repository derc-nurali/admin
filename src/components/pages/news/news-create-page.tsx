import { ComponentType } from 'react';
import { META_NEWS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { NewsEdit } from '../../news';

export const NewsCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_NEWS);

  return (
    <>
      <Meta data={meta} />
      <NewsEdit />
    </>
  );
});

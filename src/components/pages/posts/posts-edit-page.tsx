import { ComponentType } from 'react';
import { META_POSTS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { PostsEdit } from '../../posts';

export const PostsEditPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_POSTS);

  return (
    <>
      <Meta data={meta} />
      <PostsEdit />
    </>
  );
});

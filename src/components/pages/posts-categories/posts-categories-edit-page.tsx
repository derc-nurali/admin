import { ComponentType } from 'react';
import { META_POSTS_CATEGORIES } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { PostsCategoriesEdit } from '../../posts-categories';

export const PostsCategoriesEditPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_POSTS_CATEGORIES);

  return (
    <>
      <Meta data={meta} />
      <PostsCategoriesEdit />
    </>
  );
});

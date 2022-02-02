import i18n from 'i18next';
import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../../thunks/post-category-thunks';
import { map, get } from 'lodash';
import { AppTags } from '../../inputs';
import { ENTITY_POST_CATEGORY } from '../../../constants/app/entity-constants';

interface PostsCategoriesTagsProps {
  className?: string;
  locale?: string;
  value?: string[];
  onChange?: (value: any[]) => void;
}

export const PostsCategoriesTags: ComponentType<PostsCategoriesTagsProps> = ({
  locale = i18n.language,
  ...props
}) => {
  const dispatch = useDispatch();
  const { nodes } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_POST_CATEGORY]
  );

  const data = map(nodes.hits, (x) => ({
    label: get(x, ['title', locale]),
    value: x.id,
  }));

  useEffect(() => {
    dispatch(getNodes());
  }, [dispatch]);

  return <AppTags {...props} data={data} />;
};

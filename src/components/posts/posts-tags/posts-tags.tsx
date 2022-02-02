import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { map, includes } from 'lodash';
import { addTag, getTags } from '../../../thunks/service-thunks';
import { AppTagsExtended, AppTagsExtendedProps } from '../../inputs';
import { ENTITY_POST } from '../../../constants/app/entity-constants';

interface PostsTagsProps extends Omit<AppTagsExtendedProps, 'data'> {
  locale: string;
}

export const PostsTags: ComponentType<PostsTagsProps> = ({
  locale,
  onChange,
  ...props
}) => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state: RootStateOrAny) => state[ENTITY_POST]);
  const allTags = map(tags[locale], (x) => ({ label: x, value: x }));

  const handleChange = (value: any[]) => {
    for (const val of value) {
      if (!includes(tags[locale], val)) {
        dispatch(addTag(locale, val));
      }
    }
    if (onChange) onChange(value);
  };

  useEffect(() => {
    if (locale) dispatch(getTags(locale));
  }, [dispatch, locale]);

  useEffect(() => {
    if (locale) dispatch(getTags(locale));
  }, [dispatch, locale]);

  return <AppTagsExtended {...props} data={allTags} onChange={handleChange} />;
};

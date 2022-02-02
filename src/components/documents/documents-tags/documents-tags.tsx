import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { map, includes } from 'lodash';
import { addTag, getTags } from '../../../thunks/document-thunks';
import { AppTagsExtended, AppTagsExtendedProps } from '../../inputs';
import { ENTITY_DOCUMENT } from '../../../constants/app/entity-constants';

interface NewsTagsProps extends Omit<AppTagsExtendedProps, 'data'> {
  locale: string;
}

export const DocumentsTags: ComponentType<NewsTagsProps> = ({
  locale,
  onChange,
  ...props
}) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_DOCUMENT]
  );
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

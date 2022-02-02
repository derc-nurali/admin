import { ComponentType } from 'react';
import { AppTagRadio } from '../../inputs';
import { OPTIONS_MEDIALIB_CATEGORY } from '../../../constants/app/action-options-constants';

interface MedialibTagsProps {
  className?: string;
  locale?: string;
  value?: any;
  onChange?: (value: any[]) => void;
}

export const MedialibCategoryTags: ComponentType<MedialibTagsProps> = (
  props
) => {
  return <AppTagRadio {...props} data={OPTIONS_MEDIALIB_CATEGORY} />;
};

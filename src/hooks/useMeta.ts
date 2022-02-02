import { get } from 'lodash';
import { META } from '../constants/app/meta-constants';

export const useMeta = (metaKey: string) => {
  const defaultMeta = { title: '', titleKey: '' };
  const meta = get(META, metaKey, defaultMeta);
  return { meta };
};

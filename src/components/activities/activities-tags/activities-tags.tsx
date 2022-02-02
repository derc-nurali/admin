import i18n from 'i18next';
import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../../thunks/activity-thunks';
import { map } from 'lodash';
import { ENTITY_ACTIVITY } from '../../../constants/app/entity-constants';
import { AppTags } from '../../inputs';

interface ActivitiesTagsProps {
  className?: string;
  locale?: string;
  value?: string[];
  onChange?: (value: any[]) => void;
}

export const ActivitiesTags: ComponentType<ActivitiesTagsProps> = ({
  locale = i18n.language,
  ...props
}) => {
  const dispatch = useDispatch();
  const { nodes } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_ACTIVITY]
  );
  const data = map(nodes[locale], (x) => ({
    label: x.shortTitle,
    value: x.id,
  }));

  useEffect(() => {
    dispatch(getNodes(locale));
  }, [dispatch, locale]);

  return <AppTags {...props} data={data} />;
};

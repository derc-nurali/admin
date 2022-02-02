import i18n from 'i18next';
import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../../thunks/project-thunks';
import { map } from 'lodash';
import { AppTags } from '../../inputs';
import { ENTITY_PROJECT } from '../../../constants/app/entity-constants';

interface ProjectTagsProps {
  className?: string;
  locale?: string;
  value?: string[];
  onChange?: (value: any[]) => void;
}

export const ProjectsTags: ComponentType<ProjectTagsProps> = ({
  locale = i18n.language,
  ...props
}) => {
  const dispatch = useDispatch();
  const { nodes } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_PROJECT]
  );
  const data = map(nodes[locale], (x) => ({
    label: x.name,
    value: x.id,
  }));

  useEffect(() => {
    dispatch(getNodes(locale));
  }, [dispatch, locale]);

  return <AppTags {...props} data={data} />;
};

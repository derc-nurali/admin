import i18n from 'i18next';
import { ComponentType, useEffect } from 'react';
import { SelectForm, SelectFormProps } from '../../forms';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ENTITY_PROJECT } from '../../../constants/app/entity-constants';
import { map } from 'lodash';
import { getNodes } from '../../../thunks/project-thunks';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@material-ui/core';
import { IconSort } from '../../icons';

interface ProjectsSelectFormProps extends SelectFormProps {
  locale?: string;
}

export const ProjectsSelectForm: ComponentType<ProjectsSelectFormProps> = ({
  locale = i18n.language,
  ...props
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

  return (
    <SelectForm
      {...props}
      data={data}
      name="projects"
      label={t('project', 'Проект')}
      icon={
        <SvgIcon component={IconSort} viewBox="0 0 16 12" fontSize="small" />
      }
    />
  );
};

import { ComponentType } from 'react';
import { map } from 'lodash';
import { DEPARTMENT_OPTIONS } from '../../../constants/app/department-options';
import { useTranslation } from 'react-i18next';
import { AppTagRadio } from '../../inputs';

interface DepartmentsTagsProps {
  className?: string;
  value?: any;
  onChange?: (value: any) => void;
}

export const DepartmentsTags: ComponentType<DepartmentsTagsProps> = (props) => {
  const { t } = useTranslation();
  const data = map(DEPARTMENT_OPTIONS, ({ label, labelKey, value }) => ({
    label: t(labelKey, label),
    value,
  }));

  return <AppTagRadio {...props} data={data} />;
};

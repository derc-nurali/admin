import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ENTITY_ORGANIZATION } from '../../../constants/app/entity-constants';
import { map } from 'lodash';
import { getNodes } from '../../../thunks/organization-thunks';
import { AppSelect } from '../../inputs';

interface OrganizationsSelectProps {
  className?: string;
  id?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  label?: string;
  placeholder?: string;
  value?: any;
  prompt?: string | boolean;
  locale: string;
  onChange?: (e: any) => void;
}

export const OrganizationsSelect: ComponentType<OrganizationsSelectProps> = ({
  locale,
  ...props
}) => {
  const dispatch = useDispatch();
  const { nodes } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_ORGANIZATION]
  );
  const data = map(nodes[locale], (x) => ({
    label: x.name,
    value: x.id,
  }));

  useEffect(() => {
    dispatch(getNodes(locale));
  }, [dispatch, locale]);

  return <AppSelect {...props} data={data} />;
};

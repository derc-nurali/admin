import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ENTITY_SUBDIVISION } from '../../../constants/app/entity-constants';
import { map } from 'lodash';
import { getParents } from '../../../thunks/subdivision-thunks';
import { AppSelect } from '../../inputs';

interface SubdivisionsParentSelectProps {
  className?: string;
  id?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  label?: string;
  placeholder?: string;
  value?: any;
  prompt?: string | boolean;
  locale: string;
  exclude?: any[];
  onChange?: (e: any) => void;
}

export const SubdivisionsParentSelect: ComponentType<SubdivisionsParentSelectProps> =
  ({ exclude = [], locale, ...props }) => {
    const dispatch = useDispatch();
    const { parents } = useSelector(
      (state: RootStateOrAny) => state[ENTITY_SUBDIVISION]
    );
    const data = map(parents[locale], (x) => ({
      label: x.title,
      value: x.id,
    })).filter((x) => !exclude?.includes(x.value));

    useEffect(() => {
      dispatch(getParents(locale));
    }, [dispatch, locale]);

    return <AppSelect {...props} data={data} />;
  };

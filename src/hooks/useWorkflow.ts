import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { find, map, get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { updateFlow } from '../thunks/workflow-thunks';

export const useWorkflow = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { projects, flow } = useSelector(
    (state: RootStateOrAny) => state.workflow
  );

  const data = map(projects, (x: any) => ({
    label: x.name,
    value: x.id,
  }));

  const item = find(projects, (x) => x.code === flow);
  const id = get(item, 'id', null);
  const name = get(item, 'name', t('choose', 'Выбрать'));

  const update = (code: string) => dispatch(updateFlow(code));

  const updateById = (id: string | number) => {
    const item = find(projects, (x: any) => x.id === Number(id));
    const code = get(item, 'code', null);
    update(code);
  };

  return {
    data,
    projects,
    flow: process.env.REACT_APP_SINGLE_PROJECT || flow,
    id,
    name,
    update,
    updateById,
  };
};

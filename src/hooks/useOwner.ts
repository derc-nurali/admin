import { RootStateOrAny, useSelector } from 'react-redux';
import { filterJoinArr } from '../utils/data-utils';

export const useOwner = () => {
  const { info } = useSelector((state: RootStateOrAny) => state.owner);
  const displayName = filterJoinArr([info?.lastName, info?.firstName], ' ');
  const ownerInfo = { ...info, displayName };
  return { ownerInfo };
};

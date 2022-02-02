import { ComponentType } from 'react';
import { META_SUPERUSERS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { SuperUserEdit } from '../../super-users';

export const SuperusersCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_SUPERUSERS);

  return (
    <>
      <Meta data={meta} />
      <SuperUserEdit />
    </>
  );
});

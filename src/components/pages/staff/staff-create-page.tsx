import { ComponentType } from 'react';
import { META_STAFF } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { StaffEdit } from '../../staff';

export const StaffCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_STAFF);

  return (
    <>
      <Meta data={meta} />
      <StaffEdit />
    </>
  );
});

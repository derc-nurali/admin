import { ComponentType } from 'react';
import { META_ORGANIZATIONS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { OrganizationsEdit } from '../../organizations';

export const OrganizationsEditPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_ORGANIZATIONS);

  return (
    <>
      <Meta data={meta} />
      <OrganizationsEdit />
    </>
  );
});

import { ComponentType } from 'react';
import { META_ORGANIZATIONS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { Organizations } from '../../organizations';

export const OrganizationsListPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_ORGANIZATIONS);

  return (
    <>
      <Meta data={meta} />
      <Organizations />
    </>
  );
});

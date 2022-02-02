import { ComponentType } from 'react';
import { META_SERVICE } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { Services } from '../../services';

export const ServicesListPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_SERVICE);

  return (
    <>
      <Meta data={meta} />
      <Services />
    </>
  );
});

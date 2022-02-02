import { ComponentType } from 'react';
import { META_SERVICE } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { ServicesEdit } from '../../services';

export const ServicesCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_SERVICE);

  return (
    <>
      <Meta data={meta} />
      <ServicesEdit />
    </>
  );
});

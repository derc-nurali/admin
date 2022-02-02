import { ComponentType } from 'react';
import { META_PORTFOLIO } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { PortfolioEdit } from '../../portfolio';

export const PortfolioCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_PORTFOLIO);

  return (
    <>
      <Meta data={meta} />
      <PortfolioEdit />
    </>
  );
});

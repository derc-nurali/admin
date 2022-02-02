import { ComponentType } from 'react';
import { META_DASHBOARD } from '../../constants/app/meta-constants';
import { authorized } from '../../hocs';
import { useMeta } from '../../hooks/useMeta';
import { Meta } from '../meta';
import { Dashboard } from '../dashboard';

export const DashboardPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_DASHBOARD);

  return (
    <>
      <Meta data={meta} />
      <Dashboard />
    </>
  );
});

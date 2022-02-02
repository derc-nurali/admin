import { ComponentType } from 'react';
import { META_HOME } from '../../constants/app/meta-constants';
import { useMeta } from '../../hooks/useMeta';
import { SignIn } from '../auth';
import { Meta } from '../meta';

export const HomePage: ComponentType = () => {
  const { meta } = useMeta(META_HOME);

  return (
    <>
      <Meta data={meta} />
      <SignIn />
    </>
  );
};

import { ComponentType } from 'react';
import { META_PROJECTS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { ProjectsEdit } from '../../projects';

export const ProjectsEditPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_PROJECTS);

  return (
    <>
      <Meta data={meta} />
      <ProjectsEdit />
    </>
  );
});

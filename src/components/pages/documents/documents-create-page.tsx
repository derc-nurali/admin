import { ComponentType } from 'react';
import { META_DOCUMENTS } from '../../../constants/app/meta-constants';
import { authorized } from '../../../hocs';
import { useMeta } from '../../../hooks/useMeta';
import { Meta } from '../../meta';
import { DocumentsEdit } from '../../documents';

export const DocumentsCreatPage: ComponentType = authorized()(() => {
  const { meta } = useMeta(META_DOCUMENTS);

  return (
    <>
      <Meta data={meta} />
      <DocumentsEdit />
    </>
  );
});

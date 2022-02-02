import { ComponentType, useEffect, useState } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { get } from 'lodash';
import { Loader } from '../../loader';
import { ApiMedia } from '../../../http';
import { IconButton, SvgIcon } from '@material-ui/core';
import { IconTrash } from '../../icons';

interface ArchiveNodeProps {
  apiService: { fetchOne: (id: any) => Promise<any> };
  id: number;
  displayField: string;
  className?: string;
  onDelete?: (id: any) => void;
}

export const ArchiveNode: ComponentType<ArchiveNodeProps> = ({
  apiService,
  id,
  displayField,
  className,
  onDelete,
}) => {
  const classes = useStyles();
  const [node, setNode] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const title = get(node, displayField, 'Неверное поле displayField');

  const handleFetch = (id: any) => {
    setIsLoading(true);
    if (apiService?.fetchOne) {
      apiService
        .fetchOne(id)
        .then((res: any) => setNode(res))
        .finally(() => setIsLoading(false));
    }
  };

  const handleMedia = (id: any) => {
    ApiMedia.fetchOne(id).then(({ thumbnails }: any) => {
      if (thumbnails?.medium_c?.url) setPreview(thumbnails?.medium_c?.url);
    });
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };

  useEffect(() => {
    const mediaId = get(node, 'cover', null);
    if (mediaId) handleMedia(mediaId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  useEffect(() => {
    if (id) handleFetch(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return (
      <div className={clsx(classes.root, className)}>
        <Loader className={clsx(classes.loader)} />
      </div>
    );
  }

  return (
    <div className={clsx(classes.root, className)}>
      {preview && <img src={preview} alt="" />}
      <div className={clsx(classes.footer)}>{title}</div>
      <IconButton onClick={handleDelete}>
        <SvgIcon component={IconTrash} viewBox="0 0 16 16" fontSize="small" />
      </IconButton>
    </div>
  );
};

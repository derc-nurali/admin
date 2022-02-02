import { ComponentType, useEffect, useState } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { generateID } from '../../../utils/data-utils';
import { useTranslation } from 'react-i18next';
import { isEmpty, map, filter } from 'lodash';
import {
  Button,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import { isFileImage, reduceImagFileSize } from '../../../utils/file-utils';
import { ApiMedia } from '../../../http';
import { Loader } from '../../loader';
import { IconTrash } from '../../icons';
import { useDialog } from '../../../hooks';
import { ConfirmDialog, MedialibDialog } from '../../dialogs';

interface AppGalleryUploaderProps {
  className?: string;
  ids?: any[];
  hint?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (ids: any[]) => void;
}

export const AppGalleryUploader: ComponentType<AppGalleryUploaderProps> = ({
  className,
  ids = [],
  hint,
  error = false,
  helperText,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openArchive] = useDialog(MedialibDialog);
  const [openConfirmation] = useDialog(ConfirmDialog);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>('');
  const [previews, setPreviews] = useState<any[]>([]);
  const [inputId, setInputId] = useState('files');
  const [isUploading, setIsUploading] = useState(false);

  const handleSelect = (incomeIds: any[]) => {
    if (onChange && !isEmpty(incomeIds)) onChange([...ids, ...incomeIds]);
  };

  const handleArchive = () => {
    openArchive({
      onSelect: handleSelect,
    });
  };

  const handleDragEnter = () => setIsOver(true);
  const handleDragLeave = () => setIsOver(false);
  const handleDragOver = (e: any) => {
    e.preventDefault();
    if (!isOver) setIsOver(true);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
    setIsOver(false);
  };

  const handleChange = (e: any) => handleUpload(e.target.files);

  const handleUpload = async (files: File[]) => {
    if (isEmpty(files)) return;

    setLocalError('');
    const hasNoneImage = filter(files, (item) => !isFileImage(item));
    if (!isEmpty(hasNoneImage)) {
      setLocalError('Один или несколько файлов не являются картинкой');
      return;
    }

    setIsUploading(true);
    return Promise.all(
      map(files, async (item: File) => {
        if (!isFileImage(item)) return;
        const file: any = await reduceImagFileSize({ file: item });
        const formData = new FormData();
        formData.append('file', file);
        return ApiMedia.createOne(formData);
      })
    )
      .then((res: any) => {
        handleSelect(map(res, (item) => item.id));
      })
      .finally(() => {
        const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
        if (input && input.value) input.value = '';
        setIsUploading(false);
      });
  };

  const handleDelete = (idx: number) => {
    openConfirmation({
      resolve: () => {
        const newIds = [...ids];
        const newPreviews = [...previews];
        newIds.splice(idx, 1);
        newPreviews.splice(idx, 1);
        setPreviews(newPreviews);
        if (onChange) onChange(newIds);
      },
    });
  };

  const handleFetch = (ids: any) => {
    if (isEmpty(ids)) return;

    setIsUploading(true);
    return Promise.all(
      map(ids, async (id: any) => {
        return ApiMedia.fetchOne(id);
      })
    )
      .then((res: any) => {
        const views = map(
          res,
          ({ thumbnails }: any) => thumbnails?.medium_c?.url
        );
        setPreviews(views);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  useEffect(() => {
    if (!isEmpty(ids)) {
      handleFetch(ids);
    }
  }, [ids]);

  useEffect(() => {
    setInputId(`files-${generateID('gallery_')}`);
  }, []);

  useEffect(() => {
    if (helperText && error) setLocalError(helperText);
  }, [helperText, error]);

  const items = () => {
    if (isEmpty(previews)) return;

    const grids = map(previews, (src: string, idx: number) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
        <div className={clsx(classes.preview)}>
          <img src={src} alt="" />
          <IconButton onClick={() => handleDelete(idx)}>
            <SvgIcon
              component={IconTrash}
              viewBox="0 0 16 16"
              fontSize="small"
            />
          </IconButton>
        </div>
      </Grid>
    ));

    return (
      <Grid container spacing={2} mb={2}>
        {grids}
      </Grid>
    );
  };

  return (
    <div className={clsx(classes.root, className)}>
      {items()}
      {isUploading ? (
        <Loader />
      ) : (
        <>
          <label
            htmlFor={inputId}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className={clsx(classes.area, {
              [classes.areaOver]: isOver,
            })}
          >
            {t('dragFilesHere', 'Перенесите файлы сюда')}
          </label>
          <Typography variant="body3" component="div" mb={1}>
            {t('or', 'или')}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                color="info"
                size="small"
                component="label"
                htmlFor={inputId}
              >
                {t('upload.files', 'Загрузить файлы')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleArchive}
                variant="contained"
                color="info"
                size="small"
              >
                {t('choose.archive', 'Выбрать из архива')}
              </Button>
            </Grid>
          </Grid>
          {hint && (
            <Typography variant="body3" component="div" mt={1}>
              {hint}
            </Typography>
          )}
          {localError && (
            <Typography
              className={clsx(classes.error)}
              variant="body2"
              component="div"
              mt={1}
            >
              {localError}
            </Typography>
          )}
        </>
      )}

      <input
        style={{ display: 'none' }}
        onChange={handleChange}
        id={inputId}
        multiple
        type="file"
      />
    </div>
  );
};

import { ComponentType, useEffect, useState } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { isEmpty, get } from 'lodash';
import { generateID } from '../../../utils/data-utils';
import { ApiMedia } from '../../../http';
import {
  Button,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import { IconTrash } from '../../icons';
import { Loader } from '../../loader';
import { reduceImagFileSize } from '../../../utils/file-utils';
import { useDialog } from '../../../hooks';
import { ConfirmDialog, MedialibDialog } from '../../dialogs';

interface AppUploaderProps {
  className?: string;
  id?: any;
  hint?: string;
  onChange?: (id: any) => void;
}

export const AppUploader: ComponentType<AppUploaderProps> = ({
  className,
  id,
  hint,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openArchive] = useDialog(MedialibDialog);
  const [openConfirmation] = useDialog(ConfirmDialog);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState('');
  const [inputId, setInputId] = useState('file');
  const [isUploading, setIsUploading] = useState(false);

  const handleSelect = (id: any) => {
    if (onChange) onChange(id);
  };

  const handleArchive = () => {
    openArchive({
      onSelect: handleSelect,
      single: true,
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

    setError('');
    setIsUploading(true);
    const file: any = await reduceImagFileSize({ file: files[0] });

    const formData = new FormData();
    formData.append('file', file);
    ApiMedia.createOne(formData)
      .then((res: any) => {
        handleSelect(res.id);
      })
      .catch(({ message }) => setError(get(message, [file, 0])))
      .finally(() => {
        const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
        if (input && input.value) input.value = '';
        setIsUploading(false);
      });
  };

  const handleDelete = () => {
    if (!id) return;

    openConfirmation({
      resolve: () => {
        setPreview('');
        handleSelect(null);
      },
    });
  };

  const handleFetch = (id: any) => {
    if (!id) return;
    setIsUploading(true);
    ApiMedia.fetchOne(id)
      .then((res: any) => {
        setPreview(res?.thumbnails?.medium_c?.url);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  useEffect(() => {
    if (id) {
      handleFetch(id);
    }
  }, [id]);

  useEffect(() => {
    setInputId(`file-${generateID()}`);
  }, []);

  if (isUploading) {
    return (
      <div className={clsx(classes.root, className)}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={clsx(classes.root, className)}>
      {preview ? (
        <div className={clsx(classes.preview)}>
          <img src={preview} alt="" />
          {id && (
            <IconButton onClick={handleDelete}>
              <SvgIcon
                component={IconTrash}
                viewBox="0 0 16 16"
                fontSize="small"
              />
            </IconButton>
          )}
        </div>
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
            {t('dragFileHere', 'Перенесите файл сюда')}
          </label>
          <Typography variant="body3" component="div" mb={1}>
            {t('or', 'или')}
          </Typography>
        </>
      )}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button
            variant="outlined"
            color="info"
            size="small"
            component="label"
            htmlFor={inputId}
          >
            {t('upload.file', 'Загрузить файл')}
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
      {error && (
        <Typography
          className={clsx(classes.error)}
          variant="body2"
          component="div"
          mt={1}
        >
          {error}
        </Typography>
      )}
      <input
        style={{ display: 'none' }}
        onChange={handleChange}
        id={inputId}
        type="file"
      />
    </div>
  );
};

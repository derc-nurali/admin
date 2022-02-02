import { ComponentType, useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { generateID } from '../../../utils/data-utils';
import { get, isEmpty } from 'lodash';
import { reduceImagFileSize } from '../../../utils/file-utils';
import { useDialog } from '../../../hooks';
import { ConfirmDialog } from '../../dialogs';
import { Loader } from '../../loader';
import { ApiMedia } from '../../../http';

interface AppFileProps {
  className?: string;
  id?: any;
  onChange?: (id: any) => void;
}

export const AppFile: ComponentType<AppFileProps> = ({
  className,
  id,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const defaultLabel = t('choose', 'Выбрать');
  const [openConfirmation] = useDialog(ConfirmDialog);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [fileName, setFileName] = useState<string>(defaultLabel);
  const [inputId, setInputId] = useState('doc');
  const [isUploading, setIsUploading] = useState(false);

  const handleSelect = ({ id, filename }: any) => {
    setFileName(filename);
    if (onChange) onChange(id);
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
      .then(handleSelect)
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
        handleSelect({ id: null, filename: defaultLabel });
      },
    });
  };

  const handleFetch = (id: any) => {
    if (!id) return;
    setIsUploading(true);
    ApiMedia.fetchOne(id)
      .then(handleSelect)
      .finally(() => {
        setIsUploading(false);
      });
  };

  useEffect(() => {
    setFileName(defaultLabel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      handleFetch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setInputId(`file-${generateID('doc_')}`);
  }, []);

  if (isUploading) {
    return (
      <div className={clsx(classes.root, className)}>
        <Loader size={32} />
      </div>
    );
  }

  if (id) {
    return (
      <div className={clsx(classes.root, className)}>
        <Grid container alignItems="center">
          <Grid item flex={1}>
            <div className={clsx(classes.label)}>{fileName}</div>
          </Grid>
          <Grid item>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              size="small"
            >
              {t('action.delete', 'Удалить')}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <label
      htmlFor={inputId}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      className={clsx(classes.root, className, {
        [classes.rootOver]: isOver,
      })}
    >
      <Grid container alignItems="center">
        <Grid item flex={1}>
          <div className={clsx(classes.label)}>{fileName}</div>
          {error && <small className={clsx(classes.error)}>{error}</small>}
        </Grid>
        <Grid item>
          <LoadingButton
            variant="contained"
            color="info"
            size="small"
            component="label"
            htmlFor={inputId}
          >
            {t('upload.file', 'Загрузить файл')}
          </LoadingButton>
        </Grid>
      </Grid>
      <input
        style={{ display: 'none' }}
        onChange={handleChange}
        id={inputId}
        type="file"
      />
    </label>
  );
};

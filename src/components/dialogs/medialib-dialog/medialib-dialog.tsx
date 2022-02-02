import { ComponentType } from 'react';
import { AppDialog, DialogProps } from '../app-dialog';
import { MedialibArchive } from '../../medialib';
import { useTranslation } from 'react-i18next';

interface MedialibDialogProps extends DialogProps {
  single: boolean;
  onSelect: (ids: any[]) => void;
}

export const MedialibDialog: ComponentType<MedialibDialogProps> = ({
  popDialog,
  single = false,
  onSelect,
  ...props
}) => {
  const { t } = useTranslation();

  const handleSelect = (ids: any[]) => {
    if (onSelect) onSelect(ids);
    popDialog();
  };
  return (
    <AppDialog
      maxWidth="100%"
      title={t('medialib', 'Медиатека')}
      {...{ ...props, popDialog }}
    >
      <MedialibArchive onSelect={handleSelect} selectable single={single} />
    </AppDialog>
  );
};

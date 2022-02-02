import { ComponentType } from 'react';
import { AppDialog, DialogProps } from '../app-dialog';
import { useTranslation } from 'react-i18next';
import { Archive } from '../../archive';

interface MedialibDialogProps extends DialogProps {
  apiService: any;
  displayField: string;
  single: boolean;
  locale?: string;
  onSelect: (ids: any[]) => void;
}

export const ArchiveDialog: ComponentType<MedialibDialogProps> = ({
  popDialog,
  apiService,
  displayField,
  single = false,
  locale,
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
      title={t('archive', 'Архив')}
      {...{ ...props, popDialog }}
    >
      <Archive
        apiService={apiService}
        displayField={displayField}
        onSelect={handleSelect}
        locale={locale}
        single={single}
        selectable
      />
    </AppDialog>
  );
};

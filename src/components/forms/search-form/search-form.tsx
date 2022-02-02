import { ComponentType } from 'react';
import { Hidden, IconButton, SvgIcon } from '@material-ui/core';
import { IconSearch } from '../../icons';
import { useTranslation } from 'react-i18next';
import { useDialog } from '../../../hooks';
import { SearchDialog } from '../../dialogs';
import { SearchFormInner, SearchFormInnerProps } from './search-form-inner';

export const SearchForm: ComponentType<SearchFormInnerProps> = (props) => {
  const { t } = useTranslation();
  const [openDialog] = useDialog(SearchDialog);

  const handleOpenForm = () => {
    openDialog({
      title: t('search', 'Поиск'),
      ...props,
    });
  };

  const mobileView = (
    <IconButton onClick={handleOpenForm} color="info">
      <SvgIcon component={IconSearch} viewBox="0 0 16 16" fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Hidden smUp>{mobileView}</Hidden>
      <Hidden smDown>
        <SearchFormInner {...props} />
      </Hidden>
    </>
  );
};

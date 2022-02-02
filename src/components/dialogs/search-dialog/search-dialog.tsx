import { ComponentType } from 'react';
import { FormikValues } from 'formik/dist/types';
import { AppDialog, DialogProps } from '../app-dialog';
import { SearchFormInner, SearchFormInnerProps } from '../../forms';

export const SearchDialog: ComponentType<SearchFormInnerProps & DialogProps> =
  ({ popDialog, ...props }) => {
    const { onSubmit, ...formProps } = props;
    const handleSubmit = (values: FormikValues) => {
      if (onSubmit) onSubmit(values);
      popDialog();
    };

    return (
      <AppDialog {...{ ...props, popDialog }}>
        <SearchFormInner {...formProps} onSubmit={handleSubmit} />
      </AppDialog>
    );
  };

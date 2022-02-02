import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import { CKEDITOR5_CONFIG } from './config';
import { ComponentType } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { Collapse, Fade, FormHelperText } from '@material-ui/core';

interface AppEditorProps {
  value?: any;
  error?: boolean;
  helperText?: string;
  errorAppearance?: 'collapse' | 'fade';
  onReady?: (e: any) => void;
  onChange?: (e: any, editor: any) => void;
  onBlur?: (e: any, editor: any) => void;
  onFocus?: (e: any, editor: any) => void;
}

export const AppEditor: ComponentType<AppEditorProps> = ({
  value = '',
  error = false,
  helperText,
  errorAppearance = 'collapse',
  ...props
}) => {
  const classes = useStyles();

  const helper = () => {
    const text = (
      <FormHelperText
        error={error}
        component="div"
        style={{ textAlign: 'right' }}
      >
        {helperText}
      </FormHelperText>
    );

    if (errorAppearance === 'fade') {
      return <Fade in={!!helperText}>{text}</Fade>;
    }

    return <Collapse in={!!helperText}>{text}</Collapse>;
  };

  return (
    <div className={clsx(classes.root)}>
      <CKEditor
        editor={CustomEditor}
        config={CKEDITOR5_CONFIG}
        data={value || ''}
        {...props}
      />
      {helper()}
    </div>
  );
};

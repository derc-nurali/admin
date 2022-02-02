import { ComponentType, useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  Fade,
  FormHelperText,
  Grid,
  IconButton,
  SvgIcon,
} from '@material-ui/core';
import { map, get, set, isEmpty } from 'lodash';
import clsx from 'clsx';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { AppInput } from '../../inputs';
import { FIELD_ID, FIELD_TITLE } from '../../../constants/app/fields-constants';
import { IconTrash } from '../../icons';

interface DocumentsRepeaterProps {
  className?: string;
  value?: any;
  error?: boolean;
  helperText?: string;
  errorAppearance?: 'collapse' | 'fade';
  onChange?: (value: any) => void;
}

export const DocumentsRepeater: ComponentType<DocumentsRepeaterProps> = ({
  className,
  value,
  error = false,
  helperText,
  errorAppearance = 'collapse',
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [payload, setPayload] = useState<any[]>([]);
  const [innerErrors] = useState<any[]>([]);

  const handleBlur = () => {
    if (onChange) onChange(payload);
  };

  const handleFieldChange = (field: string, idx: number, value: any) => {
    const p = [...payload];
    set(payload[idx], field, value);
    setPayload(p);
  };

  const handleAdd = () => {
    setPayload((prev: any[]) => [...prev, {}]);
  };

  const handleAddRemove = (idx: number) => {
    setPayload((prev: string[]) => {
      const p = [...prev];
      p.splice(idx, 1);
      return p;
    });
    handleBlur();
  };

  const baseFieldProps = (field: string, idx: number) => ({
    error: !!get(innerErrors, [idx, field], ''),
    helperText: get(innerErrors, [idx, field, 0], ''),
    key: idx,
  });

  const inputProps = (field: string, idx: number) => ({
    ...baseFieldProps(field, idx),
    value: get(payload, [idx, field], ''),
    onChange: (e: any) => handleFieldChange(field, idx, e.target.value),
  });

  const numberProps = (field: string, idx: number) => ({
    ...baseFieldProps(field, idx),
    value: get(payload, [idx, field], ''),
    type: 'number',
    onChange: (e: any) => {
      const val = e.target.value;
      if (Number.isInteger(parseInt(val))) {
        handleFieldChange(field, idx, parseInt(val));
      } else {
        handleFieldChange(field, idx, val);
      }
    },
  });

  const helper = () => {
    const text = (
      <FormHelperText
        error={error}
        component="div"
        classes={{ root: classes.helper }}
      >
        {helperText}
      </FormHelperText>
    );

    if (errorAppearance === 'fade') {
      return <Fade in={!!helperText}>{text}</Fade>;
    }

    return <Collapse in={!!helperText}>{text}</Collapse>;
  };

  useEffect(() => {
    if (value) {
      setPayload(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const document: Function = (idx: number) => (
    <div className={clsx(classes.document)} key={idx}>
      <Grid container columnSpacing={2} alignItems="center">
        <Grid item flex={1}>
          <AppInput
            onBlur={handleBlur}
            id={`${FIELD_TITLE}-${idx}`}
            placeholder={t('title', 'Заголовок  ')}
            {...inputProps(FIELD_TITLE, idx)}
          />
        </Grid>
        <Grid item flex={1}>
          <AppInput
            onBlur={handleBlur}
            id={`${FIELD_ID}-${idx}`}
            placeholder="id"
            {...numberProps(FIELD_ID, idx)}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => handleAddRemove(idx)} color="error">
            <SvgIcon component={IconTrash} viewBox="0 0 16 16" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div className={clsx(classes.root, className)}>
      {map(payload, (doc, idx) => document(idx))}
      {helper()}
      <div className={clsx(classes.footer)}>
        <Button
          onClick={handleAdd}
          color="info"
          size="small"
          disabled={
            payload.length > 0 &&
            isEmpty(payload[payload.length - 1][FIELD_TITLE]) &&
            isEmpty(payload[payload.length - 1][FIELD_ID])
          }
        >
          {t('add', 'Добавить')}
        </Button>
      </div>
    </div>
  );
};

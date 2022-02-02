import { ComponentType, useEffect, useState } from 'react';
import { map, isEmpty } from 'lodash';
import { AppInput } from '../app-input';
import {
  Button,
  Collapse,
  Fade,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  SvgIcon,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { IconTrash } from '../../icons';

interface AppInputRepeaterProps {
  className?: string;
  label?: string;
  value?: string[];
  error?: boolean;
  helperText?: string;
  errorAppearance?: 'collapse' | 'fade';
  onChange?: (value: string[]) => void;
}

export const AppInputRepeater: ComponentType<AppInputRepeaterProps> = ({
  className,
  label,
  value = [],
  error = false,
  helperText,
  errorAppearance = 'collapse',
  onChange,
}) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<string[]>([]);

  const handleChange = (e: any, idx: number) => {
    setItems((prev: string[]) => {
      const val = [...prev];
      val[idx] = e.target.value;
      return val;
    });
  };

  const handleAdd = () => {
    setItems((prev: string[]) => {
      const val = [...prev];
      val.push('');
      return val;
    });
    handleBlur();
  };

  const handleAddRemove = (idx: number) => {
    setItems((prev: string[]) => {
      const val = [...prev];
      val.splice(idx, 1);
      return val;
    });
    handleBlur();
  };

  const handleBlur = () => {
    if (onChange) onChange(items);
  };

  const inputLabel = () => {
    if (!label) return null;

    return (
      <InputLabel shrink style={{ marginBottom: 4 }}>
        {label}
      </InputLabel>
    );
  };

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

  useEffect(() => {
    if (!isEmpty(value)) setItems(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fields = map(items, (item, idx) => (
    <Grid
      container
      item
      xs={12}
      columnSpacing={1}
      alignItems="center"
      key={idx}
    >
      <Grid item flex={1}>
        <AppInput
          onBlur={handleBlur}
          placeholder="Введите значение"
          value={item}
          onChange={(e: any) => handleChange(e, idx)}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={() => handleAddRemove(idx)} color="error">
          <SvgIcon component={IconTrash} viewBox="0 0 16 16" />
        </IconButton>
      </Grid>
    </Grid>
  ));

  return (
    <div className={clsx(className)}>
      {inputLabel()}
      <Grid container spacing={2} direction="column" mb={2}>
        {fields}
      </Grid>
      {helper()}
      <Button
        onClick={handleAdd}
        color="info"
        fullWidth
        disabled={items.length > 0 && items[items.length - 1] === ''}
      >
        {t('add.more', 'Добавить еще')}
      </Button>
    </div>
  );
};

import { AppSelectOptionProps } from '../../components/inputs';
import moment from 'moment';
import 'moment/locale/ru';
import { capitalizeFirstLetter } from '../../utils/data-utils';
import {
  CONTROL_ACTION_DELETE,
  CONTROL_ACTION_DRAFTS,
  CONTROL_ACTION_PUBLISH,
} from './control-actions-constants';
import { FIELD_PHOTO, FIELD_VIDEO } from './fields-constants';
moment.locale('es');

export const DATE_FORMAT = 'YYYY-MM-DD';

export const OPTIONS_ACTIONS: AppSelectOptionProps[] = [
  {
    label: 'Удалить',
    value: CONTROL_ACTION_DELETE,
  },
  {
    label: 'В черновик',
    value: CONTROL_ACTION_DRAFTS,
  },
  {
    label: 'Опубликовать',
    value: CONTROL_ACTION_PUBLISH,
  },
];

export const OPTIONS_PER_PAGE: AppSelectOptionProps[] = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '20',
    value: 20,
  },
];

export const OPTIONS_MEDIALIB_CATEGORY: AppSelectOptionProps[] = [
  {
    label: 'Фото',
    value: FIELD_PHOTO,
  },
  {
    label: 'Видео',
    value: FIELD_VIDEO,
  },
];

export const OPTIONS_PERIODS: AppSelectOptionProps[] = new Array(12)
  .fill(0)
  .map((_, i) => {
    const date = moment().subtract(i, 'month').startOf('month');
    return {
      label: capitalizeFirstLetter(date.format('MMMM YYYY')),
      value: date.format(DATE_FORMAT),
    };
  });

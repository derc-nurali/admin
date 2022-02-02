import {
  DataTableColumnsProps,
  DataTableLink,
  DataTableText,
} from '../../data-table';
import { Grid } from '@material-ui/core';
import { vacancyEditRoute } from '../../../utils/route-utils';
import {
  FIELD_DESCRIPTION,
  FIELD_FULL_NAME,
  FIELD_PHONE,
  FIELD_RESUME,
  FIELD_VACANCY,
} from '../../../constants/app/fields-constants';

export const VACANCIES_APPLICATIONS_COLUMNS_RESOURCE: DataTableColumnsProps[] =
  [
    {
      label: 'Вакансия',
      labelKey: 'vacancy',
      dataKey: FIELD_VACANCY,
      width: '20%',
      renderItem: ({ vacancy, position }: any) => {
        if (vacancy?.title) {
          return (
            <DataTableLink to={vacancyEditRoute({ id: vacancy?.id })}>
              {vacancy.title}
            </DataTableLink>
          );
        } else if (position) {
          return position;
        }
      },
    },
    {
      label: 'Полное имя',
      labelKey: 'fullName',
      dataKey: FIELD_FULL_NAME,
      width: '20%',
    },
    {
      label: 'Контакты',
      labelKey: 'contacts',
      dataKey: FIELD_PHONE,
      width: '24%',
      renderItem: ({ phone, email }: any) => (
        <Grid container spacing={2} direction="column">
          {phone && (
            <Grid item>
              Тел.: <a href={`tel:${phone}`}>{phone}</a>
            </Grid>
          )}
          {email && (
            <Grid item>
              Email: <a href={`mailto:${email}`}>{email}</a>
            </Grid>
          )}
        </Grid>
      ),
    },
    {
      label: 'Описание',
      labelKey: 'description',
      dataKey: FIELD_DESCRIPTION,
    },
    {
      label: 'Резюме',
      labelKey: 'resume',
      dataKey: FIELD_RESUME,
      renderItem: ({ resume }: any) => (
        <>
          {resume?.fullPath && (
            <a href={resume.fullPath} target="_blank" rel="noreferrer" download>
              <DataTableText label="Скачать" labelKey="action.download" />
            </a>
          )}
        </>
      ),
    },
  ];

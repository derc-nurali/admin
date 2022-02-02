import { ReactNode } from 'react';
import { UseCatalogProps } from '../../hooks';
import {
  DataTableColumnsProps,
  DataTableDate,
  DataTableText,
} from '../data-table';
import { forEach } from 'lodash';
import { getCatalog } from '../../thunks/feedback-thunks';
import { store } from '../../common/store';
import { ApiFeedback } from '../../http';
import { Grid, Typography } from '@material-ui/core';
import { ROUTES } from '../../constants/routes/route-constants';
import { ENTITY_FEEDBACK } from '../../constants/app/entity-constants';
import {
  FIELD_ATTACHMENT,
  FIELD_BODY,
  FIELD_CREATED_AT,
  FIELD_TITLE,
} from '../../constants/app/fields-constants';

const { dispatch }: any = store;

const defaultQuery: Record<string, any> = {
  exclude: 'isActive,language,updatedAt',
  embed: 'attachment',
};

const renderBody = (body: Record<string, any>) => {
  const records: ReactNode[] = [];

  forEach(body, (value, key) => {
    records.push(
      <Grid container key={key} spacing={1} mt={0.5} mb={0.5} flexWrap="nowrap">
        <Grid item>
          <Typography variant="body3">{key}:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body3">
            <strong>{value}</strong>
          </Typography>
        </Grid>
      </Grid>
    );
  });

  return records;
};

const columns: DataTableColumnsProps[] = [
  {
    label: 'Заголовок',
    labelKey: 'title',
    dataKey: FIELD_TITLE,
    width: '20%',
    sortable: true,
    renderItem: ({ title }: any) => (
      <Typography
        variant="body3"
        component="span"
        sx={{ whiteSpace: 'nowrap' }}
      >
        {title}
      </Typography>
    ),
  },
  {
    label: 'Описание',
    labelKey: 'description',
    dataKey: FIELD_BODY,
    width: '50%',
    sortable: true,
    renderItem: ({ body }: any) => <>{renderBody(body)}</>,
  },
  {
    label: 'Скачать файл',
    labelKey: 'action.download.file',
    dataKey: FIELD_ATTACHMENT,
    renderItem: ({ attachment }: any) => (
      <>
        {attachment?.fullPath && (
          <a
            href={attachment.fullPath}
            target="_blank"
            rel="noreferrer"
            download
          >
            <DataTableText label="Скачать" labelKey="action.download" />
          </a>
        )}
      </>
    ),
  },
  {
    label: 'Дата',
    labelKey: 'date',
    dataKey: FIELD_CREATED_AT,
    sortable: true,
    renderItem: ({ createdAt }: any) => (
      <DataTableDate label="Дата" labelKey="date" date={createdAt} />
    ),
  },
];

export const FEEDBACK_RESOURCES: UseCatalogProps = {
  apiService: ApiFeedback,
  entity: ENTITY_FEEDBACK,
  route: ROUTES.FEEDBACK,
  getCatalog: (params: Record<string, any>) => dispatch(getCatalog(params)),
  getCounts: () => {},
  defaultQuery,
  columns,
};

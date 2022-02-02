import { ComponentType } from 'react';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { BackButton } from '../../back-button';
import { PageTitle } from '../../page-title';
import { useTranslation } from 'react-i18next';
import { AppInput } from '../../inputs';
import { useDetails } from '../../../hooks';
import { ApiOrganizations } from '../../../http';
import { FIELD_NAME } from '../../../constants/app/fields-constants';
import { ENTITY_ORGANIZATION } from '../../../constants/app/entity-constants';

export const OrganizationsEdit: ComponentType = () => {
  const { t } = useTranslation();
  const { payload, isSubmitting, inputProps, handleDelete, handleSubmit } =
    useDetails(ENTITY_ORGANIZATION, ApiOrganizations);

  const id = payload?.id;
  const title = !!id
    ? t('organization.edit', 'Редактировать организацию')
    : t('organization.new', 'Новая организация');

  return (
    <Container>
      <BackButton />
      <PageTitle title={title} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Card>
            <CardContent>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <AppInput
                    id={FIELD_NAME}
                    variant="filled"
                    label={t('name', 'Название')}
                    placeholder={t(
                      'organization.titlePlaceholder',
                      'Введите название организации...'
                    )}
                    {...inputProps(FIELD_NAME)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Card>
                <CardContent>
                  <Grid container spacing={2} direction="column">
                    {!!id && (
                      <Grid item>
                        <LoadingButton
                          onClick={() => handleDelete(id)}
                          variant="contained"
                          color="error"
                          size="small"
                          fullWidth
                          loading={isSubmitting}
                        >
                          {t('action.delete', 'Удалить')}
                        </LoadingButton>
                      </Grid>
                    )}
                    <Grid item>
                      <LoadingButton
                        onClick={handleSubmit}
                        variant="contained"
                        size="small"
                        color="info"
                        fullWidth
                        loading={isSubmitting}
                      >
                        {t('publish', 'Опубликовать')}
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

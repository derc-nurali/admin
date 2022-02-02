import { ComponentType } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { BackButton } from '../../back-button';
import { PageTitle } from '../../page-title';
import { useTranslation } from 'react-i18next';
import { AppInput, AppUploader } from '../../inputs';
import { useDetails, useLanguage } from '../../../hooks';
import { ApiSuperUsers } from '../../../http';
import {
  FIELD_AVATAR,
  FIELD_EMAIL,
  FIELD_FIRST_NAME,
  FIELD_LAST_NAME,
  FIELD_ORGANIZATION,
  FIELD_PASSWORD,
  FIELD_PIN,
  FIELD_PROJECTS,
} from '../../../constants/app/fields-constants';
import { ENTITY_SUPERUSER } from '../../../constants/app/entity-constants';
import { ProjectsTags } from '../../projects';
import { get } from 'lodash';
import { OrganizationsSelect } from '../../organizations';

export const SuperUserEdit: ComponentType = () => {
  const { t } = useTranslation();
  const { currentLocale } = useLanguage();
  const {
    payload,
    isSubmitting,
    inputProps,
    tagsProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useDetails(ENTITY_SUPERUSER, ApiSuperUsers);

  const id = payload?.id;
  const title = !!id
    ? t('superusers.edit', 'Редактировать админа')
    : t('superusers.new', 'Новый админ');

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
                    id={FIELD_LAST_NAME}
                    variant="filled"
                    label={t('lastName', 'Фамилия')}
                    placeholder={t('lastName', 'Фамилия')}
                    {...inputProps(FIELD_LAST_NAME)}
                  />
                </Grid>
                <Grid item>
                  <AppInput
                    id={FIELD_FIRST_NAME}
                    variant="filled"
                    label={t('firstName', 'Имя')}
                    placeholder={t('firstName', 'Имя')}
                    {...inputProps(FIELD_FIRST_NAME)}
                  />
                </Grid>
                <Grid item>
                  <AppInput
                    id={FIELD_PIN}
                    variant="filled"
                    label={t('pin', 'ПНФЛ')}
                    placeholder={t('pin', 'ПНФЛ')}
                    {...inputProps(FIELD_PIN)}
                  />
                </Grid>
                <Grid item>
                  <AppInput
                    id={FIELD_EMAIL}
                    variant="filled"
                    label={t('email', 'Электронная почта')}
                    placeholder={t('email', 'Электронная почта')}
                    {...inputProps(FIELD_EMAIL)}
                  />
                </Grid>
                <Grid item>
                  <OrganizationsSelect
                    id={FIELD_ORGANIZATION}
                    locale={currentLocale}
                    variant="filled"
                    label={t('organization', 'Организация')}
                    {...inputProps(FIELD_ORGANIZATION)}
                  />
                </Grid>
                <Grid item>
                  <AppInput
                    id={FIELD_PASSWORD}
                    variant="filled"
                    label={t('password', 'Пароль')}
                    placeholder={t('password', 'Пароль')}
                    type="password"
                    {...inputProps(FIELD_PASSWORD)}
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
                <CardHeader title={t('avatar', 'Аватар')} />
                <CardContent>
                  <AppUploader
                    onChange={(id) => handleFieldChange(FIELD_AVATAR, id)}
                    id={get(payload, FIELD_AVATAR)}
                    hint="JPG, PNG — до 2 мб."
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('projects', 'Проекты')} />
                <CardContent>
                  <ProjectsTags
                    locale={currentLocale}
                    {...tagsProps(FIELD_PROJECTS)}
                  />
                </CardContent>
              </Card>
            </Grid>
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

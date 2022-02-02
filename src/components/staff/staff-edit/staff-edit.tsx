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
import { useEdit } from '../../../hooks';
import { AppEditor, AppInput, AppUploader } from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { DepartmentsTags } from '../../departments';
import { get } from 'lodash';
import {
  FIELD_CAPTION,
  FIELD_COVER,
  FIELD_DAY_OF_ADMISSION,
  FIELD_DEPARTMENT,
  FIELD_DESCRIPTION,
  FIELD_EMAIL,
  FIELD_FACEBOOK,
  FIELD_FULL_NAME,
  FIELD_INSTAGRAM,
  FIELD_PHONE,
  FIELD_POSITION,
  FIELD_TELEGRAM,
  FIELD_WEIGHT,
} from '../../../constants/app/fields-constants';
import { STAFF_RESOURCES } from '../staff-resource';

export const StaffEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    activePayload,
    activeLangIdx,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    numberProps,
    selectProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(STAFF_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('staff.edit', 'Редактировать сотрудника')
    : t('staff.new', 'Новый сотрудник');

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <BackButton />
      <PageTitle title={title} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TabNav active={activeLangIdx} items={langsNavigation} />
              <Card>
                <CardContent>
                  <Grid container spacing={3} direction="column">
                    <Grid item>
                      <AppInput
                        id={FIELD_FULL_NAME}
                        variant="filled"
                        label={t('fullName', 'Полное имя')}
                        placeholder={t('fullName', 'Полное имя')}
                        {...inputProps(FIELD_FULL_NAME)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_POSITION}
                        variant="filled"
                        label={t('position', 'Должность')}
                        placeholder={t('position', 'Должность')}
                        {...inputProps(FIELD_POSITION)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_POSITION}
                        variant="filled"
                        label={t('caption', 'Подпись')}
                        placeholder={t('caption', 'Подпись')}
                        {...inputProps(FIELD_CAPTION)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <AppEditor
                {...inputProps(FIELD_DESCRIPTION)}
                onChange={(e, editor) =>
                  handleFieldChange(FIELD_DESCRIPTION, editor.getData())
                }
              />
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Grid container spacing={3} direction="column">
                    <Grid item>
                      <AppInput
                        id={FIELD_PHONE}
                        variant="filled"
                        label={t('phone', 'Телефон')}
                        placeholder={t('phone', 'Телефон')}
                        {...inputProps(FIELD_PHONE)}
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
                      <AppInput
                        id={FIELD_DAY_OF_ADMISSION}
                        variant="filled"
                        label={t('daysOfAdmission', 'Дни приема')}
                        placeholder={t('daysOfAdmission', 'Дни приема')}
                        {...inputProps(FIELD_DAY_OF_ADMISSION)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Grid container spacing={3} direction="column">
                    <Grid item>
                      <AppInput
                        id={FIELD_TELEGRAM}
                        variant="filled"
                        label={t('telegram', 'Telegram')}
                        placeholder={t('telegram', 'Telegram')}
                        {...inputProps(FIELD_TELEGRAM)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_FACEBOOK}
                        variant="filled"
                        label={t('facebook', 'Facebook')}
                        placeholder={t('facebook', 'Facebook')}
                        {...inputProps(FIELD_FACEBOOK)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_INSTAGRAM}
                        variant="filled"
                        label={t('instagram', 'Instagram')}
                        placeholder={t('instagram', 'Instagram')}
                        {...inputProps(FIELD_INSTAGRAM)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Card>
                <CardHeader title={t('preview', 'Превью')} />
                <CardContent>
                  <AppUploader
                    onChange={(id) => handleFieldChange(FIELD_COVER, id)}
                    id={get(activePayload, FIELD_COVER)}
                    hint="JPG, PNG — до 2 мб."
                    key={activeLangIdx}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('department', 'Отделение')} />
                <CardContent>
                  <DepartmentsTags {...selectProps(FIELD_DEPARTMENT)} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('weight', 'Вес')} />
                <CardContent>
                  <AppInput
                    id={FIELD_WEIGHT}
                    variant="filled"
                    placeholder={t('number', 'Число')}
                    {...numberProps(FIELD_WEIGHT)}
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
                        onClick={() => handleSubmit(false)}
                        variant="outlined"
                        color="info"
                        size="small"
                        fullWidth
                        loading={isSubmitting}
                      >
                        {t('draft.save', 'Сохранить черновик')}
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton
                        onClick={() => handleSubmit(true)}
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

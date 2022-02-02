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
import { AppEditor, AppInput, AppUploader } from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { AppInputRepeater } from '../../inputs/app-input-repeater/app-input-repeater';
import { useEdit } from '../../../hooks';
import { get } from 'lodash';
import {
  FIELD_COVER,
  FIELD_DESCRIPTION,
  FIELD_SHORT_DESCRIPTION,
  FIELD_SHORT_TITLE,
  FIELD_STEP_TITLE,
  FIELD_STEPS,
  FIELD_TITLE,
  FIELD_WEIGHT,
} from '../../../constants/app/fields-constants';
import { ACTIVITIES_RESOURCES } from '../activities-resource';

export const ActivitiesEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    activePayload,
    activeLangIdx,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    numberProps,
    repeaterProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(ACTIVITIES_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('activity.edit', 'Редактировать деятельность')
    : t('activity.new', 'Новая деятельность');

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
                        id={FIELD_TITLE}
                        variant="filled"
                        label={t('title', 'Заголовок')}
                        placeholder={t(
                          'activity.titlePlaceholder',
                          'Введите заголовок деятельности...'
                        )}
                        {...inputProps(FIELD_TITLE)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_SHORT_TITLE}
                        variant="filled"
                        label={t('shortTitle', 'Краткое название')}
                        placeholder={t(
                          'activity.shortTitlePlaceholder',
                          'Введите краткое название деятельности...'
                        )}
                        {...inputProps(FIELD_SHORT_TITLE)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_SHORT_DESCRIPTION}
                        variant="filled"
                        label={t('shortDescription', 'Краткое описание')}
                        placeholder={t(
                          'activity.shortDescriptionPlaceholder',
                          'Предисловие к деятельности...'
                        )}
                        rows={4}
                        multiline
                        {...inputProps(FIELD_SHORT_DESCRIPTION)}
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
                        id={FIELD_STEP_TITLE}
                        variant="filled"
                        label={t('steptitle', 'Заголовок шагов')}
                        placeholder={t(
                          'steptitle.placeholder',
                          'Введите заголовок шагов...'
                        )}
                        {...inputProps(FIELD_STEP_TITLE)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInputRepeater
                        label={t('steps', 'Шаги')}
                        {...repeaterProps(FIELD_STEPS)}
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

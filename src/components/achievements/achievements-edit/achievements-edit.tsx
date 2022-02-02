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
import {
  AppCheckbox,
  AppDatepicker,
  AppEditor,
  AppInput,
  AppUploader,
} from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { useEdit } from '../../../hooks';
import { get } from 'lodash';
import {
  FIELD_COVER,
  FIELD_COMPLETED_AT,
  FIELD_DESCRIPTION,
  FIELD_TITLE,
  FIELD_COMPLETED,
} from '../../../constants/app/fields-constants';
import { ACHIEVEMENTS_RESOURCES } from '../achievements-resource';

export const AchievementsEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    activePayload,
    activeLangIdx,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    selectProps,
    booleanProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(ACHIEVEMENTS_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('achievements.edit', 'Редактировать достижение')
    : t('achievements.new', 'Новое достижение');

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
                          'achievements.titlePlaceholder',
                          'Введите заголовок достижения...'
                        )}
                        {...inputProps(FIELD_TITLE)}
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
                <CardContent>
                  <Grid container alignItems="center" columnSpacing={1}>
                    <Grid item>
                      <AppCheckbox
                        id={FIELD_COMPLETED}
                        {...booleanProps(FIELD_COMPLETED)}
                      />
                    </Grid>
                    <Grid item>
                      <label htmlFor={FIELD_COMPLETED}>
                        {t('completed', 'Завершенный')}
                      </label>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('date', 'Дата')} />
                <CardContent>
                  <AppDatepicker
                    id={FIELD_COMPLETED_AT}
                    variant="filled"
                    placeholder={t('date', 'Дата')}
                    {...selectProps(FIELD_COMPLETED_AT)}
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

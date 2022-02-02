import { ComponentType } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { get } from 'lodash';
import { BackButton } from '../../back-button';
import { PageTitle } from '../../page-title';
import { useTranslation } from 'react-i18next';
import { AppDatepicker, AppEditor, AppInput, AppUploader } from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { NewsTags } from '../news-tags';
import { ActivitiesTags } from '../../activities';
import { useEdit } from '../../../hooks';
import {
  FIELD_ACTIVITIES,
  FIELD_COVER,
  FIELD_CREATED_AT,
  FIELD_DESCRIPTION,
  FIELD_SHORT_DESCRIPTION,
  FIELD_TAGS,
  FIELD_TITLE,
} from '../../../constants/app/fields-constants';
import { NEWS_RESOURCES } from '../news-resource';

export const NewsEdit: ComponentType = () => {
  const { t } = useTranslation();

  const {
    activePayload,
    activeLangIdx,
    activeLangCode,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    tagsProps,
    selectProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(NEWS_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('news.edit', 'Редактировать новость')
    : t('news.new', 'Новая новость');

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
                          'news.titlePlaceholder',
                          'Введите заголовок новости...'
                        )}
                        {...inputProps(FIELD_TITLE)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_SHORT_DESCRIPTION}
                        variant="filled"
                        label={t('shortDescription', 'Краткое описание')}
                        placeholder={t(
                          'news.shortDescriptionPlaceholder',
                          'Предисловие к новости...'
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
                <CardHeader title={t('activity', 'Деятельность')} />
                <CardContent>
                  <ActivitiesTags
                    locale={activeLangCode}
                    {...tagsProps(FIELD_ACTIVITIES)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('tags', 'Теги')} />
                <CardContent>
                  <NewsTags
                    locale={activeLangCode}
                    {...tagsProps(FIELD_TAGS)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('date', 'Дата')} />
                <CardContent>
                  <AppDatepicker
                    id={FIELD_CREATED_AT}
                    variant="filled"
                    placeholder={t('date', 'Дата')}
                    {...selectProps(FIELD_CREATED_AT)}
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

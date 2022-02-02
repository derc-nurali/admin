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
  AppEditor,
  AppGalleryUploader,
  AppInput,
  AppUploader,
} from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { MedialibCategoryTags } from '../medialib-category-tags';
import { useEdit } from '../../../hooks';
import { get } from 'lodash';
import {
  FIELD_CATEGORY,
  FIELD_COVER,
  FIELD_DESCRIPTION,
  FIELD_PHOTO,
  FIELD_PHOTO_GALLERY,
  FIELD_SHORT_DESCRIPTION,
  FIELD_TITLE,
  FIELD_VIDEO,
  FIELD_YOUTUBE,
} from '../../../constants/app/fields-constants';
import { MEDIALIB_RESOURCES } from '../medialib-resource';

export const MedialibEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    activePayload,
    activeLangIdx,
    activeLangCode,
    isLoading,
    isSubmitting,
    langsNavigation,
    baseFieldProps,
    inputProps,
    selectProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(MEDIALIB_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('medialib.edit', 'Редактировать медиатеку')
    : t('medialib.new', 'Новая медиатека');

  const youtubeProps = {
    ...baseFieldProps(FIELD_YOUTUBE),
    value: get(activePayload, FIELD_YOUTUBE, ''),
    onChange: (e: any) => {
      handleFieldChange(FIELD_YOUTUBE, e.target.value);
      if (!get(activePayload, FIELD_CATEGORY)) {
        handleFieldChange(FIELD_CATEGORY, FIELD_VIDEO);
      }
    },
  };

  const galleryProps = {
    ...baseFieldProps(FIELD_PHOTO_GALLERY),
    ids: get(activePayload, FIELD_PHOTO_GALLERY, []),
    onChange: (value: any) => {
      handleFieldChange(FIELD_PHOTO_GALLERY, value);
      if (!get(activePayload, FIELD_CATEGORY)) {
        handleFieldChange(FIELD_CATEGORY, FIELD_PHOTO);
      }
    },
  };

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
                          'medialib.titlePlaceholder',
                          'Введите заголовок медиатеки...'
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
                          'medialib.shortDescriptionPlaceholder',
                          'Предисловие к медиатеки...'
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
            {get(activePayload, FIELD_CATEGORY) !== FIELD_PHOTO && (
              <Grid item>
                <Card>
                  <CardHeader title={t('video', 'Видео')} />
                  <CardContent>
                    <AppInput
                      {...youtubeProps}
                      id={FIELD_YOUTUBE}
                      variant="filled"
                      placeholder="Youtube url"
                    />
                  </CardContent>
                </Card>
              </Grid>
            )}
            {get(activePayload, FIELD_CATEGORY) !== FIELD_VIDEO && (
              <Grid item>
                <Card>
                  <CardHeader title={t('photo', 'Фото')} />
                  <CardContent>
                    <AppGalleryUploader
                      {...galleryProps}
                      hint="JPG, PNG — до 2 мб. каждый файл"
                      key={activeLangIdx}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )}
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
                <CardHeader title={t('category', 'Категория')} />
                <CardContent>
                  {!isLoading && (
                    <MedialibCategoryTags
                      locale={activeLangCode}
                      {...selectProps(FIELD_CATEGORY)}
                    />
                  )}
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

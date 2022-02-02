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
import { AppEditor, AppInput, AppUploader } from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { PostsTags } from '../posts-tags';
import { PostsCategoriesTags } from '../../posts-categories';
import { useEdit } from '../../../hooks';
import {
  FIELD_CATEGORIES,
  FIELD_COVER,
  FIELD_DESCRIPTION,
  FIELD_SHORT_DESCRIPTION,
  FIELD_TAGS,
  FIELD_TITLE,
} from '../../../constants/app/fields-constants';
import { POSTS_RESOURCES } from '../posts-resource';

export const PostsEdit: ComponentType = () => {
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
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(POSTS_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('posts.edit', 'Редактировать пост')
    : t('posts.new', 'Новый пост');

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
                          'posts.titlePlaceholder',
                          'Введите заголовок поста...'
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
                          'posts.shortDescriptionPlaceholder',
                          'Предисловие к посту...'
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
                <CardHeader title={t('posts.categories', 'Категории постов')} />
                <CardContent>
                  <PostsCategoriesTags
                    locale={activeLangCode}
                    {...tagsProps(FIELD_CATEGORIES)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('tags', 'Теги')} />
                <CardContent>
                  <PostsTags
                    locale={activeLangCode}
                    {...tagsProps(FIELD_TAGS)}
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

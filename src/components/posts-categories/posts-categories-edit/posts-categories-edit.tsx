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
import { AppInput } from '../../inputs';
import { useDetails } from '../../../hooks';
import { ApiPostsCategories } from '../../../http';
import {
  FIELD_TITLE,
  FIELD_WEIGHT,
} from '../../../constants/app/fields-constants';
import { ENTITY_POST_CATEGORY } from '../../../constants/app/entity-constants';
import {
  LOCALE_EN,
  LOCALE_OZ,
  LOCALE_RU,
  LOCALE_UZ,
} from '../../../constants/app/locales-constants';

export const PostsCategoriesEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    payload,
    isSubmitting,
    inputProps,
    numberProps,
    handleDelete,
    handleSubmit,
  } = useDetails(ENTITY_POST_CATEGORY, ApiPostsCategories);

  const id = payload?.id;
  const title = !!id
    ? t('posts.categories.edit', 'Редактировать категорию поста')
    : t('posts.categories.new', 'Новая категоря поста');

  const label = (locale: string) => {
    switch (locale) {
      case LOCALE_EN:
        return t('english', 'Английский');
      case LOCALE_OZ:
        return t('ozbek', 'Узбекский');
      case LOCALE_UZ:
        return t('uzbek', 'Узбекский кириллица');
      default:
        return t('russian', 'Русский');
    }
  };

  const titleField = (locale: string) => (
    <AppInput
      id={`${FIELD_TITLE}.${locale}`}
      variant="filled"
      label={`${t('name', 'Название')} (${label(locale)})`}
      placeholder={t(
        'posts.categories.titlePlaceholder',
        'Введите заголовок категории поста...'
      )}
      {...inputProps(`${FIELD_TITLE}.${locale}`)}
    />
  );

  return (
    <Container>
      <BackButton />
      <PageTitle title={title} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Card>
            <CardContent>
              <Grid container spacing={3} direction="column">
                <Grid item>{titleField(LOCALE_RU)}</Grid>
                <Grid item>{titleField(LOCALE_EN)}</Grid>
                <Grid item>{titleField(LOCALE_OZ)}</Grid>
                <Grid item>{titleField(LOCALE_UZ)}</Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container spacing={2} direction="column">
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

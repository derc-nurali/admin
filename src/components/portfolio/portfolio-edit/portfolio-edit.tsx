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
import { ActivitiesTags } from '../../activities';
import { useEdit } from '../../../hooks';
import { get } from 'lodash';
import {
  FIELD_ACTIVITIES,
  FIELD_COLOR_END,
  FIELD_COLOR_START,
  FIELD_COVER,
  FIELD_DESCRIPTION,
  FIELD_DETAIL_COVER,
  FIELD_LOGO,
  FIELD_SHORT_DESCRIPTION,
  FIELD_TITLE,
  FIELD_URL,
  FIELD_WEIGHT,
} from '../../../constants/app/fields-constants';
import { PORTFOLIO_RESOURCES } from '../portfolio-resource';

export const PortfolioEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    activePayload,
    activeLangIdx,
    activeLangCode,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    numberProps,
    tagsProps,
    colorsProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(PORTFOLIO_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('portfolio.edit', 'Редактировать портфолио')
    : t('portfolio.new', 'Новое портфолио');

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
                          'portfolio.titlePlaceholder',
                          'Введите заголовок портфолио...'
                        )}
                        {...inputProps(FIELD_TITLE)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_URL}
                        variant="filled"
                        label={t('url', 'Ссылка')}
                        placeholder={t('url.placeholder', 'Введите ссылку...')}
                        {...inputProps(FIELD_URL)}
                      />
                    </Grid>
                    <Grid item>
                      <AppInput
                        id={FIELD_SHORT_DESCRIPTION}
                        variant="filled"
                        label={t('shortDescription', 'Краткое описание')}
                        placeholder={t(
                          'portfolio.shortDescriptionPlaceholder',
                          'Предисловие к портфолио...'
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
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <AppInput
                        id={FIELD_COLOR_START}
                        variant="filled"
                        label={t('colorStart', 'Цвет (начальный)')}
                        placeholder={t('color', 'Цвет')}
                        type="color"
                        {...colorsProps(FIELD_COLOR_START, '#2A5298')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <AppInput
                        id={FIELD_COLOR_END}
                        variant="filled"
                        label={t('colorEnd', 'Цвет (конечный)')}
                        placeholder={t('color', 'Цвет')}
                        type="color"
                        {...colorsProps(FIELD_COLOR_END, '#0E2959')}
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
                <CardHeader title={t('logo', 'Лого')} />
                <CardContent>
                  <AppUploader
                    onChange={(id) => handleFieldChange(FIELD_LOGO, id)}
                    id={get(activePayload, FIELD_LOGO)}
                    hint="JPG, PNG — до 2 мб."
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('detailCover', 'Детальная картинка')} />
                <CardContent>
                  <AppUploader
                    onChange={(id) => handleFieldChange(FIELD_DETAIL_COVER, id)}
                    id={get(activePayload, FIELD_DETAIL_COVER)}
                    hint="JPG, PNG — до 2 мб."
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

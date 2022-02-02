import { ComponentType } from 'react';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { BackButton } from '../../back-button';
import { PageTitle } from '../../page-title';
import { useTranslation } from 'react-i18next';
import { AppEditor, AppInput } from '../../inputs';
import { TabNav } from '../../tab-nav';
import { useEdit } from '../../../hooks';
import { Loader } from '../../loader';
import {
  FIELD_DESCRIPTION,
  FIELD_SHORT_DESCRIPTION,
  FIELD_TITLE,
} from '../../../constants/app/fields-constants';
import { VACANCIES_RESOURCES } from '../vacancies-resource';

export const VacanciesEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    activePayload,
    activeLangIdx,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(VACANCIES_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('vacancy.edit', 'Редактировать вакансию')
    : t('vacancy.new', 'Новая вакансия');

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
                          'vacancy.titlePlaceholder',
                          'Введите заголовок вакансии...'
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
                          'vacancy.shortDescriptionPlaceholder',
                          'Предисловие к вакансии...'
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

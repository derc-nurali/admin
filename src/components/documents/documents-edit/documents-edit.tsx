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
import { AppEditor, AppInput } from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { DocumentsRepeater } from '../documents-repeater';
import { DocumentsTags } from '../documents-tags';
import { useEdit } from '../../../hooks';
import {
  FIELD_DESCRIPTION,
  FIELD_LEX_ITEMS,
  FIELD_TAGS,
  FIELD_TITLE,
} from '../../../constants/app/fields-constants';
import { DOCUMENTS_RESOURCES } from '../documents-resource';

export const DocumentsEdit: ComponentType = () => {
  const { t } = useTranslation();
  const {
    activePayload,
    activeLangIdx,
    activeLangCode,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    repeaterProps,
    tagsProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(DOCUMENTS_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('documents.edit', 'Редактировать документ')
    : t('documents.new', 'Новый документ');

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
                          'documents.titlePlaceholder',
                          'Введите заголовок для документа...'
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
            <Grid item>
              <Card>
                <CardHeader title={t('documents', 'Документы')} />
                <CardContent>
                  <DocumentsRepeater
                    {...repeaterProps(FIELD_LEX_ITEMS)}
                    onChange={(value) =>
                      handleFieldChange(FIELD_LEX_ITEMS, value)
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Card>
                <CardHeader title={t('tags', 'Теги')} />
                <CardContent>
                  <DocumentsTags
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

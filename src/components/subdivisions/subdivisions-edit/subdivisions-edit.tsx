import { ComponentType } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormHelperText,
  Grid,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { map, get, findIndex } from 'lodash';
import { BackButton } from '../../back-button';
import { PageTitle } from '../../page-title';
import { useTranslation } from 'react-i18next';
import { AppInput } from '../../inputs';
import { TabNav } from '../../tab-nav';
import { Loader } from '../../loader';
import { ArchiveNode } from '../../archive';
import { ArchiveDialog } from '../../dialogs';
import { useDialog, useEdit } from '../../../hooks';
import { SubdivisionsParentSelect } from '../subdivisions-parent-select';
import { ApiStaff } from '../../../http';
import {
  FIELD_TITLE,
  FIELD_STAFFS,
  FIELD_WEIGHT,
  FIELD_PARENT,
} from '../../../constants/app/fields-constants';
import { SUBDIVISIONS_RESOURCES } from '../subdivisions-resource';

export const SubdivisionsEdit: ComponentType = () => {
  const { t } = useTranslation();
  const [openArchive] = useDialog(ArchiveDialog);
  const {
    activePayload,
    activeErrors,
    activeLangIdx,
    activeLangCode,
    isLoading,
    isSubmitting,
    langsNavigation,
    inputProps,
    numberProps,
    handleFieldChange,
    handleDelete,
    handleSubmit,
  } = useEdit(SUBDIVISIONS_RESOURCES);

  const id = activePayload?.id;
  const title = !!id
    ? t('subdivisions.edit', 'Редактировать подразделение')
    : t('subdivisions.new', 'Новые подразделение');
  const displayField = 'fullName';
  const employees = get(activePayload, 'staffs', null);

  const handleArchive = () => {
    openArchive({
      apiService: ApiStaff,
      displayField,
      locale: activeLangCode,
      onSelect: (ids: any[]) => handleFieldChange(FIELD_STAFFS, ids),
    });
  };

  const handleStaffDelete = (id: any) => {
    if (employees.includes(id)) {
      const ids = [...employees];
      const idx = findIndex(ids, (x) => x === id);
      ids.splice(idx, 1);
      handleFieldChange(FIELD_STAFFS, ids);
    }
  };

  const selectedEmployees = map(employees, (employee, idx) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
      <ArchiveNode
        apiService={ApiStaff}
        id={employee}
        onDelete={handleStaffDelete}
        displayField={displayField}
      />
    </Grid>
  ));

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
                          'subdivisions.titlePlaceholder',
                          'Введите заголовок подразделения...'
                        )}
                        {...inputProps(FIELD_TITLE)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader title={t('staff', 'Сотрудники')} />
                <CardContent>
                  {employees && (
                    <Grid container spacing={2} mb={3}>
                      {selectedEmployees}
                    </Grid>
                  )}
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={handleArchive} color="info">
                      {t('choose', 'Выбрать')}
                    </Button>
                  </div>
                  {get(activeErrors, FIELD_STAFFS) && (
                    <FormHelperText
                      error
                      component="div"
                      sx={{ fontSize: 12, textAlign: 'center', margin: 0 }}
                    >
                      {get(activeErrors, FIELD_STAFFS)}
                    </FormHelperText>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container spacing={2} direction="column">
            <Grid item style={{ maxWidth: '100%' }}>
              <Card>
                <CardHeader title={t('parent', 'Родитель')} />
                <CardContent>
                  <SubdivisionsParentSelect
                    id={FIELD_PARENT}
                    locale={activeLangCode}
                    exclude={[id]}
                    variant="filled"
                    prompt
                    {...inputProps(FIELD_PARENT)}
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

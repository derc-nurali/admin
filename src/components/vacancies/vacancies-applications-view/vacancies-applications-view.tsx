import { ComponentType, useEffect, useState } from 'react';
import { useRouter } from '../../../hooks';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { PageTitle } from '../../page-title';
import { useTranslation } from 'react-i18next';
import { map, isEmpty } from 'lodash';
import { ApiVacancies } from '../../../http';

export const VacanciesApplicationsView: ComponentType = () => {
  const { t } = useTranslation();
  const router: any = useRouter();
  const [hits, setHits] = useState([]);

  const handleFetch = (id: any) => {
    ApiVacancies.fetchOneApplication(id).then(({ hits }) => {
      setHits(hits);
    });
  };

  const items = () => {
    if (isEmpty(hits)) {
      return (
        <Typography variant="h6">
          На данную вакансию еще никто не откликнулся
        </Typography>
      );
    }

    const nodes = map(hits, (item, idx) => (
      <Grid item key={idx}>
        <Card>
          <CardContent>Вид в разработке</CardContent>
        </Card>
      </Grid>
    ));

    return (
      <Grid container spacing={2} direction="column">
        {nodes}
      </Grid>
    );
  };

  useEffect(() => {
    if (router?.query?.id) {
      handleFetch(router.query.id);
    }
  }, [router?.query?.id]);

  return (
    <Container>
      <PageTitle title={t('feedbacks', 'Отклики')} />
      {items()}
    </Container>
  );
};

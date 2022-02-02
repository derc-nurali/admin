import { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWorkflow, useRouter } from '../../hooks';
import { AppRadio } from '../inputs/app-radio';
import { dynamicRoute } from '../../utils/route-utils';
import { authorized } from '../../hocs';
import { get } from 'lodash';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@material-ui/core';
import { ROUTES } from '../../constants/routes/route-constants';

export const FlowPage: ComponentType = authorized()(() => {
  const router: any = useRouter();
  const { t } = useTranslation();
  const { data, flow, updateById } = useWorkflow();

  const handleChange = (e: any) => {
    updateById(Number(e.target.value));
  };

  useEffect(() => {
    if (!flow && data.length === 1) {
      const id = get(data, [0, 'value'], null);
      updateById(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (flow) {
      let redirect = dynamicRoute(ROUTES.DASHBOARD.ROOT);
      if (router?.query?.redirect) {
        redirect = router.query.redirect;
      }
      router.push(redirect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow]);

  return (
    <Container sx={{ margin: 'auto' }}>
      <Grid container justifyContent="center">
        <Grid item>
          <Card>
            <CardHeader
              title={t(
                'projects.select.title',
                'Над каким проектом хотите работать?'
              )}
            />
            <CardContent>
              <AppRadio onChange={handleChange} data={data} value={flow} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
});

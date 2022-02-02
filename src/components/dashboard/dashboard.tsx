import { ComponentType } from 'react';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { get, map } from 'lodash';
import { PageTitle } from '../page-title';
import { useWorkflow } from '../../hooks';
import { Link } from 'react-router-dom';
import { dynamicRoute } from '../../utils/route-utils';
import {
  BlockProps,
  DASHBOARD_LATEST_BLOCKS,
} from '../../constants/app/dashboard-latest-block-constants';
import useStyles from './styles';

export const Dashboard: ComponentType = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { flow } = useWorkflow();

  const latests: BlockProps[] | null = get(
    DASHBOARD_LATEST_BLOCKS,
    [flow],
    DASHBOARD_LATEST_BLOCKS.DEFAULT
  );
  const blocks = map(latests, (block, idx) => (
    <Grid item xs={12} md={6} key={idx}>
      <Card className={clsx(classes.card)}>
        <CardHeader title={t(block.titleKey, block.title)} />
        {block.component}
        <CardActions className={clsx(classes.actions)}>
          <Button component={Link} to={dynamicRoute(block.url)} color="info">
            {t(block.linkKey, block.linkKey)}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <Container className={clsx(classes.root)}>
      <PageTitle title={t('dashboard', 'Дашборд')} />
      <Grid container spacing={3}>
        {blocks}
      </Grid>
    </Container>
  );
};

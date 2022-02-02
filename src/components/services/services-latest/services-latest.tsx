import { ComponentType, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@material-ui/core';
import { useLanguage, useWorkflow } from '../../../hooks';
import { getLatest } from '../../../thunks/service-thunks';
import { Link } from 'react-router-dom';
import { map, get } from 'lodash';
import { serviceEditRoute } from '../../../utils/route-utils';
import { IconArrowRight } from '../../icons';
import { ENTITY_SERVICE } from '../../../constants/app/entity-constants';

export const ServicesLatest: ComponentType = () => {
  const dispatch = useDispatch();
  const { flow } = useWorkflow();
  const { currentLocale } = useLanguage();
  const { latest } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_SERVICE]
  );
  const hits = get(latest, [currentLocale, 'hits'], []);

  useEffect(() => {
    const query = {
      language: currentLocale,
      take: 5,
    };

    dispatch(getLatest(query));
  }, [dispatch, currentLocale, flow]);

  const items = map(hits, ({ id, title }, idx) => (
    <ListItem disablePadding key={idx}>
      <ListItemButton to={serviceEditRoute({ id })} component={Link}>
        <ListItemIcon>
          <SvgIcon
            component={IconArrowRight}
            viewBox="0 0 9 16"
            color="info"
            fontSize="small"
          />
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: 'subtitle2' }}
        />
      </ListItemButton>
    </ListItem>
  ));

  return <List>{items}</List>;
};

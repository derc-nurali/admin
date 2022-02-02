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
import { getLatest } from '../../../thunks/vacancy-thunks';
import { get, map } from 'lodash';
import { vacancyEditRoute } from '../../../utils/route-utils';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../icons';
import { ENTITY_VACANCY } from '../../../constants/app/entity-constants';

export const VacanciesLatest: ComponentType = () => {
  const dispatch = useDispatch();
  const { flow } = useWorkflow();
  const { currentLocale } = useLanguage();
  const { latest } = useSelector(
    (state: RootStateOrAny) => state[ENTITY_VACANCY]
  );
  const hits = get(latest, [currentLocale, 'hits'], []);

  useEffect(() => {
    const query = {
      language: currentLocale,
      take: 6,
    };

    dispatch(getLatest(query));
  }, [dispatch, currentLocale, flow]);

  const items = map(hits, ({ id, title }, idx) => (
    <ListItem disablePadding key={idx}>
      <ListItemButton to={vacancyEditRoute({ id })} component={Link}>
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

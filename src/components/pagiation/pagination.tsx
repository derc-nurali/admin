import { ComponentType } from 'react';
import {
  Button,
  Hidden,
  IconButton,
  PaginationProps,
  SvgIcon,
} from '@material-ui/core';
import usePagination from '@material-ui/core/usePagination';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import clsx from 'clsx';
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight,
} from '../icons';

const FIRST = 'first';
const LAST = 'last';
const PREVIOUS = 'previous';
const NEXT = 'next';
const START_ELLIPSIS = 'start-ellipsis';
const END_ELLIPSIS = 'END-ellipsis';

const ELLIPSIS = [START_ELLIPSIS, END_ELLIPSIS];
const BRIMS = [FIRST, LAST, PREVIOUS, NEXT];

const DICTIONARY: any = {
  [START_ELLIPSIS]: '…',
  [END_ELLIPSIS]: '…',
  [FIRST]: 'page.first',
  [LAST]: 'page.last',
  [PREVIOUS]: 'page.previous',
  [NEXT]: 'page.next',
};

const DICTIONARY_DEFAULT: any = {
  [FIRST]: 'В начало',
  [LAST]: 'В конец',
  [PREVIOUS]: 'Предыдущая',
  [NEXT]: 'Следующая',
};

const ICONS: any = {
  [FIRST]: (
    <SvgIcon
      component={IconDoubleArrowLeft}
      viewBox="0 0 16 16"
      fontSize="small"
    />
  ),
  [LAST]: (
    <SvgIcon
      component={IconDoubleArrowRight}
      viewBox="0 0 16 16"
      fontSize="small"
    />
  ),
  [PREVIOUS]: (
    <SvgIcon component={IconArrowLeft} viewBox="0 0 9 16" fontSize="small" />
  ),
  [NEXT]: (
    <SvgIcon component={IconArrowRight} viewBox="0 0 9 16" fontSize="small" />
  ),
};

const CORNER_ICONS: any = {
  [FIRST]: {
    startIcon: ICONS[FIRST],
  },
  [LAST]: {
    endIcon: ICONS[LAST],
  },
  [PREVIOUS]: {
    startIcon: ICONS[PREVIOUS],
  },
  [NEXT]: {
    endIcon: ICONS[NEXT],
  },
};

export const Pagination: ComponentType<PaginationProps> = ({
  boundaryCount = 5,
  showFirstButton = true,
  showLastButton = true,
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { items } = usePagination({
    boundaryCount,
    showFirstButton,
    showLastButton,
    ...props,
  });

  return (
    <nav className={clsx(classes.root)}>
      <ul className={clsx(classes.list)}>
        {items.map((i, idx) => {
          const { page, type, selected, ...item } = i;
          let node;

          if (ELLIPSIS.includes(type)) {
            node = DICTIONARY[type];
          } else if (BRIMS.includes(type)) {
            node = (
              <>
                <Hidden mdDown>
                  <Button
                    variant="lever"
                    color="info"
                    size="small"
                    {...CORNER_ICONS[type]}
                    {...item}
                  >
                    <span className={clsx(classes.buttonText)}>
                      {t(DICTIONARY[type], DICTIONARY_DEFAULT[type])}
                    </span>
                  </Button>
                </Hidden>
                <Hidden mdUp>
                  <IconButton color="info" size="small" {...item}>
                    {ICONS[type]}
                  </IconButton>
                </Hidden>
              </>
            );
          } else if (type === 'page') {
            node = (
              <IconButton
                color="info"
                size="small"
                className={clsx(classes.page, {
                  [classes.pageSelected]: selected,
                })}
                {...item}
              >
                {page}
              </IconButton>
            );
          } else {
            node = (
              <button type="button" {...item}>
                {type}
              </button>
            );
          }

          return (
            <li className={clsx(classes.item)} key={idx}>
              {node}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

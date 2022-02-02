import { ComponentType } from 'react';
import { map } from 'lodash';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useRouter } from '../../hooks';
import { Button } from '@material-ui/core';

type CounterProps = number | null | undefined;
type OnClickProps = (idx: number) => void;

export interface TabNavItemsProps {
  label: string;
  counter?: CounterProps;
  path?: string;
  onClick?: OnClickProps;
}

interface TabNavProps {
  items: TabNavItemsProps[];
  active?: number;
}

export const TabNav: ComponentType<TabNavProps> = ({ items, active }) => {
  const classes = useStyles();
  const { pathname } = useRouter();

  const text = (label: string, counter: CounterProps) => (
    <>
      <span className={clsx(classes.text)}>{label}</span>
      {(counter || counter === 0) && (
        <span className={clsx(classes.counter)}>({counter})</span>
      )}
    </>
  );

  const list = map(
    items,
    ({ path, onClick, label, counter }: TabNavItemsProps, idx: number) => {
      const inlineProps = {
        className: clsx(classes.link, {
          [classes.active]: pathname === path || active === idx,
        }),
        key: idx,
      };
      const handleClick = () => {
        if (onClick) onClick(idx);
      };

      if (path)
        return (
          <Link to={path} {...inlineProps}>
            {text(label, counter)}
          </Link>
        );

      return (
        <Button onClick={handleClick} variant="text" {...inlineProps}>
          {text(label, counter)}
        </Button>
      );
    }
  );

  return <nav className={clsx(classes.root)}>{list}</nav>;
};

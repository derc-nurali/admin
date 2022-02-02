import { ComponentType } from 'react';
import useStyles from './styles';
import clsx from 'clsx';

interface TagProps {
  label: string;
}

export const Tag: ComponentType<TagProps> = ({ label }) => {
  const classes = useStyles();
  return <div className={clsx(classes.root)}>{label}</div>;
};

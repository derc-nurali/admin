import { ComponentType } from 'react';
import { map } from 'lodash';
import { Tag } from '../../tag';
import useStyles from './styles';
import clsx from 'clsx';

interface DataTableTagsProps {
  data: string[];
}

export const DataTableTags: ComponentType<DataTableTagsProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      {map(data, (tag, idx) => (
        <Tag label={tag} key={idx} />
      ))}
    </div>
  );
};

import { Typography } from '@material-ui/core';
import { ComponentType } from 'react';

interface PageTitleProps {
  title: string;
}

export const PageTitle: ComponentType<PageTitleProps> = ({ title }) => {
  return (
    <Typography variant="h1" mb={3}>
      {title}
    </Typography>
  );
};

import { ComponentType } from 'react';
//import { FormikValues } from 'formik/dist/types';
import { Container, Hidden } from '@material-ui/core';
import clsx from 'clsx';
import { LangSwitcher } from '../lang-switcher';
//import { HeaderNotification } from './header-notification';
import { HeaderOwner } from './header-owner';
import { Separator } from '../separator';
//import { SearchForm } from '../forms';
import { WorkflowDropdown } from '../workflow/workflow-dropdown';
import useStyles from './styles';

interface HeaderProps {
  className?: string;
}

export const Header: ComponentType<HeaderProps> = ({ className }) => {
  const classes = useStyles();

  // const handleSubmit = (values: FormikValues) => {
  //   console.log(values);
  // };

  return (
    <header className={clsx(classes.root, className)}>
      <Container>
        <div className={clsx(classes.container)}>
          {/*<SearchForm*/}
          {/*  onSubmit={handleSubmit}*/}
          {/*  inputProps={{ variant: 'filled' }}*/}
          {/*/>*/}
          <Hidden smDown>
            <Separator />
          </Hidden>
          {/*<div className={clsx(classes.action)}>*/}
          {/*  <HeaderNotification />*/}
          {/*</div>*/}
          {!process.env.REACT_APP_SINGLE_PROJECT && (
            <div className={clsx(classes.action)}>
              <WorkflowDropdown />
            </div>
          )}
          <div className={clsx(classes.action)}>
            <LangSwitcher variant="select" />
          </div>
          <div className={clsx(classes.action)}>
            <HeaderOwner />
          </div>
        </div>
      </Container>
    </header>
  );
};

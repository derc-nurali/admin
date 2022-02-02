import clsx from 'clsx';
import { ComponentType } from 'react';
import { SignInEmailForm } from '../sign-in-email-form';
import useStyles from './styles';
interface SignInEmailProps {
  className?: any;
}

export const SignInEmail: ComponentType<SignInEmailProps> = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <SignInEmailForm className={classes.form} />
    </div>
  );
};

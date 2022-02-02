import * as yup from 'yup';
import {
  FIELD_EMAIL,
  FIELD_PASSWORD,
} from '../../../../constants/app/fields-constants';

export const SendingEmailValidationSchema = yup.object().shape({
  [FIELD_EMAIL]: yup.string().email().required('error.required').trim(),
});

export const SignInEmailValidationSchema = yup.object().shape({
  [FIELD_EMAIL]: yup.string().email().required('error.required').trim(),
  [FIELD_PASSWORD]: yup.string().min(3, 'error.minLength').trim(),
});

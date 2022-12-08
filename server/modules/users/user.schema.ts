import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  name: string().min(2),
  password: string().min(6, 'Password too short - should be 6 chars minimum'),
  passwordConfirmation: string().min(
    6,
    'Confirm Password too short - should be 6 chars minimum'
  ),
  email: string({
    required_error: 'Email is required',
  })
    .email('Not a valid email')
    .min(1, 'Email is required'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});

export const createUserSessionSchema = object({
  password: string().min(
    6,
    'Password is too short - should be 6 chars minimum.'
  ),
  email: string().email('Must be a valid email').min(1, 'Email is required'),
});

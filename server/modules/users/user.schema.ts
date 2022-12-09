import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string().min(2),
    password: string().min(6, 'Password too short - should be 6 chars minimum'),
    confirmPassword: string().min(
      6,
      'Confirm Password too short - should be 6 chars minimum'
    ),
    email: string({
      required_error: 'Email is required',
    })
      .email('Not a valid email')
      .min(1, 'Email is required'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.confirmPassword'
>;

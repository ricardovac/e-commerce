import { Express } from 'express';
import { createUserSchema } from '../modules/users/user.schema';
import requireUser from './utils/requireUser';
import validate from './utils/validate';
import { createUserHandler } from '../modules/users/user.controller';
import { signIn, signOut } from '../modules/auth/auth.controller';

const routes = (app: Express) => {
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/login', signIn);
  app.post('/api/login', signOut);
};

export default routes;

import { Express } from 'express';
import { createUserSchema } from '../modules/users/user.schema';
import requireUser from './utils/requireUser';
import validate from './utils/validate';
import { createUserHandler } from '../modules/users/user.controller';
import { signIn, signOut } from '../modules/auth/auth.controller';
import verifyToken from './middlewares/verifyToken';
import verifyTokenAndAuth from './middlewares/verifyTokenAndAuth';
import {
  createCart,
  updateCart,
  deleteCart,
  getCart,
} from '../modules/cart/cart.controller';

const routes = (app: Express) => {
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/login', signIn);
  app.post('/api/login', signOut);

  // Passar o verify
  app.post('/api/cart', verifyToken, createCart);
  app.put('/api/cart/:id', verifyTokenAndAuth, updateCart);
  app.delete('/api/cart/:id', verifyTokenAndAuth, deleteCart);
  app.get('/api/cart/find/:id', verifyTokenAndAuth, getCart);
};

export default routes;

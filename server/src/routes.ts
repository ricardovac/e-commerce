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
import {
  createProduct,
  deleteProduct,
  getAllProduts,
  getProduct,
  updateProduct,
} from '../modules/product/product.controller';

const routes = (app: Express) => {
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/login', signIn);
  app.post('/api/login', signOut);

  app.post('/api/cart', verifyToken, createCart);
  app.put('/api/cart/:id', verifyTokenAndAuth, updateCart);
  app.delete('/api/cart/:id', verifyTokenAndAuth, deleteCart);
  app.get('/api/cart/find/:id', verifyTokenAndAuth, getCart);

  app.post('/api/products', verifyToken, createProduct);
  app.put('/api/products/:id', verifyToken, updateProduct);
  app.delete('/api/products/:id', verifyToken, deleteProduct);
  app.get('/api/products/find/:id', getProduct);
  app.get('/api/products/find/:id', getAllProduts);
};

export default routes;

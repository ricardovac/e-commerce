import { Express } from 'express';
import { signIn, signOut } from '../modules/auth/auth.controller';
import {
  createCart,
  deleteCart,
  getCart,
  updateCart,
} from '../modules/cart/cart.controller';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getUserOrder,
  Income,
} from '../modules/order/order.controller';
import {
  createProduct,
  deleteProduct,
  getAllProduts,
  getProduct,
  updateProduct,
} from '../modules/product/product.controller';
import { createUserHandler } from '../modules/users/user.controller';
import { createUserSchema } from '../modules/users/user.schema';
import verifyToken from './middlewares/verifyToken';
import verifyTokenAndAuth from './middlewares/verifyTokenAndAuth';
import validate from './utils/validate';

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

  app.post('/api/order', verifyToken, createOrder);
  app.put('/api/order/:id', verifyToken, deleteOrder);
  app.delete('/api/order/find/:userId', verifyToken, getUserOrder);
  app.get('/api/order', verifyToken, getAllOrders);
  app.get('/api/order/income', verifyToken, Income);
};

export default routes;

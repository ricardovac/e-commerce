import { NextFunction, Request, Response } from 'express';
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/database';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.session?.token;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, `${SECRET}`, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;

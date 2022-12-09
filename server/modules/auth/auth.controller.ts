import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../users/user.model';

export const signIn = async (req: Request, res: Response) => {
  User.findOne({
    name: req.body.name,
  })
    .populate('__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
        expiresIn: 86400,
      });

      const authorities = [];

      req.session?.token = token;

      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    });
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out" });
  } catch (err) {
    next(err);
  }
};

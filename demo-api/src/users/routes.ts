import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Post } from '../posts/model';
import { User } from './model';

const router = Router();
let users: User[] = [];

const userValidationRules = [
  body('email').notEmpty().isEmail().withMessage('Email is required.'),
];

router.post('/', userValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user: User = {
    email: req.body.email,
    name: req.body.name,
  };

  users.push(user);
  res.status(201).json(user);
});
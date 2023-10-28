import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { Post } from '../posts/model';
import { User } from './model';

const prisma = new PrismaClient();

const router = Router();

const userValidationRules = [
  body('email').notEmpty().isEmail().withMessage('Email is required.'),
];

const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name
    },
  });

  return user;
}

router.post('/', userValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  createUser(req, res).then(async (user) => {
    res.status(201).json(user);
    await prisma.$disconnect();
  }).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
});


const usersRouter = router;
export default usersRouter;
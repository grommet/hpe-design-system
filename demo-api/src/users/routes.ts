import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const userValidationRules = [
  body('email').optional().trim().isEmail().withMessage('Email must be a valid email address.'),
];

const createUserValidationRules = [
  body('email').notEmpty().withMessage('Email is required.'),
  ...userValidationRules,
];

const updateUserValidationRules = [
  body('id').notEmpty().withMessage('ID is required.'),
  ...userValidationRules,
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

router.post('/', createUserValidationRules, async (req: Request, res: Response) => {
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

router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
  await prisma.$disconnect();
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }

  await prisma.$disconnect();
});

router.put('/:id', updateUserValidationRules, async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  if (!user) {
    res.status(404).send('User not found');
  } else {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: req.body.email || user.email,
        name: req.body.name || user.name
      },
    });

    res.json(updatedUser);
  }

  await prisma.$disconnect();
});

const usersRouter = router;
export default usersRouter;
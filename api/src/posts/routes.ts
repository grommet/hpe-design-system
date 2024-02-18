import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const postValidationRules = [
  body('title').notEmpty().withMessage('Title is required.'),
];

const createPostValidationRules = [
  body('authorId').notEmpty().withMessage('Author ID is required.'),
  ...postValidationRules,
];

const updatePostValidationRules = [
  body('id').notEmpty().withMessage('ID is required.'),
  ...postValidationRules,
];

const createPost = async (req: Request, res: Response) => {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      author: {
        connect: {
          id: req.body.authorId,
        },
      },
    },
  });

  return post;
}

router.post('/', createPostValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  createPost(req, res).then(async (post) => {
    res.status(201).json(post);
    await prisma.$disconnect();
  }).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
});

router.get('/', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
  await prisma.$disconnect();
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  res.json(post);
  await prisma.$disconnect();
});

router.put('/', updatePostValidationRules, async (req: Request, res: Response) => {
  const post = await prisma.post.update({
    where: {
      id: req.body.id,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });

  res.json(post);
  await prisma.$disconnect();
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });

  res.json(post);
  await prisma.$disconnect();
});

const postsRouter = router;
export default postsRouter;


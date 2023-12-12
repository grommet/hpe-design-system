import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { createComponent, updateComponent } from './actions';
import { createRules, updateRules } from './validation-rules';

const prisma = new PrismaClient();
const router = Router();

router.post('/', createRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  createComponent(req, res).then(async (component) => {
    res.status(201).json(component);
    await prisma.$disconnect();
  }).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
});

router.get('/', async (req: Request, res: Response) => {
  const components = await prisma.component.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  res.json(components);
  await prisma.$disconnect();
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const component = await prisma.component.findUnique({
    where: {
      id: id,
    },
  });

  if (!component) {
    res.status(404).send('Component not found');
  } else {
    res.json(component);
  }

  await prisma.$disconnect();
});

router.put('/:id', updateRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  updateComponent(req, res).then(async (component) => {
    res.json(component);
    await prisma.$disconnect();
  }).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const component = await prisma.component.delete({
    where: {
      id: id,
    },
  });

  res.json(component);
  await prisma.$disconnect();
});

const componentsRouter = router;
export default componentsRouter;
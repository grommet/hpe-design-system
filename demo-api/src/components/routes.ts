import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const componentValidationRules = [
  body('name').notEmpty().withMessage('Name is required.'),
];

const createComponentValidationRules = [
  ...componentValidationRules,
];

const updateComponentValidationRules = [
  body('id').notEmpty().withMessage('ID is required.'),
  ...componentValidationRules,
];

const createComponent = async (req: Request, res: Response) => {
  const component = await prisma.component.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      keywords: req.body.keywords,
    },
  });

  return component;
}

router.post('/', createComponentValidationRules, async (req: Request, res: Response) => {
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
  const components = await prisma.component.findMany();
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

router.put('/', updateComponentValidationRules, async (req: Request, res: Response) => {
  const { id, name, description, keywords } = req.body;

  const component = await prisma.component.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      keywords: keywords,
    },
  });

  res.json(component);
  await prisma.$disconnect();
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
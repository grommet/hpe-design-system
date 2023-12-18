import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { createResource, updateResource, updateResources } from './actions';
import { createRules, updateRules, updateManyRules } from './validation-rules';

const prisma = new PrismaClient();
const router = Router();

// Resources CRUD
router.post('/', createRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  createResource(req, res).then(async (resource) => {
    res.status(201).json(resource);
    await prisma.$disconnect();
  }
  ).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
});

router.get('/', async (req: Request, res: Response) => {
  const resources = await prisma.resource.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  res.json(resources);
  await prisma.$disconnect();
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const resource = await prisma.resource.findUnique({
    where: {
      id: id,
    },
  });

  if (!resource) {
    res.status(404).send('Resource not found');
  } else {
    res.json(resource);
  }

  await prisma.$disconnect();
});

router.put('/:id', updateRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  updateResource(req, res).then(async (resource) => {
    res.json(resource);
    await prisma.$disconnect();
  }).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
});

router.put('/', updateManyRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  updateResources(req, res).then(async (resources) => {
    res.json(resources);
    await prisma.$disconnect();
  }
  ).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
});


const resourcesRouter = router;
export default resourcesRouter;

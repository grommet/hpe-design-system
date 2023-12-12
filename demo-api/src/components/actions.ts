import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const createComponent = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request. Request body is required.' });
  }

  const { name, description, keywords, status } = req.body;

  const component = await prisma.component.create({
    data: {
      name,
      description,
      keywords,
      status,
    },
  });

  return res.json(component);
}

const updateComponent = async (req: Request, res: Response) => {
  const { id, name, description, keywords, status } = req.body;

  const component = await prisma.component.findUnique({
    where: {
      id: id,
    },
  });

  if (!component) {
    res.status(404).send('Component not found');
  } else {
    const updatedComponent = await prisma.component.update({
      where: {
        id: id,
      },
      data: {
        name: name || component.name,
        description: description || component.description,
        keywords: keywords || component.keywords,
        status: status || component.status,
      },
    });

    return res.json(updatedComponent);
  }
}

export { createComponent, updateComponent }
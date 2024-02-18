import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const createResource = async (req: Request, res: Response) => {
  const { name, type, url } = req.body;

  const resource = await prisma.resource.create({
    data: {
      name,
      type,
      url,
    },
  });

  return res.json(resource);
}

const updateResource = async (req: Request, res: Response) => {
  const { id, name, type, url } = req.body;

  const resource = await prisma.resource.update({
    where: {
      id: id,
    },
    data: {
      name,
      type,
      url,
    },
  });

  return res.json(resource);
}

const updateResources = async (req: Request, res: Response) => {
  const resources = req.body;
  
  const updatedResources = await Promise.all(resources.map(
    async (resource: { id: string, name: string, type: string, url: string}) => {
      const { id, name, type, url } = resource;

      const updatedResource = await prisma.resource.update({
        where: {
          id: id,
        },
        data: {
          name,
          type,
          url,
        },
      });

    return updatedResource;
  }
  ));

  return res.json([...updatedResources]);
}

export { createResource, updateResource, updateResources }
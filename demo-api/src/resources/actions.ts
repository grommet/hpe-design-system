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

export { createResource }
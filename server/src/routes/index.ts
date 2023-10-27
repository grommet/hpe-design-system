import { Router, Request, Response } from 'express';
import tasksRouter from './tasks';

const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.use('/tasks', tasksRouter);


export default router;

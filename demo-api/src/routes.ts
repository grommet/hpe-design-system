import { Router, Request, Response } from 'express';
import componentsRouter from './components/routes';
import postsRouter from './posts/routes';
import tasksRouter from './tasks/routes';
import usersRouter from './users/routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.use('/components', componentsRouter);
router.use('/posts', postsRouter);
router.use('/tasks', tasksRouter);
router.use('/users', usersRouter);

export default router;

import { Router, Request, Response } from 'express';
import { Task } from '../models/task';

const router = Router();

// Tasks API
let tasks: Task[] = [];

router.post('/tasks', (req: Request, res: Response) => {
  const task: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.get('/', (req: Request, res: Response) => {
  res.json(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.json(task);
  }
});

router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).send('Task not found');
  } else {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed || task.completed;

    res.json(task);
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res.status(404).send('Task not found');
  } else {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  }
});

const tasksRouter = router;
export default tasksRouter;
